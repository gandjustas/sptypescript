var context;
var web;
var user;
$(document).ready(function () {
    context = SP.ClientContext.get_current();
    web = context.get_web();
    getUserName();
});
function getUserName() {
    user = web.get_currentUser();
    context.load(user);
    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}
function onGetUserNameSuccess() {
    $('#message').text('Hello ' + user.get_title());
}
function onGetUserNameFail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}
//@ sourceMappingURL=App.js.map
