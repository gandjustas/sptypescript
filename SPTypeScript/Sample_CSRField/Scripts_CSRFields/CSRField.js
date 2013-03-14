(function () {
    function init() {
        var complexityFieldName = "ComplexityField";
        return Csr.override().fieldView(complexityFieldName, SPFieldComplexity_View).fieldDisplay(complexityFieldName, SPFieldComplexity_Display).fieldEdit(complexityFieldName, SPFieldComplexity_Edit).fieldNew(complexityFieldName, SPFieldComplexity_Edit).register();
    }
    var map = {
        "default": {
            color: "White",
            days: 0
        },
        "v simple": {
            color: "Green",
            days: 2
        },
        "simple": {
            color: "Yellow",
            days: 3
        },
        "average": {
            color: "Orange",
            days: 6
        },
        "complex": {
            color: "Red",
            days: 10
        },
        "v complex": {
            color: "Maroon",
            days: 12
        }
    };
    function SPFieldComplexity_View(ctx) {
        var complexity = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
        var pair = map[complexity.trim().toLowerCase()] || map["default"];
        return "<span style='background-color : " + pair.color + "' >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;" + complexity + " Per Person Days: " + pair.days;
    }
    ;
    function GetDisplayMessage(complexity) {
        var pair = map[complexity.trim().toLowerCase()] || map["default"];
        return "<span style='background-color : " + pair.color + "' >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;" + complexity + " Effort: " + pair.days;
    }
    function SPFieldComplexity_Display(rCtx) {
        if(rCtx == null) {
            return '';
        }
        var _myData = SPClientTemplates.Utility.GetFormContextForCurrentField(rCtx);
        if(_myData == null || _myData.fieldSchema == null || _myData.fieldValue == null) {
            return '';
        }
        return GetDisplayMessage(_myData.fieldValue);
    }
    ;
    function SPFieldComplexity_Edit(rCtx) {
        function InitDropDown() {
            _dropDownElt = document.getElementById(_dropDownId);
            if(_dropDownElt != null) {
                AddEvtHandler(_dropDownElt, "onchange", UpdateDropDownValue);
            }
        }
        function FocusDropDown() {
            if(_isFillInChoice && !_isChoiceSelected && _fillInTextElt != null) {
                _fillInTextElt.focus();
            } else if(_dropDownElt != null) {
                _dropDownElt.focus();
            }
        }
        function OnValidationError(errorResult) {
            if(_isFillInChoice) {
                SPFormControl_AppendValidationErrorMessage(_fillInTableId, errorResult);
            } else {
                SPFormControl_AppendValidationErrorMessage(_dropDownId, errorResult);
            }
        }
        function UpdateDropDownValue() {
            _myData.updateControlValue(_myData.fieldName, GetDropDownValue());
            document.getElementById(_messageId).innerHTML = GetDisplayMessage(GetDropDownValue());
        }
        function GetDropDownValue() {
            if(!_isFillInChoice) {
                return _dropDownElt != null ? _dropDownElt.value : '';
            } else {
                if(_fillInRadio.checked && _fillInTextElt != null) {
                    return SPClientTemplates.Utility.Trim(_fillInTextElt.value);
                }
                if(_dropDownRadio.checked && _dropDownElt != null) {
                    return _dropDownElt.value;
                }
                return '';
            }
        }
        function CurrentChoiceValueExists(v) {
            for(var i in _choices) {
                if(v == _choices[i]) {
                    return true;
                }
            }
            return false;
        }
        function BuildSelectHtml() {
            var valueSet = false;
            var select = '<select id="' + STSHtmlEncode(_dropDownId) + '" title="' + STSHtmlEncode(_myData.fieldSchema.Title) + '" class="ms-RadioText">';
            for(var idx = 0; idx < _choices.length; idx++) {
                var val = _choices[idx];
                var encodedVal = STSHtmlEncode(val);
                var selectedStr = !valueSet && _initialValue == val ? 'selected="selected" ' : '';
                valueSet = valueSet ? true : selectedStr != '';
                select += '<option value="' + encodedVal + '" ' + selectedStr + '>' + encodedVal + '</option>';
            }
            select += '</select>';
            var info = '<span id="' + _messageId + '">' + GetDisplayMessage(_initialValue) + '</span>';
            return select + info;
        }
        if(rCtx == null) {
            return '';
        }
        var _myData = SPClientTemplates.Utility.GetFormContextForCurrentField(rCtx);
        if(_myData == null || _myData.fieldSchema == null) {
            return '';
        }
        var _idPrefix = _myData.fieldName + '_' + _myData.fieldSchema.Id;
        var _dropDownId = _idPrefix + '_$DropDownChoice';
        var _messageId = _idPrefix + '_$Message';
        var _isFillInChoice = _myData.fieldSchema.FillInChoice;
        var _radioName = '', _fillInRadioId = '';
        var _dropDownRadioId = '', _fillInTextId = '', _fillInTableId = '';
        var _fillInRadio, _dropDownRadio;
        var _fillInTextElt, _dropDownElt;
        var _initialValue = '';
        var _choices = _myData.fieldSchema.Choices;
        _choices[0] = "V Simple";
        _choices[1] = "Simple";
        _choices[2] = "Average";
        _choices[3] = "Complex";
        _choices[4] = "V Complex";
        _initialValue = _myData.fieldValue != null ? _myData.fieldValue : '';
        var _doesChoiceExist = CurrentChoiceValueExists(_initialValue);
        var _isChoiceEmpty = _initialValue == '' || !_doesChoiceExist && !_isFillInChoice;
        var _isChoiceSelected = !_isFillInChoice || _isChoiceEmpty || _doesChoiceExist;
        _myData.registerInitCallback(_myData.fieldName, InitDropDown);
        _myData.registerFocusCallback(_myData.fieldName, FocusDropDown);
        _myData.registerValidationErrorCallback(_myData.fieldName, OnValidationError);
        _myData.registerGetValueCallback(_myData.fieldName, GetDropDownValue);
        _myData.updateControlValue(_myData.fieldName, _initialValue);
        return '<span dir="' + STSHtmlEncode(_myData.fieldSchema.Direction) + '">' + BuildSelectHtml() + '<br /></span>';
    }
    ;
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        SP.SOD.executeOrDelayUntilScriptLoaded(init, "typescripttemplates.ts");
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Scripts_CSRFields/CSRField.js"), init);
        }, "sp.js");
    }, "clienttemplates.js");
})();
//@ sourceMappingURL=CSRField.js.map
