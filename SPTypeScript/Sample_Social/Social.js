SP.SOD.executeOrDelayUntilScriptLoaded(function () {
    var context = SP.ClientContext.get_current();
    var followingManager = new SP.Social.SocialFollowingManager(context);
    var info = new SP.Social.SocialActorInfo();
    info.set_actorType(SP.Social.SocialActorType.site);
    info.set_contentUri(GetUrlKeyValue("SPHostUrl"));
    var isFollowed = followingManager.isFollowed(info);

    context.executeQueryAsync(function (sender, args) {
        if (isFollowed.get_value())
            $get("results").innerHTML = "You are already following the app host site!"; else {
            var followResult = followingManager.follow(info);
            context.executeQueryAsync(function (sender, args) {
                if (followResult.get_value() == 0)
                    $get("results").innerHTML = "Now you're following the app host site! Check it on your profile page."; else
                    $get("results").innerHTML = "You failed to follow the app host site due to some mysterious error.";
            }, function (sender, args) {
                alert('Error trying to follow the app host site: ' + args.get_message());
            });
        }
    }, function (sender, args) {
        alert('Error: ' + args.get_message());
    });
}, 'sp.userprofiles.js');
//@ sourceMappingURL=Social.js.map
