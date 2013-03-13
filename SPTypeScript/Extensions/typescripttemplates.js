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
        csr.prototype.template = function (name, template) {
            this.Templates[name] = template;
            return this;
        };
        csr.prototype.fieldTemplate = function (field, name, template) {
            this.Templates.Fields[field][name] = template;
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
