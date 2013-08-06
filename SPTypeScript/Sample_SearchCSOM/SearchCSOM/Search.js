///<reference path="../../definitions/jquery.d.ts" />
///<reference path="../../Definitions/SharePoint.d.ts" />
$(function () {
    $("#toolbarDiv").show();
    $("#toolbarDiv input[type=button]").click(function (e) {
        executeQuery($('#queryTerms').val());
    });
    $("#toolbarDiv input[type=text]").keypress(function (e) {
        if (e.keyCode == 13) {
            executeQuery($('#queryTerms').val());
            e.preventDefault();
        }
    });

    function executeQuery(queryTerms) {
        var Results = {
            element: $(''),
            url: '',
            init: function (element) {
                Results.element = element;
                Results.url = _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='" + queryTerms + "'";
            },
            load: function () {
                var _this = this;
                SP.SOD.executeOrDelayUntilScriptLoaded(function () {
                    var Search = Microsoft.SharePoint.Client.Search.Query;
                    var ctx = SP.ClientContext.get_current();
                    var query = new Search.KeywordQuery(ctx);
                    query.set_queryText(queryTerms);
                    var executor = new Search.SearchExecutor(ctx);
                    var result = executor.executeQuery(query);
                    ctx.executeQueryAsync(function () {
                        //TODO: Discover proper way to load collection
                        var tableCollection = new Search.ResultTableCollection();
                        tableCollection.initPropertiesFromJson(result.get_value());

                        var rows = tableCollection.get_item(0).get_resultRows();
                        Results.element.html(_this.createHtml(rows));
                    }, function (sender, args) {
                        alert(args.get_message());
                    });
                }, "sp.search.js");
            },
            createHtml: function (rows) {
                var html = "<table>";

                for (var i = 0; i < rows.length; i++) {
                    html += "<tr><td>";
                    html += rows[i]['Title'];
                    html += "</td><td>";
                    html += rows[i]['Path'];
                    html += "</td></tr>";
                }

                html += "</table>";
                return html;
            }
        };

        Results.init($('#resultsDiv'));
        Results.load();
    }
});
//# sourceMappingURL=Search.js.map
