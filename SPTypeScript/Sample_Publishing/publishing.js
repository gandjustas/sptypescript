// Variables used in various callbacks
JSRequest.EnsureSetup();

SP.SOD.execute('mquery.js', 'm$.ready', function () {
    var context = SP.ClientContext.get_current();
    var web = context.get_web();
    m$('#CreatePage').click(createPage);
});

function createPage(evt) {
    SP.SOD.execute('sp.js', 'SP.ClientConext', function () {
        SP.SOD.execute('sp.publishing.js', 'SP.Publishing', function () {
            var context = SP.ClientContext.get_current();

            var hostUrl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
            var hostcontext = new SP.AppContextSite(context, hostUrl);
            var web = hostcontext.get_web();
            var pubWeb = SP.Publishing.PublishingWeb.getPublishingWeb(context, web);
            context.load(web);
            context.load(pubWeb);
            context.executeQueryAsync(function () {
                var pageInfo = new SP.Publishing.PublishingPageInformation();
                var newPage = pubWeb.addPublishingPage(pageInfo);
                context.load(newPage);
                context.executeQueryAsync(function () {
                    // Success callback after adding a new Publishing Page.
                    // We want to get the actual list item that is represented by the Publishing Page.
                    var listItem = newPage.get_listItem();
                    context.load(listItem);
                    context.executeQueryAsync(function () {
                        var link = document.getElementById("linkToPage");
                        link.setAttribute("href", web.get_url() + "/Pages/" + listItem.get_fieldValues().FileLeafRef);
                        link.innerText = "Go to new page!";
                    }, function (sender, args) {
                        alert('Failed to get new page: ' + args.get_message());
                    });
                }, function (sender, args) {
                    alert('Failed to Add Page: ' + args.get_message());
                });
            }, function (sender, args) {
                alert('Failed to get the PublishingWeb: ' + args.get_message());
            });
        });
    });
}
//# sourceMappingURL=publishing.js.map
