///<reference path="../Definitions/SharePoint.d.ts" />
///<reference path="../extensions/typescripttemplates.ts" />

module _ {
    function init() {
        CSR.override(10003)
            .seachLookup("Master")
            .register();
    }

    SP.SOD.executeFunc("typescripttemplates.ts",'CSR', init);

    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Sample_FieldLookupBySearch/FieldLookupSearch.js"), init);
    }, "sp.js");
}