///<reference path="../../Definitions/SharePoint.d.ts" />
///<reference path="../../extensions/typescripttemplates.ts" />

(function () {
    function init() {
        CSR.override(10057, 2)
           .onPreRender((ctx: SPClientTemplates.RenderContext_InView) => {
               // Override the default title with user input
               ctx.ListTitle = prompt("Type a title", ctx.ListTitle);
           })
           .header("<b><#=ctx.ListTitle#></b>"
                                + "<hr><ul id='unorderedlist'>")
           .item(ctx => "<li>" + ctx.CurrentItem['Title'] + "</li>")
           .footer('</ul>')
           .onPostRender(postRenderHandler)
           .register();
    };

    // The postRenderHandler handles the 
    // OnPostRender event
    function postRenderHandler(ctx: SPClientTemplates.RenderContext_InView) {

        // You can manipulate the DOM
        // in the postRender event
        var ulObj;
        var i, j;

        ulObj = document.getElementById("unorderedlist");

        // Reverse order the list
        for (i = 1; i < ulObj.children.length; i++) {
            var x = ulObj.children[i];
            for (j = 1; j < ulObj.children.length; j++) {
                var y = ulObj.children[j];
                if (x.innerText < y.innerText) {
                    ulObj.insertBefore(y, x);
                }
            }
        }
    }

    SP.SOD.executeOrDelayUntilScriptLoaded(() => {
        SP.SOD.executeOrDelayUntilScriptLoaded(init, "typescripttemplates.ts");

        //Enable script with MDS
        SP.SOD.executeOrDelayUntilScriptLoaded(() => {
            RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Scripts_CSRListView/CSRListView.js"), init);
        }, "sp.js");
    }, "clienttemplates.js");

})();
