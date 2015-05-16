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

            private _getVisaValuePart = function(value, partIndex) {

                if (value.length == 16) {
                    return value.substring(partIndex * 4, (partIndex + 1) * 4);
                }

                return value;
            };

            private _wrapIntoInput(renderCtx, val, index) {

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var inputContainerId = formCtx.fieldName + '_' + formCtx.fieldSchema.Id + '_VisaField_' + index;

                this._fieldIds[index] = inputContainerId;

                return `<input type="text" id="${inputContainerId}" value="${val}" maxlength="4" size="4" />`;
            }

            private _wrapErrorArea(renderCtx) {

                var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(renderCtx);
                var errorContainerId = formCtx.fieldName + '_' + formCtx.fieldSchema.Id + '_VisaField_Error';

                this._errorContainerId = errorContainerId;

                return `<span id="${errorContainerId}" class="ms-formvalidation ms-csrformvalidation"></span>`;
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

                //Ported from Anton Vishnykov sample
                //http://spdevlab.com/2013/08/26/custom-field-type-for-sharepoint-2013-custom-quick-edit-mode-implementation/
                SP.SOD.executeOrDelayUntilScriptLoaded(() => {
                    SP.GanttControl.WaitForGanttCreation(ganttChart => {
                        var visaColumn: SP.JsGrid.ColumnInfo = null;

                        var visaFieldQuickEditId = "EDIT_SPDLAB_VISAFIELD";
                        var columns = ganttChart.get_Columns();

                        for (var i = 0; i < columns.length; i++) {
                            if (columns[i].columnKey == "VisaField") {
                                visaColumn = columns[i];
                                break;
                            }
                        }

                        if (visaColumn) {
                            visaColumn.fnGetEditControlName = (record, key) => {
                                return visaFieldQuickEditId;
                            };

                            SP.JsGrid.PropertyType.Utils.RegisterEditControl(visaFieldQuickEditId,
                            (gridContext, gridTextInputElement) => {
                                return new VisaFieldGridEditControl(gridContext, gridTextInputElement);
                            }, []);
                        }

                    });
                }, "spgantt.js");

            }
        };
    }

    var visaField = new fieldSamples.VisaField();
    visaField.init("VisaField");

    class VisaFieldGridEditControl implements SP.JsGrid.IEditControl {
        constructor(public gridContext: SP.JsGrid.IEditControlGridContext, public gridTextInputElement: HTMLElement) {
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

        private _cnt: HTMLDivElement;
        private _tbs: HTMLInputElement[] = [];

        private cellContext: SP.JsGrid.IEditControlCellContext;

        private _inEdit: boolean;

        public SupportedWriteMode: SP.JsGrid.EditActorWriteType;
        public SupportedReadMode: SP.JsGrid.EditActorReadType;

        public GetCellContext(): SP.JsGrid.IEditControlCellContext {
            return this.cellContext;
        }

        public GetOriginalValue(): SP.JsGrid.IValue {
            debugger;
            return this.cellContext.originalValue;
        }

        public SetValue(value: SP.JsGrid.IValue): void {
            this.cellContext.SetCurrentValue({
                localized: value
            });
        }

        public Dispose(): void {
            debugger;
        }

        public GetInputElement(): HTMLElement {
            debugger;
            return null;
        }

        public Focus(eventInfo): void {
            debugger;
        }

        public BindToCell(cellContext: SP.JsGrid.IEditControlCellContext): void {
            this.cellContext = cellContext;
        }

        public OnBeginEdit(eventInfo: Sys.UI.DomEvent): void {
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

        }

        public Unbind(): void {
            //debugger;
        }

        public OnEndEdit(): void {
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

        }

        public OnCellMove(): void {
            debugger;
        }

        public OnValueChanged(newValue: SP.JsGrid.IValue): void {
            debugger;
        }

        public IsCurrentlyUsingGridTextInputElement(): boolean {
            return false;
        }

        public SetSize(width: number, height: number): void {
            debugger;
        }


        private setupHandlers(attachActions: boolean) {


            for (var i = 0; i < this._tbs.length; i++) {

                var tb = this._tbs[i];
                if (attachActions) {
                    $addHandler(tb, 'focus', this.gridContext.OnActivateActor);
                    $addHandler(tb, 'blur', this.gridContext.OnDeactivateActor);
                    $addHandler(tb, 'keydown', this.gridContext.OnKeyDown);
                    $addHandler(tb, 'keyup', this.OnKeyUp);
                    $addHandler(tb, 'mousedown', this.OnMouseDown);
                } else {
                    $removeHandler(tb, 'focus', this.gridContext.OnActivateActor);
                    $removeHandler(tb, 'blur', this.gridContext.OnDeactivateActor);
                    $removeHandler(tb, 'keydown', this.gridContext.OnKeyDown);
                    $removeHandler(tb, 'keyup', this.OnKeyUp);
                    $removeHandler(tb, 'mousedown', this.OnMouseDown);


                }
            }
        }

        OnKeyUp() {
        }

        OnMouseDown(eventInfo: Sys.UI.DomEvent) {
            eventInfo.stopPropagation();

        }

    }
}