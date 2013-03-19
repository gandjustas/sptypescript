///<reference path="../definitions/MicrosoftAjax.d.ts" />
///<reference path="../definitions/SP.d.ts" />
///<reference path="../definitions/SP.Init.d.ts" />
///<reference path="../definitions/clienttemplates.d.ts" />
///<reference path="../definitions/clientforms.d.ts" />
///<reference path="../extensions/typescripttemplates.ts" />

(function () {
    function init() {
        var complexityFieldName = "ComplexityField";
        return CSR.override()
                  .fieldView(complexityFieldName, SPFieldComplexity_View)
                  .fieldDisplay(complexityFieldName, SPFieldComplexity_Display)
                  .fieldEdit(complexityFieldName, SPFieldComplexity_Edit)
                  .fieldNew(complexityFieldName, SPFieldComplexity_Edit)
                  .register();
    }

    var map = {
        "Default": { color: "White", days: 0 },
        "V simple": { color: "Green", days: 2 },
        "Simple": { color: "Yellow", days: 3 },
        "Average": { color: "Orange", days: 6 },
        "Complex": { color: "Red", days: 10 },
        "V complex": { color: "Maroon", days: 12 }
    };

    // Overriding the list view
    function SPFieldComplexity_View(ctx: SPClientTemplates.RenderContext_FieldInView) {
        var complexity = <string>ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
        return GetDisplayHtml(complexity);
    };

    // Overriding the Display Form
    function SPFieldComplexity_Display(ctx: SPClientTemplates.RenderContext_FieldInForm) {
        return GetDisplayHtml(ctx.CurrentFieldValue);
    };

    // Overriding the Add and Edit Form 
    function SPFieldComplexity_Edit(ctx: SPClientTemplates.RenderContext_FieldInForm) {

        var fieldInternalName = ctx.CurrentFieldSchema.Name;
        var dropDownId = fieldInternalName + '_$DropDownChoice';
        var messageId = fieldInternalName + '_$Message';

        ctx.FormContext.registerInitCallback(fieldInternalName, () => {
            $addHandler($get(dropDownId), "change", (e) => {
                var val = (<HTMLSelectElement>$get(dropDownId)).value;
                ctx.FormContext.updateControlValue(fieldInternalName, val);
                document.getElementById(messageId).innerHTML = GetDisplayHtml(val);
            });
        });

        ctx.FormContext.registerFocusCallback(fieldInternalName, () => {
            $get(dropDownId).focus();
        });

        ctx.FormContext.registerValidationErrorCallback(fieldInternalName, (errorResult) => {
            SPFormControl_AppendValidationErrorMessage(dropDownId, errorResult);
        });

        return '<span dir="' + STSHtmlEncode(ctx.CurrentFieldSchema.Direction) + '">' + GetEditHtml(ctx, dropDownId, messageId) + '<br /></span>';
    };

    function GetDisplayHtml(complexity: string) {
        var pair = map[complexity] || map["default"];
        return "<span style='background-color : " + pair.color + "' >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;" + complexity + " Effort: " + pair.days;
    }

    function GetEditHtml(ctx: SPClientTemplates.RenderContext_FieldInForm, dropDownId: string, messageId: string) {
        var valueSet = false;
        var select = '<select id="' + STSHtmlEncode(dropDownId) + '" title="' + STSHtmlEncode(ctx.CurrentFieldSchema.Title) + '" class="ms-RadioText">';

        for (var choice in map) {
            var encodedVal = STSHtmlEncode(choice);
            var selectedStr = !valueSet && ctx.CurrentFieldValue == choice ? 'selected="selected" ' : '';

            valueSet = valueSet ? true : selectedStr != '';
            select += '<option value="' + encodedVal + '" ' + selectedStr + '>' + encodedVal + '</option>';
        }
        select += '</select>';

        var info = '<span id="' + messageId + '">' + GetDisplayHtml(ctx.CurrentFieldValue) + '</span>';
        return select + info;
    }

    SP.SOD.executeOrDelayUntilScriptLoaded(() => {
        SP.SOD.executeOrDelayUntilScriptLoaded(init, "typescripttemplates.ts");

        //Enable script with MDS
        SP.SOD.executeOrDelayUntilScriptLoaded(() => {
            RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Sample_CSRComplexityField/CSRField.js"), init);
        }, "sp.js");

    }, "clienttemplates.js");

})();
