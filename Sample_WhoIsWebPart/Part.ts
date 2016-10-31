

module _ {
    var queryString = parseQueryString();
    var isIframe = queryString['DisplayMode'] == 'iframe'
    var spHostUrl = queryString['SPHostUrl'];
    var editmode = Number(queryString['editmode']);
    var includeDetails = queryString['boolProp'] == 'true';

    prepareVisual();
    m$.ready(() => {
        loadPeoplePicker('peoplePicker');
        partProperties();

        if (isIframe) {
            partResize();
        }
    });

    //Load the people picker 
    function loadPeoplePicker(peoplePickerElementId: string) {
        var schema: ISPClientPeoplePickerSchema = {
            PrincipalAccountType: "User",
            AllowMultipleValues: false,
            Width: 300,
            OnUserResolvedClientScript: onUserResolvedClientScript
        }

        SPClientPeoplePicker.InitializeStandalonePeoplePicker(peoplePickerElementId, null, schema);
    }

    function onUserResolvedClientScript(el: string, users: ISPClientPeoplePickerEntity[]) {
        if (users.length > 0) {
            var person = users[0];
            var accountName = person.Key;

            var context = SP.ClientContext.get_current();

            var peopleManager = new SP.UserProfiles.PeopleManager(context);
            var personProperties = peopleManager.getPropertiesFor(accountName);

            context.load(personProperties);
            context.executeQueryAsync((sender, args) => {

                $get("basicInfo").style.display = 'block';

                var userPic = personProperties.get_userProfileProperties()["PictureURL"];
                $get("pic").innerHTML = '<img src="' + userPic + '" alt=' + personProperties.get_displayName() + '" width=92 height=92 />';

                $get("name").innerHTML = '<a href="' + personProperties.get_userUrl() + '">' + personProperties.get_displayName() + '</a>';
                $get("email").innerHTML = '<a href="mailto:' + personProperties.get_email() + '">' + personProperties.get_email() + '</a>';
                $get("title").innerHTML = personProperties.get_title();
                $get("department").innerHTML = person.EntityData.Department;
                $get("phone").innerHTML = person.EntityData.MobilePhone;

                var properties = personProperties.get_userProfileProperties();
                var messageText = "";
                for (var key in properties) {
                    messageText += "<br />[" + key + "]: \"" + properties[key] + "\"";
                }
                $get("detailInfo").innerHTML = messageText;

                if (isIframe) {
                    partResize();
                }

            }, (sender, args) => { alert('Error: ' + args.get_message()); });

        }
    }

    function partProperties() {

        if (editmode == 1) {
            $get("editmodehdr").style.display = "inline";
            $get("content").style.display = "none";
        }
        else if (includeDetails) {
            $get('detailInfo').style.display = 'block';

            $get("editmodehdr").style.display = "none";
            $get("content").style.display = "inline";
        }
    }

    function partResize() {
        var bounds = Sys.UI.DomElement.getBounds(document.body);
        parent.postMessage('<message senderId=' + queryString['SenderId'] + '>resize(' + bounds.width + ',' + bounds.height + ')</message>', '*');
    }

    function prepareVisual() {
        if (isIframe) {
            //Create a Link element for the defaultcss.ashx resource
            var linkElement = document.createElement('link');
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('href', spHostUrl + '/_layouts/15/defaultcss.ashx');

            //Add the linkElement as a child to the head section of the html
            document.head.appendChild(linkElement);
        } else {

            m$.ready(() => {
                var nav = new SP.UI.Controls.Navigation('navigation', {
                    appIconUrl: queryString['SPHostLogo'],
                    appTitle: document.title
                });
                nav.setVisible(true);
                $get('apppart-notification').style.display = 'block';
                document.body.style.overflow = 'visible';
            });
        }
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
}


