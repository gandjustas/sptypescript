var _;
(function (_) {
    var fieldSamples;
    (function (fieldSamples) {
        var VisaFieldValidator = (function () {
            function VisaFieldValidator() {
            }
            VisaFieldValidator.prototype.Validate = function (value) {
                value = SPClientTemplates.Utility.Trim(value);

                var re16digit = /^\d{16}$/;

                var hasError = !re16digit.test(value);
                var errorMsg = hasError ? "Please, fill out 4 digits per every text field." : '';

                return new SPClientForms.ClientValidation.ValidationResult(hasError, errorMsg);
            };
            return VisaFieldValidator;
        })();
        ;

        var VisaField = (function () {
            function VisaField() {
                this._fieldName = "";
                this._fieldIds = [];
                this._errorContainerId = null;
                this._getVisaValuePart = function (value, partIndex) {
                    if (value.length == 16) {
                        return value.substring(partIndex * 4, (partIndex + 1) * 4);
                    }

                    return value;
                };
            }
            VisaField.prototype._wrapIntoInput = function (renderCtx, val, index) {
                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var inputContainerId = formCtx.fieldName + '_' + formCtx.fieldSchema.Id + '_VisaField_' + index;

                this._fieldIds[index] = inputContainerId;

                return "<input type='text' id='" + inputContainerId + "' value='" + val + "' maxlength='4' size='4' />";
            };

            VisaField.prototype._wrapErrorArea = function (renderCtx) {
                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var errorContainerId = formCtx.fieldName + '_' + formCtx.fieldSchema.Id + '_VisaField_Error';

                this._errorContainerId = errorContainerId;

                return "<span id='" + errorContainerId + "' class='ms-formvalidation ms-csrformvalidation'></span>";
            };

            VisaField.prototype._onGetValue = function () {
                var result = '';

                if (this._fieldIds.length == 4) {
                    for (var i = 0; i < this._fieldIds.length; i++) {
                        result += (document.getElementById(this._fieldIds[i])).value;
                    }
                }

                return result;
            };

            VisaField.prototype._initValidators = function (renderCtx) {
                var _this = this;
                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);

                var visaFieldValidators = new SPClientForms.ClientValidation.ValidatorSet();

                if (formCtx.fieldSchema.Required) {
                    visaFieldValidators.RegisterValidator(new SPClientForms.ClientValidation.RequiredValidator());
                }

                visaFieldValidators.RegisterValidator(new VisaFieldValidator());

                formCtx.registerValidationErrorCallback(formCtx.fieldName, function (e) {
                    return _this.onError(e);
                });
                formCtx.registerClientValidator(formCtx.fieldName, visaFieldValidators);
            };

            VisaField.prototype.onError = function (error) {
                if (this._errorContainerId != null) {
                    document.getElementById(this._errorContainerId).innerHTML = "<span role='alert'>" + error.errorMessage + "</span>";
                }
            };

            VisaField.prototype.newFormTemplate = function (renderCtx) {
                var _this = this;
                this._initValidators(renderCtx);

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                formCtx.registerGetValueCallback(formCtx.fieldName, function () {
                    return _this._onGetValue();
                });

                return this._wrapIntoInput(renderCtx, "", 0) + "-" + this._wrapIntoInput(renderCtx, "", 1) + "-" + this._wrapIntoInput(renderCtx, "", 2) + "-" + this._wrapIntoInput(renderCtx, "", 3) + this._wrapErrorArea(renderCtx);
            };

            VisaField.prototype.editFormTemplate = function (renderCtx) {
                var _this = this;
                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var fieldValue = renderCtx.CurrentFieldValue;

                this._initValidators(renderCtx);

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                formCtx.registerGetValueCallback(formCtx.fieldName, function () {
                    return _this._onGetValue();
                });

                if (fieldValue.length == 16) {
                    return this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 0), 0) + "-" + this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 1), 1) + "-" + this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 2), 2) + "-" + this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 3), 3) + this._wrapErrorArea(renderCtx);
                }

                return fieldValue;
            };

            VisaField.prototype.displayFormTemplate = function (renderCtx) {
                if (renderCtx != null && renderCtx.CurrentFieldValue != null) {
                    var fieldValue = renderCtx.CurrentFieldValue.toString();

                    if (fieldValue.length == 16) {
                        var arr = [];

                        arr.push(this._getVisaValuePart(fieldValue, 0));
                        arr.push(this._getVisaValuePart(fieldValue, 1));
                        arr.push(this._getVisaValuePart(fieldValue, 2));
                        arr.push(this._getVisaValuePart(fieldValue, 3));

                        return arr.join("-");
                    }

                    return fieldValue;
                }

                return '';
            };

            VisaField.prototype.viewTemplate = function (renderCtx) {
                var fieldValue = renderCtx.CurrentItem[renderCtx.CurrentFieldSchema.Name] || '(null)';

                if (fieldValue.length == 16) {
                    var arr = [];

                    arr.push(this._getVisaValuePart(fieldValue, 0));
                    arr.push(this._getVisaValuePart(fieldValue, 1));
                    arr.push(this._getVisaValuePart(fieldValue, 2));
                    arr.push(this._getVisaValuePart(fieldValue, 3));

                    return arr.join("-");
                }

                return fieldValue;
            };

            VisaField.prototype.init = function (targetFieldName) {
                var _this = this;
                this._fieldName = targetFieldName;

                var fieldName = this._fieldName;
                var visaFieldTemplates = {};

                visaFieldTemplates.Templates = {
                    Fields: {}
                };

                visaFieldTemplates.Templates.Fields[fieldName] = {};

                visaFieldTemplates.Templates.Fields[fieldName].View = function (ctx) {
                    return _this.viewTemplate(ctx);
                };
                visaFieldTemplates.Templates.Fields[fieldName].NewForm = function (ctx) {
                    return _this.newFormTemplate(ctx);
                };
                visaFieldTemplates.Templates.Fields[fieldName].EditForm = function (ctx) {
                    return _this.editFormTemplate(ctx);
                };
                visaFieldTemplates.Templates.Fields[fieldName].DisplayForm = function (ctx) {
                    return _this.displayFormTemplate(ctx);
                };

                SPClientTemplates.TemplateManager.RegisterTemplateOverrides(visaFieldTemplates);
            };
            return VisaField;
        })();
        fieldSamples.VisaField = VisaField;
        ;
    })(fieldSamples || (fieldSamples = {}));

    var visaField = new fieldSamples.VisaField();
    visaField.init("VisaField");
})(_ || (_ = {}));
//@ sourceMappingURL=fieldsamples.visafield.js.map
