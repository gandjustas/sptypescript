///<reference path="../../definitions/SP.Init.d.ts" />
///<reference path="../../definitions/SP.d.ts" />
///<reference path="../../definitions/SP.Search.d.ts" />
///<reference path="../../definitions/jquery.d.ts" />



$(() => {
    var e = SP.SOD.executeOrDelayUntilScriptLoaded(showToolbar, "sp.search.js");
});

function showToolbar() {
    $("#toolbarDiv").show();
    $("#toolbarDiv input[type=button]").click(e => {
        executeQuery($('#queryTerms').val());
    });
    $("#toolbarDiv input[type=text]").keypress(e => {
        if (e.keyCode == 13)
            executeQuery($('#queryTerms').val());
    });
}

function executeQuery(queryTerms) {
    var  Search = Microsoft.SharePoint.Client.Search.Query;

   var  Results = {
        element: '',
        url: '',

        init: function (element) {
            Results.element = element;
            Results.url = _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='" + queryTerms + "'";
        },

        load: function () {
            var ctx = SP.ClientContext.get_current();
            var query = new Search.KeywordQuery(ctx);
            query.set_queryText(queryTerms);
            var executor = new Search.SearchExecutor(ctx);
            var result = executor.executeQuery(query);
            ctx.executeQueryAsync(
                () => {
                    //TODO: Discover proper way to load collection
                    var tableCollection = new Search.ResultTableCollection();
                    tableCollection.initPropertiesFromJson(result.get_value());

                    var rows = tableCollection.get_item(0).get_resultRows();
                    Results.element.html(this.createHtml(rows));
                },
                (sender, args) => { alert(args.get_message()); }
                );
        },

        createHtml: function (rows: { [key: string]: any; }[]) {
            var html = "<table>";

            for (var i = 0; i < rows.length; i++) {
                html += "<tr><td>";
                html += rows[i]['Title'];
                html += "</td><td>"
                html += rows[i]['Path'];
                html += "</td><tr>";
            }

            html += "</table>";
            return html;
        },

    }

    Results.init($('#resultsDiv'));
    Results.load();

}