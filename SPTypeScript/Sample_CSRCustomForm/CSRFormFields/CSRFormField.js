var _;
(function (_) {
    function init() {
        return CSR.override(10005)
            .makeReadOnly('CurrentDate')
            .makeReadOnly('User1')
            .makeHidden('Number')
            .register();
    }
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        SP.SOD.executeOrDelayUntilScriptLoaded(init, "typescripttemplates.ts");
        //Enable script with MDS
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/CSRFormFields/CSRFormField.js"), init);
        }, "sp.js");
    }, "clienttemplates.js");
})(_ || (_ = {}));
//# sourceMappingURL=CSRFormField.js.map