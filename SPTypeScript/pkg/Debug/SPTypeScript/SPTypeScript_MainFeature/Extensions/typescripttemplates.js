///<reference path="../Definitions/SharePoint.d.ts" />
/** Lightweight client-side rendering template overrides.*/
var CSR;
(function (CSR) {
    

    function override(listTemplateType, baseViewId) {
        return new csr(listTemplateType, baseViewId);
    }
    CSR.override = override;

    var csr = (function () {
        function csr(ListTemplateType, BaseViewID) {
            this.ListTemplateType = ListTemplateType;
            this.BaseViewID = BaseViewID;
            this.Templates = { Fields: {} };
            this.OnPreRender = [];
            this.OnPostRender = [];
            this.IsRegistered = false;
        }
        /* tier 1 methods */
        csr.prototype.view = function (template) {
            this.Templates.View = template;
            return this;
        };

        csr.prototype.item = function (template) {
            this.Templates.Item = template;
            return this;
        };

        csr.prototype.header = function (template) {
            this.Templates.Header = template;
            return this;
        };

        csr.prototype.body = function (template) {
            this.Templates.Body = template;
            return this;
        };

        csr.prototype.footer = function (template) {
            this.Templates.Footer = template;
            return this;
        };

        csr.prototype.fieldView = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].View = template;
            return this;
        };

        csr.prototype.fieldDisplay = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].DisplayForm = template;
            return this;
        };

        csr.prototype.fieldNew = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].NewForm = template;
            return this;
        };

        csr.prototype.fieldEdit = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].EditForm = template;
            return this;
        };

        /* tier 2 methods */
        csr.prototype.template = function (name, template) {
            this.Templates[name] = template;
            return this;
        };

        csr.prototype.fieldTemplate = function (fieldName, name, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName][name] = template;
            return this;
        };

        /* common */
        csr.prototype.onPreRender = function () {
            var callbacks = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                callbacks[_i] = arguments[_i + 0];
            }
            for (var i = 0; i < callbacks.length; i++) {
                this.OnPreRender.push(callbacks[i]);
            }
            return this;
        };

        csr.prototype.onPostRender = function () {
            var callbacks = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                callbacks[_i] = arguments[_i + 0];
            }
            for (var i = 0; i < callbacks.length; i++) {
                this.OnPostRender.push(callbacks[i]);
            }
            return this;
        };

        csr.prototype.makeReadOnly = function (fieldName) {
            this.onPreRender(function (ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid || ctx.ControlMode == SPClientTemplates.ClientControlMode.DisplayForm)
                    return;

                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                    var ctxInView = ctx;

                    var fieldSchema = ctxInView.ListSchema.Field[fieldName];
                    if (ctxInView.inGridMode) {
                        //TODO: Disable editing in grid mode
                        fieldSchema.ReadOnlyField = true;
                    } else {
                        var fieldSchemaInView = fieldSchema;
                        fieldSchemaInView.ReadOnly = "TRUE";
                    }
                } else {
                    var ctxInForm = ctx;
                    var fieldSchemaInForm = ctxInForm.ListSchema.Field[0];
                    if (fieldSchemaInForm.Name === fieldName) {
                        fieldSchemaInForm.ReadOnlyField = true;
                        var template = GetFieldTemplate(fieldSchemaInForm, SPClientTemplates.ClientControlMode.DisplayForm);
                        ctxInForm.Templates.Fields[fieldName] = template;
                    }
                    //TODO: Fixup list data for user field
                }
            });
            return this;
        };

        csr.prototype.makeHidden = function (fieldName) {
            this.onPreRender(function (ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid)
                    return;

                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                    var ctxInView = ctx;

                    var fieldSchema = ctxInView.ListSchema.Field[fieldName];
                    if (ctxInView.inGridMode) {
                        fieldSchema.Hidden = true;
                    } else {
                        ctxInView.ListSchema.Field.splice(ctxInView.ListSchema.Field.indexOf(fieldSchema), 1);
                    }
                } else {
                    var ctxInForm = ctx;
                    var fieldSchemaInForm = ctxInForm.ListSchema.Field[0];
                    if (fieldSchemaInForm.Name === fieldName) {
                        fieldSchemaInForm.Hidden = true;
                        var pHolderId = ctxInForm.FormUniqueId + ctxInForm.FormContext.listAttributes.Id + fieldName;
                        var placeholder = $get(pHolderId);
                        var current = placeholder;
                        while (current.tagName.toUpperCase() !== "TR") {
                            current = current.parentElement;
                        }
                        var row = current;
                        row.style.display = 'none';
                    }
                }
            });
            return this;
        };

        csr.prototype.register = function () {
            if (!this.IsRegistered) {
                SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this);
                this.IsRegistered = true;
            }
        };
        return csr;
    })();

    

    function GetFieldTemplate(field, mode) {
        var ctx = { ListSchema: { Field: [field] }, FieldControlModes: {} };
        ctx.FieldControlModes[field.Name] = mode;
        var templates = SPClientTemplates.TemplateManager.GetTemplates(ctx);
        return templates.Fields[field.Name];
    }
})(CSR || (CSR = {}));

if (typeof SP == 'object' && SP && typeof SP.SOD == 'object' && SP.SOD) {
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");
}
//# sourceMappingURL=typescripttemplates.js.map
