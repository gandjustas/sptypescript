var _;
(function (_) {
    var fieldSamples;
    (function (fieldSamples) {
        // visa field validator impl
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
        }());
        ;
        // visa field impl
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
                return "<input type=\"text\" id=\"" + inputContainerId + "\" value=\"" + val + "\" maxlength=\"4\" size=\"4\" />";
            };
            VisaField.prototype._wrapErrorArea = function (renderCtx) {
                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var errorContainerId = formCtx.fieldName + '_' + formCtx.fieldSchema.Id + '_VisaField_Error';
                this._errorContainerId = errorContainerId;
                return "<span id=\"" + errorContainerId + "\" class=\"ms-formvalidation ms-csrformvalidation\"></span>";
            };
            VisaField.prototype._onGetValue = function () {
                var result = '';
                if (this._fieldIds.length == 4) {
                    for (var i = 0; i < this._fieldIds.length; i++) {
                        result += document.getElementById(this._fieldIds[i]).value;
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
                formCtx.registerValidationErrorCallback(formCtx.fieldName, function (e) { return _this.onError(e); });
                formCtx.registerClientValidator(formCtx.fieldName, visaFieldValidators);
            };
            VisaField.prototype.onError = function (error) {
                if (this._errorContainerId != null) {
                    document
                        .getElementById(this._errorContainerId)
                        .innerHTML = "<span role='alert'>" + error.errorMessage + "</span>";
                }
            };
            VisaField.prototype.newFormTemplate = function (renderCtx) {
                var _this = this;
                this._initValidators(renderCtx);
                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                formCtx.registerGetValueCallback(formCtx.fieldName, function () { return _this._onGetValue(); });
                return this._wrapIntoInput(renderCtx, "", 0) + "-" +
                    this._wrapIntoInput(renderCtx, "", 1) + "-" +
                    this._wrapIntoInput(renderCtx, "", 2) + "-" +
                    this._wrapIntoInput(renderCtx, "", 3) + this._wrapErrorArea(renderCtx);
            };
            VisaField.prototype.editFormTemplate = function (renderCtx) {
                var _this = this;
                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var fieldValue = renderCtx.CurrentFieldValue;
                this._initValidators(renderCtx);
                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                formCtx.registerGetValueCallback(formCtx.fieldName, function () { return _this._onGetValue(); });
                if (fieldValue.length == 16) {
                    return this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 0), 0) + "-" +
                        this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 1), 1) + "-" +
                        this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 2), 2) + "-" +
                        this._wrapIntoInput(renderCtx, this._getVisaValuePart(fieldValue, 3), 3) + this._wrapErrorArea(renderCtx);
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
                visaFieldTemplates.Templates.Fields[fieldName].View = function (ctx) { return _this.viewTemplate(ctx); };
                visaFieldTemplates.Templates.Fields[fieldName].NewForm = function (ctx) { return _this.newFormTemplate(ctx); };
                visaFieldTemplates.Templates.Fields[fieldName].EditForm = function (ctx) { return _this.editFormTemplate(ctx); };
                visaFieldTemplates.Templates.Fields[fieldName].DisplayForm = function (ctx) { return _this.displayFormTemplate(ctx); };
                SPClientTemplates.TemplateManager.RegisterTemplateOverrides(visaFieldTemplates);
                //Ported from Anton Vishnykov sample
                //http://spdevlab.com/2013/08/26/custom-field-type-for-sharepoint-2013-custom-quick-edit-mode-implementation/
                SP.SOD.executeOrDelayUntilScriptLoaded(function () {
                    SP.GanttControl.WaitForGanttCreation(function (ganttChart) {
                        var visaColumn = null;
                        var visaFieldQuickEditId = "EDIT_SPDLAB_VISAFIELD";
                        var columns = ganttChart.get_Columns();
                        for (var i = 0; i < columns.length; i++) {
                            if (columns[i].columnKey == "VisaField") {
                                visaColumn = columns[i];
                                break;
                            }
                        }
                        if (visaColumn) {
                            visaColumn.fnGetEditControlName = function (record, key) {
                                return visaFieldQuickEditId;
                            };
                            SP.JsGrid.PropertyType.Utils.RegisterEditControl(visaFieldQuickEditId, function (gridContext, gridTextInputElement) {
                                return new VisaFieldGridEditControl(gridContext, gridTextInputElement);
                            }, []);
                        }
                    });
                }, "spgantt.js");
            };
            return VisaField;
        }());
        fieldSamples.VisaField = VisaField;
        ;
    })(fieldSamples || (fieldSamples = {}));
    var visaField = new fieldSamples.VisaField();
    visaField.init("VisaField");
    var VisaFieldGridEditControl = (function () {
        function VisaFieldGridEditControl(gridContext, gridTextInputElement) {
            this.gridContext = gridContext;
            this.gridTextInputElement = gridTextInputElement;
            this._tbs = [];
            this.SupportedReadMode = SP.JsGrid.EditActorReadType.LocalizedOnly;
            this.SupportedWriteMode = SP.JsGrid.EditActorWriteType.LocalizedOnly;
            this._cnt = document.createElement('div');
            this._cnt.style.cssText = 'visibility:hidden;position:absolute;top:0px;left:0px;background:#ffffff;border:1px #dedede solid;';
            for (var i = 0; i < 4; i++) {
                var newTb = document.createElement('input');
                newTb.id = "spdevlab-visafield-quickedit-" + i.toString();
                newTb.value = i.toString();
                newTb.style.cssText = 'position:;top:0px;left:0px;';
                newTb.maxLength = 4;
                newTb.size = 4;
                this._cnt.appendChild(newTb);
                this._tbs[i] = newTb;
            }
            this.gridContext.parentNode.appendChild(this._cnt);
        }
        VisaFieldGridEditControl.prototype.GetCellContext = function () {
            return this.cellContext;
        };
        VisaFieldGridEditControl.prototype.GetOriginalValue = function () {
            debugger;
            return this.cellContext.originalValue;
        };
        VisaFieldGridEditControl.prototype.SetValue = function (value) {
            this.cellContext.SetCurrentValue({
                localized: value
            });
        };
        VisaFieldGridEditControl.prototype.Dispose = function () {
            debugger;
        };
        VisaFieldGridEditControl.prototype.GetInputElement = function () {
            debugger;
            return null;
        };
        VisaFieldGridEditControl.prototype.Focus = function (eventInfo) {
            debugger;
        };
        VisaFieldGridEditControl.prototype.BindToCell = function (cellContext) {
            this.cellContext = cellContext;
        };
        VisaFieldGridEditControl.prototype.OnBeginEdit = function (eventInfo) {
            this._inEdit = true;
            var currentValue = this.cellContext.originalValue.localized;
            if (currentValue) {
                for (var i = 0; i < this._tbs.length; i++) {
                    this._tbs[i].value = currentValue.substring(i * 4, (i + 1) * 4);
                }
            }
            this.cellContext.Show(this._cnt);
            this.setupHandlers(true);
            this.Focus(eventInfo);
        };
        VisaFieldGridEditControl.prototype.Unbind = function () {
            //debugger;
        };
        VisaFieldGridEditControl.prototype.OnEndEdit = function () {
            this.cellContext.Hide(this._cnt);
            this._inEdit = false;
            this.setupHandlers(false);
            var value = this._tbs[0].value + "" +
                this._tbs[1].value + "" +
                this._tbs[2].value + "" +
                this._tbs[3].value;
            this.cellContext
                .SetCurrentValue({
                localized: value
            });
        };
        VisaFieldGridEditControl.prototype.OnCellMove = function () {
            debugger;
        };
        VisaFieldGridEditControl.prototype.OnValueChanged = function (newValue) {
            debugger;
        };
        VisaFieldGridEditControl.prototype.IsCurrentlyUsingGridTextInputElement = function () {
            return false;
        };
        VisaFieldGridEditControl.prototype.SetSize = function (width, height) {
            debugger;
        };
        VisaFieldGridEditControl.prototype.setupHandlers = function (attachActions) {
            for (var i = 0; i < this._tbs.length; i++) {
                var tb = this._tbs[i];
                if (attachActions) {
                    $addHandler(tb, 'focus', this.gridContext.OnActivateActor);
                    $addHandler(tb, 'blur', this.gridContext.OnDeactivateActor);
                    $addHandler(tb, 'keydown', this.gridContext.OnKeyDown);
                    $addHandler(tb, 'keyup', this.OnKeyUp);
                    $addHandler(tb, 'mousedown', this.OnMouseDown);
                }
                else {
                    $removeHandler(tb, 'focus', this.gridContext.OnActivateActor);
                    $removeHandler(tb, 'blur', this.gridContext.OnDeactivateActor);
                    $removeHandler(tb, 'keydown', this.gridContext.OnKeyDown);
                    $removeHandler(tb, 'keyup', this.OnKeyUp);
                    $removeHandler(tb, 'mousedown', this.OnMouseDown);
                }
            }
        };
        VisaFieldGridEditControl.prototype.OnKeyUp = function () {
        };
        VisaFieldGridEditControl.prototype.OnMouseDown = function (eventInfo) {
            eventInfo.stopPropagation();
        };
        return VisaFieldGridEditControl;
    }());
})(_ || (_ = {}));
//# sourceMappingURL=fieldsamples.visafield.js.map