var Csr;
(function (Csr) {
    function override(listTemplateType, baseViewId) {
        return new csr(listTemplateType, baseViewId);
    }
    Csr.override = override;
    var csr = (function () {
        function csr(ListTemplateType, BaseViewID) {
            this.ListTemplateType = ListTemplateType;
            this.BaseViewID = BaseViewID;
            this.Templates = {
                Fields: {
                }
            };
        }
        csr.prototype.item = function (template) {
            this.Templates.Item = template;
            return this;
        };
        csr.prototype.header = function (template) {
            this.Templates.Header = template;
            return this;
        };
        csr.prototype.footer = function (template) {
            this.Templates.Footer = template;
            return this;
        };
        csr.prototype.fieldView = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {
            };
            this.Templates.Fields[fieldName].View = template;
            return this;
        };
        csr.prototype.fieldDisplay = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {
            };
            this.Templates.Fields[fieldName].DisplayForm = template;
            return this;
        };
        csr.prototype.fieldNew = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {
            };
            this.Templates.Fields[fieldName].NewForm = template;
            return this;
        };
        csr.prototype.fieldEdit = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {
            };
            this.Templates.Fields[fieldName].EditForm = template;
            return this;
        };
        csr.prototype.template = function (fieldName, template) {
            this.Templates[name] = template;
            return this;
        };
        csr.prototype.fieldTemplate = function (fieldName, name, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {
            };
            this.Templates.Fields[fieldName][name] = template;
            return this;
        };
        csr.prototype.onPreRender = function () {
            var callbacks = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                callbacks[_i] = arguments[_i + 0];
            }
            this.OnPreRender = callbacks;
            return this;
        };
        csr.prototype.onPostRender = function () {
            var callbacks = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                callbacks[_i] = arguments[_i + 0];
            }
            this.OnPostRender = callbacks;
            return this;
        };
        csr.prototype.register = function () {
            SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this);
        };
        return csr;
    })();    
})(Csr || (Csr = {}));
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");
//@ sourceMappingURL=typescripttemplates.js.map
