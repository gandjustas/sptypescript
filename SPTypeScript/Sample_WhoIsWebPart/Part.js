///<reference path="../Definitions/SharePoint.d.ts" />
var _;
(function (_) {
    var queryString = parseQueryString();
    var spHostUrl = decodeURIComponent(queryString['SPHostUrl']);

    if (queryString['DisplayMode'] == 'AppPart') {
        //Create a Link element for the defaultcss.ashx resource
        var linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', spHostUrl + '/_layouts/15/defaultcss.ashx');

        //Add the linkElement as a child to the head section of the html
        document.head.appendChild(linkElement);
    } else {
        Sys.Application.add_load(function (app, e) {
            var nav = new SP.UI.Controls.Navigation('navigation', {
                appIconUrl: queryString['SPHostLogo'],
                appTitle: document.title
            });
            nav.setVisible(true);
            $get('apppart-notification').style.display = 'block';
        });
    }

    function parseQueryString() {
        var result = {};
        var qs = document.location.search.split('?')[1];
        if (qs) {
            var parts = qs.split('&');
            for (var i = 0; i < parts.length; i++) {
                if (parts[i]) {
                    var pair = parts[i].split('=');
                    result[pair[0]] = decodeURIComponent(pair[1]);
                }
            }
        }
        return result;
    }
})(_ || (_ = {}));
//# sourceMappingURL=Part.js.map
