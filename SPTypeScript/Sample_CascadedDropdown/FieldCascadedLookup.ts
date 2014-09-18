///<reference path="../Definitions/SharePoint.d.ts" />
///<reference path="../extensions/typescripttemplates.ts" />

module _ {
    function init() {
        CSR.override(10009)
            .cascadeLookup("Master", '<BeginsWith><FieldRef Name ="Title" /><Value Type = "Text" >{Title}</Value></BeginsWith>')
            .register();        
    }

    SP.SOD.executeOrDelayUntilScriptLoaded(init, "typescripttemplates.ts");

    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Sample_CascadedDropdown/FieldCascadedLookup.js"), init);
    }, "sp.js");
} 