///<reference path="../Definitions/SharePoint.d.ts" />

SP.SOD.execute("mquery.js", "m$.ready", () => {
    var photo1 = document.getElementById("photo1"); 
    m$("#cmdHidePhoto").click((e) => {
        SPAnimationUtility.BasicAnimator.FadeOut(photo1); 
    });

    m$("#cmdShowPhoto").click((e) => {
        SPAnimationUtility.BasicAnimator.FadeIn(photo1);
    });
    m$("#cmdEnlargePhoto").click((e) => {
        SPAnimationUtility.BasicAnimator.Resize(photo1, 100, 100);
    });
    m$("#cmdChangeOpacity").click((e) => {
        var state = new SPAnimation.State();
        state.SetAttribute(SPAnimation.Attribute.Opacity, 0.2);
        var animation = new SPAnimation.Object(SPAnimation.ID.Basic_Opacity, 500, photo1, state);
        
        animation.RunAnimation(); 

    }); 

});