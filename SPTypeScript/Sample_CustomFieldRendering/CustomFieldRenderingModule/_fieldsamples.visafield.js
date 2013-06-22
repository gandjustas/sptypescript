var spdevlab = spdevlab || {
};
spdevlab.fieldSamples = spdevlab.fieldSamples || {
};
spdevlab.fieldSamples.VisaFieldValidator = function () {
    spdevlab.fieldSamples.VisaFieldValidator.prototype.Validate = function (value) {
        value = SPClientTemplates.Utility.Trim(value);
        var re16digit = /^\d{16}$/;
        var hasError = !re16digit.test(value);
        var errorMsg = hasError ? "Please, fill out 4 digits per every text field." : '';
        return new SPClientForms.ClientValidation.ValidationResult(hasError, errorMsg);
    };
};
spdevlab.fieldSamples.VisaField = function () {
    var self = this;
    spdevlab.fieldSamples.VisaField.prototype._fieldName = "";
    spdevlab.fieldSamples.VisaField.prototype._fieldIds = [];
    spdevlab.fieldSamples.VisaField.prototype._errorContainerId = null;
    spdevlab.fieldSamples.VisaField.prototype._getVisaValuePart = function (value, partIndex) {
        if(value.length == 16) {
            return value.substring(partIndex * 4, (partIndex + 1) * 4);
        }
        return value;
    };
    spdevlab.fieldSamples.VisaField.prototype._wrapIntoInput = function (renderCtx, val, index) {
        var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
        var inputContainerId = formCtx.fieldName + '_' + formCtx.fieldSchema.Id + '_VisaField_' + index;
        self._fieldIds[index] = inputContainerId;
        return "<input type='text' id='" + inputContainerId + "' value='" + val + "' maxlength='4' size='4' />";
    };
    spdevlab.fieldSamples.VisaField.prototype._wrapErrorArea = function (renderCtx) {
        var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
        var errorContainerId = formCtx.fieldName + '_' + formCtx.fieldSchema.Id + '_VisaField_Error';
        self._errorContainerId = errorContainerId;
        return "<span id='" + errorContainerId + "' class='ms-formvalidation ms-csrformvalidation'></span>";
    };
    spdevlab.fieldSamples.VisaField.prototype._onGetValue = function () {
        var result = '';
        if(self._fieldIds.length == 4) {
            for(var key in self._fieldIds) {
                result += (document.getElementById(self._fieldIds[key])).value;
            }
        }
        return result;
    };
    spdevlab.fieldSamples.VisaField.prototype.viewTemplate = function (renderCtx, field, listItem, listSchema) {
        var fieldValue = '(null)';
        if(renderCtx != null && renderCtx.CurrentItem != null) {
            fieldValue = eval('renderCtx.CurrentItem.' + field.Name);
        }
        if(fieldValue.length == 16) {
            var arr = [];
            arr.push(self._getVisaValuePart(fieldValue, 0));
            arr.push(self._getVisaValuePart(fieldValue, 1));
            arr.push(self._getVisaValuePart(fieldValue, 2));
            arr.push(self._getVisaValuePart(fieldValue, 3));
            return arr.join("-");
        }
        return fieldValue;
    };
    spdevlab.fieldSamples.VisaField.prototype._initValidators = function (renderCtx) {
        var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
        var visaFieldValidators = new SPClientForms.ClientValidation.ValidatorSet();
        if(formCtx.fieldSchema.Required) {
            visaFieldValidators.RegisterValidator(new SPClientForms.ClientValidation.RequiredValidator());
        }
        visaFieldValidators.RegisterValidator(new spdevlab.fieldSamples.VisaFieldValidator());
        formCtx.registerValidationErrorCallback(formCtx.fieldName, self.onError);
        formCtx.registerClientValidator(formCtx.fieldName, visaFieldValidators);
    };
    spdevlab.fieldSamples.VisaField.prototype.newFormTemplate = function (renderCtx) {
        self._initValidators(renderCtx);
        var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
        formCtx.registerGetValueCallback(formCtx.fieldName, self._onGetValue);
        return self._wrapIntoInput(renderCtx, "", 0) + "-" + self._wrapIntoInput(renderCtx, "", 1) + "-" + self._wrapIntoInput(renderCtx, "", 2) + "-" + self._wrapIntoInput(renderCtx, "", 3) + self._wrapErrorArea(renderCtx);
    };
    spdevlab.fieldSamples.VisaField.prototype.editFormTemplate = function (renderCtx) {
        var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
        var fieldValue = renderCtx.CurrentItem[renderCtx.CurrentFieldSchema.Name];
        self._initValidators(renderCtx);
        var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
        formCtx.registerGetValueCallback(formCtx.fieldName, self._onGetValue);
        if(fieldValue.length == 16) {
            return self._wrapIntoInput(renderCtx, self._getVisaValuePart(fieldValue, 0), 0) + "-" + self._wrapIntoInput(renderCtx, self._getVisaValuePart(fieldValue, 1), 1) + "-" + self._wrapIntoInput(renderCtx, self._getVisaValuePart(fieldValue, 2), 2) + "-" + self._wrapIntoInput(renderCtx, self._getVisaValuePart(fieldValue, 3), 3) + self._wrapErrorArea(renderCtx);
        }
        return fieldValue;
    };
    spdevlab.fieldSamples.VisaField.prototype.displayFormTemplate = function (renderCtx) {
        if(renderCtx != null && renderCtx.CurrentFieldValue != null) {
            var fieldValue = renderCtx.CurrentFieldValue.toString();
            if(fieldValue.length == 16) {
                var arr = [];
                arr.push(self._getVisaValuePart(fieldValue, 0));
                arr.push(self._getVisaValuePart(fieldValue, 1));
                arr.push(self._getVisaValuePart(fieldValue, 2));
                arr.push(self._getVisaValuePart(fieldValue, 3));
                return arr.join("-");
            }
            return fieldValue;
        }
        return '';
    };
    spdevlab.fieldSamples.VisaField.prototype.onError = function (error) {
        if(self._errorContainerId != null) {
            document.getElementById(self._errorContainerId).innerHTML = "<span role='alert'>" + error.errorMessage + "</span>";
        }
    };
    spdevlab.fieldSamples.VisaField.prototype.init = function (targetFieldName) {
        self._fieldName = targetFieldName;
        var fieldName = self._fieldName;
        var visaFieldTemplates = {
        };
        visaFieldTemplates.Templates = {
            Fields: {
            }
        };
        visaFieldTemplates.Templates.Fields[fieldName] = {
        };
        visaFieldTemplates.Templates.Fields[fieldName]["View"] = self.viewTemplate;
        visaFieldTemplates.Templates.Fields[fieldName]["NewForm"] = self.newFormTemplate;
        visaFieldTemplates.Templates.Fields[fieldName]["EditForm"] = self.editFormTemplate;
        visaFieldTemplates.Templates.Fields[fieldName]["DisplayForm"] = self.displayFormTemplate;
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(visaFieldTemplates);
    };
};
(function () {
    var visaField = new spdevlab.fieldSamples.VisaField();
    visaField.init("VisaField");
})();
//@ sourceMappingURL=_fieldsamples.visafield.js.map
