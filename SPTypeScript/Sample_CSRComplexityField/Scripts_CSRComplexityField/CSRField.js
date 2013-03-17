(function () {
    function init() {
        var complexityFieldName = "ComplexityField";
        return CSR.override().fieldView(complexityFieldName, SPFieldComplexity_View).fieldDisplay(complexityFieldName, SPFieldComplexity_Display).fieldEdit(complexityFieldName, SPFieldComplexity_Edit).fieldNew(complexityFieldName, SPFieldComplexity_Edit).register();
    }
    var map = {
        "Default": {
            color: "White",
            days: 0
        },
        "V simple": {
            color: "Green",
            days: 2
        },
        "Simple": {
            color: "Yellow",
            days: 3
        },
        "Average": {
            color: "Orange",
            days: 6
        },
        "Complex": {
            color: "Red",
            days: 10
        },
        "V complex": {
            color: "Maroon",
            days: 12
        }
    };
    function SPFieldComplexity_View(ctx) {
        var complexity = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
        return GetDisplayHtml(complexity);
    }
    ;
    function SPFieldComplexity_Display(ctx) {
        return GetDisplayHtml(ctx.CurrentFieldValue);
    }
    ;
    function SPFieldComplexity_Edit(ctx) {
        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var dropDownId = fieldInternalName + '_$DropDownChoice';
        var messageId = fieldInternalName + '_$Message';
        ctx.FormContext.registerInitCallback(fieldInternalName, function () {
            $addHandler($get(dropDownId), "change", function (e) {
                var val = ($get(dropDownId)).value;
                ctx.FormContext.updateControlValue(fieldInternalName, val);
                document.getElementById(messageId).innerHTML = GetDisplayHtml(val);
            });
        });
        ctx.FormContext.registerFocusCallback(fieldInternalName, function () {
            $get(dropDownId).focus();
        });
        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, function (errorResult) {
            SPFormControl_AppendValidationErrorMessage(dropDownId, errorResult);
        });
        return '<span dir="' + STSHtmlEncode(ctx.CurrentFieldSchema.Direction) + '">' + GetEditHtml(ctx, dropDownId, messageId) + '<br /></span>';
    }
    ;
    function GetDisplayHtml(complexity) {
        var pair = map[complexity] || map["default"];
        return "<span style='background-color : " + pair.color + "' >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;" + complexity + " Effort: " + pair.days;
    }
    function GetEditHtml(ctx, dropDownId, messageId) {
        var valueSet = false;
        var select = '<select id="' + STSHtmlEncode(dropDownId) + '" title="' + STSHtmlEncode(ctx.CurrentFieldSchema.Title) + '" class="ms-RadioText">';
        for(var choice in map) {
            var encodedVal = STSHtmlEncode(choice);
            var selectedStr = !valueSet && ctx.CurrentFieldValue == choice ? 'selected="selected" ' : '';
            valueSet = valueSet ? true : selectedStr != '';
            select += '<option value="' + encodedVal + '" ' + selectedStr + '>' + encodedVal + '</option>';
        }
        select += '</select>';
        var info = '<span id="' + messageId + '">' + GetDisplayHtml(ctx.CurrentFieldValue) + '</span>';
        return select + info;
    }
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        SP.SOD.executeOrDelayUntilScriptLoaded(init, "typescripttemplates.ts");
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Scripts_CSRFields/CSRField.js"), init);
        }, "sp.js");
    }, "clienttemplates.js");
})();
//@ sourceMappingURL=CSRField.js.map
