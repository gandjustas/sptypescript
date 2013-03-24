var _;
(function (_) {
    function init() {
        CSR.override(10057, 2).onPreRender(function (ctx) {
            ctx.ListTitle = prompt("Type a title", ctx.ListTitle);
        }).header("<b><#=ctx.ListTitle#></b>" + "<hr><ul id='unorderedlist'>").item(function (ctx) {
            return "<li>" + ctx.CurrentItem['Title'] + "</li>";
        }).footer('</ul>').onPostRender(postRenderHandler).register();
    }
    ;
    function postRenderHandler(ctx) {
        var ulObj;
        var i, j;
        ulObj = document.getElementById("unorderedlist");
        for(i = 1; i < ulObj.children.length; i++) {
            var x = ulObj.children[i];
            for(j = 1; j < ulObj.children.length; j++) {
                var y = ulObj.children[j];
                if(x.innerText < y.innerText) {
                    ulObj.insertBefore(y, x);
                }
            }
        }
    }
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        SP.SOD.executeOrDelayUntilScriptLoaded(init, "typescripttemplates.ts");
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Scripts_CSRListView/CSRListView.js"), init);
        }, "sp.js");
    }, "clienttemplates.js");
})(_ || (_ = {}));
;
//@ sourceMappingURL=CSRListView.js.map
