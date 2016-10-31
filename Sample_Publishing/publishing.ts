// Variables used in various callbacks
JSRequest.EnsureSetup();

SP.SOD.execute('mquery.js', 'm$.ready', () => {
    var context = SP.ClientContext.get_current();
    var web = context.get_web();
    m$('#CreatePage').click(createPage);
});

function createPage(evt:MQueryEvent) {
    SP.SOD.execute('sp.js', 'SP.ClientConext', () => {
        SP.SOD.execute('sp.publishing.js', 'SP.Publishing', () => {
        var context = SP.ClientContext.get_current();
        

        var hostUrl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        var hostcontext = new SP.AppContextSite(context, hostUrl);
        var web = hostcontext.get_web();
        var pubWeb = SP.Publishing.PublishingWeb.getPublishingWeb(context, web);
        context.load(web);
        context.load(pubWeb);
        context.executeQueryAsync(
                    // Success callback after getting the host Web as a PublishingWeb.
                    // We now want to add a new Publishing Page.
                    function () {
                        var pageInfo = new SP.Publishing.PublishingPageInformation();
                        var newPage = pubWeb.addPublishingPage(pageInfo);
                        context.load(newPage);
                        context.executeQueryAsync(
                            function () {

                                // Success callback after adding a new Publishing Page.
                                // We want to get the actual list item that is represented by the Publishing Page.
                                var listItem = newPage.get_listItem();
                                context.load(listItem);
                                context.executeQueryAsync(

                                    // Success callback after getting the actual list item that is 
                                    // represented by the Publishing Page.
                                    // We can now get its FieldValues, one of which is its FileLeafRef value.
                                    // We can then use that value to build the Url to the new page
                                    // and set the href or our link to that Url.
                                    function () {
                                        var link = document.getElementById("linkToPage");
                                        link.setAttribute("href", web.get_url() + "/Pages/" + listItem.get_fieldValues().FileLeafRef);
                                        link.innerText = "Go to new page!";
                                    },

                                    // Failure callback after getting the actual list item that is 
                                    // represented by the Publishing Page.
                                    function (sender, args) {
                                        alert('Failed to get new page: ' + args.get_message());
                                    }
                                    );
                            },
                            // Failure callback after trying to add a new Publishing Page.
                            function (sender, args) {
                                alert('Failed to Add Page: ' + args.get_message());
                            }
                            );
                    },
                    // Failure callback after trying to get the host Web as a PublishingWeb.
                    function (sender, args) {
                        alert('Failed to get the PublishingWeb: ' + args.get_message());
                    }
                    );
    });
    });
}

