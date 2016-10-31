var _;
(function (_) {
    var moduleName = 'form';
    var controllerName = 'formController';
    var webRelativeTemplatePath = '/AngularFormFiles/AngularForm.html';
    function init() {
        CSR.override(105001)
            .onPreRender(function (ctx) {
            ctx.controllerName = controllerName;
            ctx.templateUri = _spPageContextInfo.webServerRelativeUrl + webRelativeTemplatePath;
        })
            .item('<table width="100%" class="ms-formtable" style="margin-top: 8px;" border="0" cellspacing="0" cellpadding="0" ng-controller=<#=ctx.controllerName#>>'
            + '<tr ng-repeat="fld in Fields" ng-sp-form-row="fld" >'
            + '<td width="113" class="ms-formlabel" nowrap="true" valign="top">'
            + '<h3 class="ms-standardheader" >'
            + '<nobr>{{fld.Title}}<span ng-if="fld.Required" title="This field is required." class="ms-accentText" >*</span></nobr>'
            + '</h3>'
            + '</td>'
            + '<td width="350" class="ms-formbody" valign="top" ng-sp-field="fld" ></td>'
            + '</tr>'
            + '</table>')
            .onPostRender(ngInit)
            .register();
    }
    SP.SOD.executeFunc("sp-ts-csr.ts", 'CSR', init);
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/AngularFormFiles/AngularForm.js"), init);
    }, "sp.js");
    function ngInit(ctx) {
        angular.module(moduleName, [])
            .controller(controllerName, ['$scope', 'RenderContext', formController])
            .directive('ngSpField', ['RenderContext', ngSpField])
            .directive('ngSpFormRow', ngSpFormRow)
            .value('RenderContext', ctx);
        var wpq = ctx.FormUniqueId;
        var webpart = $get('WebPart' + wpq);
        angular.bootstrap(webpart, [moduleName]);
    }
    function formController($scope, ctx) {
        $scope.RenderContext = ctx;
        $scope.Fields = ctx.ListSchema.Field;
    }
    function ngSpField(ctx) {
        return {
            restrict: 'A',
            link: function (scope, instanceElement, instanceAttributes) {
                var old = ctx.CurrentItem;
                ctx.CurrentItem = ctx.ListData.Items[0];
                var fld = scope.$eval(instanceAttributes.ngSpField);
                var fldMarkup = ctx.RenderFieldByName(ctx, fld.Name);
                instanceElement.html(fldMarkup);
                ctx.CurrentItem = old;
            }
        };
    }
    function ngSpFormRow() {
        return {
            restrict: 'A',
            link: function (scope, instanceElement, instanceAttributes) {
                var fld = scope.$eval(instanceAttributes.ngSpFormRow);
                if (fld.Name == 'Attachments') {
                    instanceElement.css('display', 'none');
                    instanceElement.attr('id', 'idAttachmentsRow');
                    if (typeof ShowAttachmentRows == "function")
                        ShowAttachmentRows();
                }
            }
        };
    }
})(_ || (_ = {}));
//# sourceMappingURL=AngularForm.js.map