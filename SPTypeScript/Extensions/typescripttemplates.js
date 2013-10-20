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

        csr.prototype.register = function () {
            if (!this.IsRegistered) {
                SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this);
                this.IsRegistered = true;
            }
        };
        return csr;
    })();
})(CSR || (CSR = {}));

if (typeof SP == 'object' && SP && typeof SP.SOD == 'object' && SP.SOD) {
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");
}
//# sourceMappingURL=typescripttemplates.js.map
