///<reference path="../../Definitions/SharePoint.d.ts" />

module _ {
    module fieldSamples {
        // visa field validator impl
        class VisaFieldValidator implements SPClientForms.ClientValidation.IValidator {

            Validate(value) {

                value = SPClientTemplates.Utility.Trim(value);

                var re16digit = /^\d{16}$/;

                var hasError = !re16digit.test(value);
                var errorMsg = hasError ? "Please, fill out 4 digits per every text field." : '';

                return new SPClientForms.ClientValidation.ValidationResult(hasError, errorMsg);
            }
        };

        // visa field impl
        export class VisaField {
            private _fieldName = "";
            private _fieldIds = [];
            private _errorContainerId: string = null;

            private _getVisaValuePart = function (value, partIndex) {

                if (value.length == 16) {
                    return value.substring(partIndex * 4, (partIndex + 1) * 4);
                }

                return value;
            };

            private _wrapIntoInput(renderCtx, val, index) {

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var inputContainerId = formCtx.fieldName + '_' + formCtx.fieldSchema.Id + '_VisaField_' + index;

                this._fieldIds[index] = inputContainerId;

                return "<input type='text' id='" + inputContainerId + "' value='" + val + "' maxlength='4' size='4' />";
            }

            private _wrapErrorArea(renderCtx) {

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var errorContainerId = formCtx.fieldName + '_' + formCtx.fieldSchema.Id + '_VisaField_Error';

                this._errorContainerId = errorContainerId;

                return "<span id='" + errorContainerId + "' class='ms-formvalidation ms-csrformvalidation'></span>";
            }

            private _onGetValue() {

                var result = '';

                if (this._fieldIds.length == 4) {
                    for (var i = 0; i < this._fieldIds.length; i++) {
                        result += (<HTMLInputElement>document.getElementById(this._fieldIds[i])).value;
                    }
                }

                return result;
            }


            _initValidators(renderCtx: SPClientTemplates.RenderContext_FieldInForm) {

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);

                var visaFieldValidators = new SPClientForms.ClientValidation.ValidatorSet();

                if (formCtx.fieldSchema.Required) {
                    visaFieldValidators.RegisterValidator(new SPClientForms.ClientValidation.RequiredValidator());
                }

                visaFieldValidators.RegisterValidator(new VisaFieldValidator());

                formCtx.registerValidationErrorCallback(formCtx.fieldName, (e) => this.onError(e));
                formCtx.registerClientValidator(formCtx.fieldName, visaFieldValidators);
            }




            onError(error) {

                if (this._errorContainerId != null) {

                    document
                        .getElementById(this._errorContainerId)
                        .innerHTML = "<span role='alert'>" + error.errorMessage + "</span>";
                }

            }

            newFormTemplate(renderCtx: SPClientTemplates.RenderContext_FieldInForm) {

                this._initValidators(renderCtx);

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                formCtx.registerGetValueCallback(formCtx.fieldName, () => this._onGetValue());

                return this._wrapIntoInput(renderCtx, "", 0) + "-" +
                       this._wrapIntoInput(renderCtx, "", 1) + "-" +
                       this._wrapIntoInput(renderCtx, "", 2) + "-" +
                       this._wrapIntoInput(renderCtx, "", 3) + this._wrapErrorArea(renderCtx);
            }

            editFormTemplate(renderCtx: SPClientTemplates.RenderContext_FieldInForm) {

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var fieldValue = renderCtx.CurrentFieldValue;

                this._initValidators(renderCtx);

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                formCtx.registerGetValueCallback(formCtx.fieldName, () => this._onGetValue());

                if (fieldValue.length == 16) {

                    return this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 0), 0) + "-" +
                           this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 1), 1) + "-" +
                           this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 2), 2) + "-" +
                           this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 3), 3) + this._wrapErrorArea(renderCtx);
                }

                return fieldValue;
            }

            displayFormTemplate(renderCtx: SPClientTemplates.RenderContext_FieldInForm) {

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
            }

            viewTemplate(renderCtx: SPClientTemplates.RenderContext_FieldInView) {

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
            }

            init(targetFieldName: string) {



                this._fieldName = targetFieldName;

                var fieldName = this._fieldName;
                var visaFieldTemplates: SPClientTemplates.TemplateOverridesOptions = {};

                visaFieldTemplates.Templates = {
                    Fields: {}
                };

                visaFieldTemplates.Templates.Fields[fieldName] = {};

                visaFieldTemplates.Templates.Fields[fieldName].View = (ctx) => this.viewTemplate(ctx);
                visaFieldTemplates.Templates.Fields[fieldName].NewForm = (ctx) => this.newFormTemplate(ctx);
                visaFieldTemplates.Templates.Fields[fieldName].EditForm = (ctx) => this.editFormTemplate(ctx);
                visaFieldTemplates.Templates.Fields[fieldName].DisplayForm = (ctx) => this.displayFormTemplate(ctx);

                SPClientTemplates.TemplateManager.RegisterTemplateOverrides(visaFieldTemplates);
            }
        };
    }

    var visaField = new fieldSamples.VisaField();
    visaField.init("VisaField");
}