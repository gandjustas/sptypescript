// Prepare the options and render the control
// The Help, Account and Contact pages receive the 
//   same query string parameters as the main page
(function () {
    var options = {
        appIconUrl: "../Images/AppIcon.png",
        appTitle: "Basic tasks using the JSOM",
        appHelpPageUrl: "Help.html?"
            + document.URL.split("?")[1],
        settingsLinks: [
            {
                linkUrl: "BasicTasksJSOM.html?"
                    + document.URL.split("?")[1],
                displayName: "Samples home"
            },
            {
                linkUrl: "Account.html?"
                    + document.URL.split("?")[1],
                displayName: "Account settings"
            },
            {
                linkUrl: "Contact.html?"
                    + document.URL.split("?")[1],
                displayName: "Contact us"
            }
        ]
    };
    var nav = new SP.UI.Controls.Navigation("chrome_ctrl_placeholder", options);
    nav.setVisible(true);
})();
//# sourceMappingURL=ChromeLoader.js.map