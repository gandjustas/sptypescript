///<reference path="../Definitions/SharePoint.d.ts" />

SP.SOD.executeOrDelayUntilScriptLoaded(() => {
    var context = SP.ClientContext.get_current();

    var peopleManager = new SP.UserProfiles.PeopleManager(context);
    var personProperties = peopleManager.getMyProperties();
    context.load(personProperties);

    context.executeQueryAsync((sender, args) => {
        var properties = personProperties.get_userProfileProperties();
        var messageText = "";
        for (var key in properties) {
            messageText += "<br />[" + key + "]: \"" + properties[key] + "\"";
        }
        $get("results").innerHTML = messageText;
    }, (sender, args) => { alert('Error: ' + args.get_message()); });
    
}, 'sp.userprofiles.js');