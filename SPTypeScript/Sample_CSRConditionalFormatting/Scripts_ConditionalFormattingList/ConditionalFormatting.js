///<reference path="../../Definitions/SharePoint.d.ts" />
///<reference path="../../extensions/typescripttemplates.ts" />
var _;
(function (_) {
    function init() {
        CSR.override(171, 1).onPostRender(function (ctx) {
            for (var i = 0; i < ctx.ListData.Row.length; i++) {
                var listItem = ctx.ListData.Row[i];
                var percentComplete = parseFloat(listItem['PercentComplete.']);
                var row = document.getElementById(GenerateIIDForListItem(ctx, listItem));
                if (row) {
                    if (percentComplete > 0.8) {
                        row.style.backgroundColor = '#f8502a';
                    }
                    else if (percentComplete > 0.4) {
                        row.style.backgroundColor = '#52f82a';
                    }
                }
            }
        }).register();
    }
    ;
    if (document.location.href.indexOf('/Lists/ConditionalFormattingTasksList') > 0) {
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            SP.SOD.executeOrDelayUntilScriptLoaded(init, "typescripttemplates.ts");
            SP.SOD.executeOrDelayUntilScriptLoaded(function () {
                //Enable script with MDS
                RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Scripts_ConditionalFormattingList/ConditionalFormatting.js"), init);
            }, "sp.js");
        }, "clienttemplates.js");
    }
})(_ || (_ = {}));
;
//# sourceMappingURL=ConditionalFormatting.js.map