$(":button.code-exec").click(function () {
    $("#" + this.parentElement.id + " .result-panel").toggle();

    if ($("#" + this.parentElement.id + " .result-panel").is(":visible")) {
        var funcName;
        var func;


        funcName = this.parentElement.id.replace("Container", "");
        func = window[funcName];
        func($("#" + this.parentElement.id + " .result-panel")[0]);
    }
});

$("a.code-link").click(function () {
    $("#" + this.parentElement.id + " .code-content").toggle();

    if ($("#" + this.parentElement.id + " .code-content").is(":visible")) {
        var funcName;
        var funcText;

        funcName = this.parentElement.id.replace("Container", "");
        funcText = window[funcName].toString();
        funcText = $("<div></div>").text(funcText).html();
        funcText = funcText.replace(/\r\n/g, "<br/>");
        funcText = funcText.replace(/ /g, "&nbsp;");

        $("#" + this.parentElement.id + " .code-content").html(funcText)
    }
});