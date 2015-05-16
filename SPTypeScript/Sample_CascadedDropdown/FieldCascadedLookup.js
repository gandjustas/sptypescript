var _;
(function (_) {
    function init() {
        CSR.override(10009)
            .filteredLookup("Master", '<BeginsWith><FieldRef Name ="Title" /><Value Type = "Text" >{Title}</Value></BeginsWith>')
            .lookupAddNew("Master", "Add New Master item", true)
            .register();
    }
    SP.SOD.executeOrDelayUntilScriptLoaded(init, "typescripttemplates.ts");
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Sample_CascadedDropdown/FieldCascadedLookup.js"), init);
    }, "sp.js");
})(_ || (_ = {}));
//# sourceMappingURL=FieldCascadedLookup.js.map