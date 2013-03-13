var context;
var web;
var user;

// Этот код, запускаемый после готовности модели DOM, создает объект контекста, который требуется для использования объектной модели SharePoint
$(document).ready(function () {
    context = SP.ClientContext.get_current();
    web = context.get_web();

    getUserName();
});

// Эта функция подготавливает, загружает и затем выполняет запрос SharePoint для получения сведений о текущих пользователях
function getUserName() {
    user = web.get_currentUser();
    context.load(user);
    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}

// Эта функция выполняется, если приведенный выше вызов OM был успешным
// Она заменяет содержимое элемента helloString именем пользователя
function onGetUserNameSuccess() {
    $('#message').text('Hello ' + user.get_title());
}

// Эта функция выполняется при сбое приведенного выше вызова
function onGetUserNameFail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}
