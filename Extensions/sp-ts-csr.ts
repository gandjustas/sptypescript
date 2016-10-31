/** Lightweight client-side rendering template overrides.*/
namespace CSR {

    export interface UpdatedValueCallback {
        (value: any, fieldSchema?: SPClientTemplates.FieldSchema_InForm): void;
    }

    /** Creates new overrides. Call .register() at the end.*/
    export function override(listTemplateType?: number, baseViewId?: number|string): ICSR {
        return new csr(listTemplateType, baseViewId)
            .onPreRender(hookFormContext)
            .onPostRender(fixCsrCustomLayout);

        function hookFormContext(ctx: IFormRenderContexWithHook) {
            if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
                || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {

                for (var i = 0; i < ctx.ListSchema.Field.length; i++) {
                    var fieldSchemaInForm = ctx.ListSchema.Field[i];

                    if (!ctx.FormContextHook) {
                        ctx.FormContextHook = {}

                        var oldRegisterGetValueCallback = ctx.FormContext.registerGetValueCallback;
                        ctx.FormContext.registerGetValueCallback = (fieldName, callback) => {
                            ctx.FormContextHook[fieldName].getValue = callback;
                            oldRegisterGetValueCallback(fieldName, callback);
                        };

                        var oldUpdateControlValue = ctx.FormContext.updateControlValue;
                        ctx.FormContext.updateControlValue = (fieldName: string, value: any) => {
                            oldUpdateControlValue(fieldName, value);

                            var hookedContext = ensureFormContextHookField(ctx.FormContextHook, fieldName);
                            hookedContext.lastValue = value;

                            var updatedCallbacks = ctx.FormContextHook[fieldName].updatedValueCallbacks;
                            for (var i = 0; i < updatedCallbacks.length; i++) {
                                updatedCallbacks[i](value, hookedContext.fieldSchema);
                            }

                        }
                    }
                    ensureFormContextHookField(ctx.FormContextHook, fieldSchemaInForm.Name).fieldSchema = fieldSchemaInForm;
                }
            }
        }

        function fixCsrCustomLayout(ctx: SPClientTemplates.RenderContext_Form) {
            if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid
                || ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                return;
            }

            if (ctx.ListSchema.Field.length > 1) {
                var wpq = ctx.FormUniqueId;
                var webpart = $get('WebPart' + wpq);
                var forms = webpart.getElementsByClassName('ms-formtable');

                if (forms.length > 0) {
                    var placeholder = $get(wpq + 'ClientFormTopContainer');
                    var fragment = document.createDocumentFragment();
                    for (var i = 0; i < placeholder.children.length; i++) {
                        fragment.appendChild(placeholder.children.item(i));
                    }

                    var form = forms.item(0);
                    form.parentNode.replaceChild(fragment, form);
                }

                var old = ctx.CurrentItem;
                ctx.CurrentItem = ctx.ListData.Items[0];
                var fields = ctx.ListSchema.Field;
                for (var j = 0; j < fields.length; j++) {
                    var field = fields[j];
                    var pHolderId = wpq + ctx.FormContext.listAttributes.Id + field.Name;
                    var span = $get(pHolderId);
                    if (span) {
                        span.outerHTML = ctx.RenderFieldByName(ctx, field.Name);
                    }
                }
                ctx.CurrentItem = old;
            }

        }


    }

    export function getFieldValue(ctx: SPClientTemplates.RenderContext_Form, fieldName: string): any {
        if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
            || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var contextWithHook = <IFormRenderContexWithHook>ctx;
            if (contextWithHook.FormContextHook
                && contextWithHook.FormContextHook[fieldName]
                && contextWithHook.FormContextHook[fieldName].getValue) {
                return contextWithHook.FormContextHook[fieldName].getValue();
            }
        }
        return null;
    }

    export function getFieldSchema(ctx: SPClientTemplates.RenderContext_Form, fieldName: string): SPClientTemplates.FieldSchema_InForm {
        if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
            || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var contextWithHook = <IFormRenderContexWithHook>ctx;
            if (contextWithHook.FormContextHook
                && contextWithHook.FormContextHook[fieldName]) {
                return contextWithHook.FormContextHook[fieldName].fieldSchema;
            }
        }
        return null;
    }

    export function addUpdatedValueCallback(ctx: SPClientTemplates.RenderContext_Form, fieldName: string, callback: UpdatedValueCallback): void {
        if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
            || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var contextWithHook = <IFormRenderContexWithHook>ctx;
            if (contextWithHook.FormContextHook) {
                var f = ensureFormContextHookField(contextWithHook.FormContextHook, fieldName);
                var callbacks = f.updatedValueCallbacks;
                if (callbacks.indexOf(callback) == -1) {
                    callbacks.push(callback);
                    if (f.lastValue) {
                        callback(f.lastValue, f.fieldSchema);
                    }
                }
            }
        }

    }

    export function removeUpdatedValueCallback(ctx: SPClientTemplates.RenderContext_Form, fieldName: string, callback: UpdatedValueCallback): void {
        if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
            || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var contextWithHook = <IFormRenderContexWithHook>ctx;
            if (contextWithHook.FormContextHook) {
                var callbacks = ensureFormContextHookField(contextWithHook.FormContextHook, fieldName).updatedValueCallbacks;
                var index = callbacks.indexOf(callback);
                if (index != -1) {
                    callbacks.splice(index, 1);
                }
            }
        }
    }

    export function getControl(schema: SPClientTemplates.FieldSchema_InForm): HTMLInputElement {
        var id = schema.Name + '_' + schema.Id + '_$' + schema.FieldType + 'Field';
        //TODO: Handle different input types
        return <HTMLInputElement>$get(id);
    }

    export function getFieldTemplate(field: SPClientTemplates.FieldSchema, mode: SPClientTemplates.ClientControlMode): SPClientTemplates.FieldCallback {
        var ctx = { ListSchema: { Field: [field] }, FieldControlModes: {} };
        ctx.FieldControlModes[field.Name] = mode;
        var templates = SPClientTemplates.TemplateManager.GetTemplates(ctx);
        return templates.Fields[field.Name];
    }


    class csr implements ICSR, SPClientTemplates.TemplateOverridesOptions {

        public Templates: SPClientTemplates.TemplateOverrides;
        public OnPreRender: SPClientTemplates.RenderCallback[];
        public OnPostRender: SPClientTemplates.RenderCallback[];
        private IsRegistered: boolean;


        constructor(public ListTemplateType?: number, public BaseViewID?: any) {
            this.Templates = { Fields: {} };
            this.OnPreRender = [] ;
            this.OnPostRender = [];
            this.IsRegistered = false;
        }

        /* tier 1 methods */
        view(template: any): ICSR {
            this.Templates.View = template;
            return this;
        }

        item(template: any): ICSR {
            this.Templates.Item = template;
            return this;
        }

        header(template: any): ICSR {
            this.Templates.Header = template;
            return this;
        }

        body(template: any): ICSR {
            this.Templates.Body = template;
            return this;
        }

        footer(template: any): ICSR {
            this.Templates.Footer = template;
            return this;
        }

        fieldView(fieldName: string, template: any): ICSR {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].View = template;
            return this;
        }

        fieldDisplay(fieldName: string, template: any): ICSR {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].DisplayForm = template;
            return this;
        }

        fieldNew(fieldName: string, template: any): ICSR {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].NewForm = template;
            return this;
        }

        fieldEdit(fieldName: string, template: any): ICSR {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].EditForm = template;
            return this;
        }

        /* tier 2 methods */
        template(name: string, template: any): ICSR {
            this.Templates[name] = template;
            return this;
        }

        fieldTemplate(fieldName: string, name: string, template: any): ICSR {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName][name] = template;
            return this;
        }

        /* common */
        onPreRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICSR {
            for (var i = 0; i < callbacks.length; i++) {
                this.OnPreRender.push(callbacks[i]);
            }
            return this;
        }

        onPostRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICSR {
            for (var i = 0; i < callbacks.length; i++) {
                this.OnPostRender.push(callbacks[i]);
            }
            return this;
        }

        onPreRenderField(field: string, callback: { (schema: SPClientTemplates.FieldSchema, ctx: SPClientTemplates.RenderContext): void; }): ICSR {
            return this.onPreRender((ctx: SPClientTemplates.RenderContext) => {
                var ctxInView = <SPClientTemplates.RenderContext_InView>ctx;

                //ListSchema schma exists in Form and in View render context
                var fields = ctxInView.ListSchema.Field;
                if (fields) {
                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].Name === field) {
                            callback(fields[i], ctx);
                        }
                    }
                }
            });
        }

        onPostRenderField(field: string, callback: { (schema: SPClientTemplates.FieldSchema, ctx: SPClientTemplates.RenderContext): void; }): ICSR {
            return this.onPostRender((ctx: SPClientTemplates.RenderContext) => {
                var ctxInView = <SPClientTemplates.RenderContext_InView>ctx;

                //ListSchema schma exists in Form and in View render context
                var fields = ctxInView.ListSchema.Field;
                if (fields) {
                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].Name === field) {
                            callback(fields[i], ctx);
                        }
                    }
                }
            });
        }

        makeReadOnly(fieldName: string): ICSR {
            return this
                .onPreRenderField(fieldName, (schema, ctx) => {
                    if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid
                        || ctx.ControlMode == SPClientTemplates.ClientControlMode.DisplayForm) return;
                    (<SPClientTemplates.FieldSchema_InForm>schema).ReadOnlyField = true;
                    (<SPClientTemplates.FieldSchema_InView>schema).ReadOnly = "TRUE";

                    if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                        var ctxInView = <SPClientTemplates.RenderContext_InView>ctx;
                        if (ctxInView.inGridMode) {
                            //TODO: Disable editing in grid mode

                        }

                    } else {
                        var ctxInForm = <SPClientTemplates.RenderContext_FieldInForm>ctx;
                        if (schema.Type != 'User' && schema.Type != 'UserMulti') {

                            var template = getFieldTemplate(schema, SPClientTemplates.ClientControlMode.DisplayForm);
                            ctxInForm.Templates.Fields[fieldName] = template;
                            ctxInForm.FormContext.registerGetValueCallback(fieldName, () => ctxInForm.ListData.Items[0][fieldName]);

                        }
                    }

                })
                .onPostRenderField(fieldName, (schema: SPClientTemplates.FieldSchema_InForm_User, ctx:SPClientTemplates.RenderContext) => {
                    if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
                        || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                        if (schema.Type == 'User' || schema.Type == 'UserMulti') {
                            SP.SOD.executeFunc('clientpeoplepicker.js', 'SPClientPeoplePicker', () => {
                                var topSpanId = schema.Name + '_' + schema.Id + '_$ClientPeoplePicker';
                                var retryCount = 10;
                                var callback = () => {
                                    var pp = SPClientPeoplePicker.SPClientPeoplePickerDict[topSpanId];
                                    if (!pp) {
                                        if (retryCount--) setTimeout(callback, 1);
                                    } else {
                                        pp.SetEnabledState(false);
                                        pp.DeleteProcessedUser = function () { };
                                    }
                                };
                                callback();
                            });
                        }
                    }
                });
        }

        makeHidden(fieldName: string): ICSR {
            return this.onPreRenderField(fieldName, (schema, ctx) => {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid) return;
                (<SPClientTemplates.FieldSchema_InForm>schema).Hidden = true;

                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                    var ctxInView = <SPClientTemplates.RenderContext_InView>ctx;

                    if (ctxInView.inGridMode) {
                        //TODO: Hide item in grid mode
                    } else {
                        ctxInView.ListSchema.Field.splice(ctxInView.ListSchema.Field.indexOf(schema), 1);
                    }

                } else {
                    var ctxInForm = <SPClientTemplates.RenderContext_Form>ctx;

                    var pHolderId = ctxInForm.FormUniqueId + ctxInForm.FormContext.listAttributes.Id + fieldName;
                    var placeholder = $get(pHolderId);
                    var current = placeholder;
                    while (current.tagName.toUpperCase() !== "TR") {
                        current = current.parentElement;
                    }
                    var row = <HTMLTableRowElement>current;
                    row.style.display = 'none';

                }

            });
        }

        filteredLookup(fieldName: string, camlFilter: string, listname?: string, lookupField?: string): ICSR {


            return this.fieldEdit(fieldName, SPFieldCascadedLookup_Edit)
                .fieldNew(fieldName, SPFieldCascadedLookup_Edit);


            function SPFieldCascadedLookup_Edit(rCtx: SPClientTemplates.RenderContext_FieldInForm) {

                var parseRegex = /\{[^\}]+\}/g;
                var dependencyExpressions: string[] = [];
                var result: RegExpExecArray;
                while ((result = parseRegex.exec(camlFilter))) {
                    dependencyExpressions.push(stripBraces(result[0]));
                }
                var dependencyValues: { [expr: string]: string } = {};

                var _dropdownElt: HTMLSelectElement;
                var _myData: SPClientTemplates.ClientFormContext;


                if (rCtx == null)
                    return '';
                _myData = SPClientTemplates.Utility.GetFormContextForCurrentField(rCtx);

                if (_myData == null || _myData.fieldSchema == null)
                    return '';


                var _schema = <SPClientTemplates.FieldSchema_InForm_Lookup>_myData.fieldSchema;

                var validators = new SPClientForms.ClientValidation.ValidatorSet();
                validators.RegisterValidator(new BooleanValueValidator(() => _optionsLoaded, "Wait until lookup values loaded and try again"));

                if (_myData.fieldSchema.Required) {
                    validators.RegisterValidator(new SPClientForms.ClientValidation.RequiredValidator());
                }
                _myData.registerClientValidator(_myData.fieldName, validators);

                var _dropdownId = _myData.fieldName + '_' + _myData.fieldSchema.Id + '_$LookupField';
                var _valueStr = _myData.fieldValue != null ? _myData.fieldValue : '';
                var _selectedValue = SPClientTemplates.Utility.ParseLookupValue(_valueStr).LookupId;
                var _noValueSelected = _selectedValue == 0;
                var _optionsLoaded = false;
                var pendingLoads = 0;

                if (_noValueSelected)
                    _valueStr = '';

                _myData.registerInitCallback(_myData.fieldName, InitLookupControl);

                _myData.registerFocusCallback(_myData.fieldName, function () {
                    if (_dropdownElt != null)
                        _dropdownElt.focus();
                });
                _myData.registerValidationErrorCallback(_myData.fieldName, function (errorResult) {
                    SPFormControl_AppendValidationErrorMessage(_dropdownId, errorResult);
                });
                _myData.registerGetValueCallback(_myData.fieldName, GetCurrentLookupValue);
                _myData.updateControlValue(_myData.fieldName, _valueStr);

                return BuildLookupDropdownControl();

                function InitLookupControl() {
                    _dropdownElt = <HTMLSelectElement>document.getElementById(_dropdownId);
                    if (_dropdownElt != null)
                        AddEvtHandler(_dropdownElt, "onchange", OnLookupValueChanged);

                    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', () => {
                        bindDependentControls(dependencyExpressions);
                        loadOptions(true);
                    });
                }


                function BuildLookupDropdownControl() {
                    var result = '<span dir="' + STSHtmlEncode(_myData.fieldSchema.Direction) + '">';
                    result += '<select id="' + STSHtmlEncode(_dropdownId) + '" title="' + STSHtmlEncode(_myData.fieldSchema.Title) + '">';
                    result += '</select><br/></span>';
                    return result;
                }


                function OnLookupValueChanged() {
                    if (_optionsLoaded) {
                        if (_dropdownElt != null) {
                            _myData.updateControlValue(_myData.fieldName, GetCurrentLookupValue());
                            _selectedValue = parseInt(_dropdownElt.value, 10);
                        }
                    }
                }

                function GetCurrentLookupValue() {
                    if (_dropdownElt == null)
                        return '';
                    return _dropdownElt.value == '0' || _dropdownElt.value == '' ? '' : _dropdownElt.value + ';#' + _dropdownElt.options[_dropdownElt.selectedIndex].text;
                }

                function stripBraces(input: string): string {
                    return input.substring(1, input.length - 1);
                }

                function getDependencyValue(expr: string, value: string, listId: string, expressionParts: string[], callback: () => void) {
                    var isLookupValue = !!listId;
                    if (isLookupValue) {
                        var lookup = SPClientTemplates.Utility.ParseLookupValue(value);
                        if (expressionParts.length == 1 && expressionParts[0] == 'Value') {
                            value = lookup.LookupValue;
                            expressionParts.shift();
                        } else {
                            value = lookup.LookupId.toString();
                        }
                    }

                    if (expressionParts.length == 0) {
                        dependencyValues[expr] = value;
                        callback();
                    } else {
                        var ctx = SP.ClientContext.get_current();
                        var web = ctx.get_web();
                        //TODO: Handle lookup to another web
                        var list = web.get_lists().getById(listId);
                        var item = list.getItemById(parseInt(value, 10));
                        var field = list.get_fields().getByInternalNameOrTitle(expressionParts.shift());
                        ctx.load(item);
                        ctx.load(field);

                        ctx.executeQueryAsync((o, e) => {
                            var value = item.get_item(field.get_internalName());

                            if (field.get_typeAsString() == 'Lookup') {
                                field = <SP.Field>ctx.castTo(field, SP.FieldLookup);
                                var lookup = (<SP.FieldLookupValue>value);
                                value = lookup.get_lookupId() + ';#' + lookup.get_lookupValue();
                                listId = (<SP.FieldLookup>field).get_lookupList();
                            }

                            getDependencyValue(expr, value, listId, expressionParts, callback);

                        }, (o, args) => { console.log(args.get_message()); });
                    }
                }

                function bindDependentControls(dependencyExpressions: string[]) {
                    dependencyExpressions.forEach(expr => {
                        var exprParts = expr.split(".");
                        var field = exprParts.shift();

                        CSR.addUpdatedValueCallback(rCtx, field,
                            (v, s) => {
                                getDependencyValue(expr, v,
                                    (<SPClientTemplates.FieldSchema_InForm_Lookup>s).LookupListId,
                                    exprParts.slice(0),
                                    loadOptions);
                            });

                    });
                }


                function loadOptions(isFirstLoad?: boolean) {
                    _optionsLoaded = false;
                    pendingLoads++;

                    var ctx = SP.ClientContext.get_current();
                    //TODO: Handle lookup to another web
                    var web = ctx.get_web();
                    var listId = _schema.LookupListId;
                    var list = !listname ? web.get_lists().getById(listId) : web.get_lists().getByTitle(listname);
                    var query = new SP.CamlQuery();

                    var predicate = camlFilter.replace(parseRegex, (v, a) => {
                        var expr = stripBraces(v);
                        return dependencyValues[expr] ? dependencyValues[expr] : '';
                    });

                    //TODO: Handle ShowField attribure
                    if (predicate.substr(0, 5) == '<View') {
                        query.set_viewXml(predicate);
                    } else {
                        query.set_viewXml('<View Scope="RecursiveAll"><Query><Where>' +
                            predicate +
                            '</Where></Query> ' +
                            '<ViewFields><FieldRef Name="ID" /><FieldRef Name="Title"/></ViewFields></View>');
                    }
                    var results = list.getItems(query);
                    ctx.load(results);


                    ctx.executeQueryAsync((o, e) => {
                        var selected = false; 

                        while (_dropdownElt.options.length) {
                            _dropdownElt.options.remove(0);
                        }

                        if (!_schema.Required) {
                            var defaultOpt = new Option(Strings.STS.L_LookupFieldNoneOption, '0', selected, selected);
                            _dropdownElt.options.add(defaultOpt);
                            selected = _selectedValue == 0;
                        }
                        var isEmptyList = true;

                        var enumerator = results.getEnumerator();
                        while (enumerator.moveNext()) {
                            var c = enumerator.get_current();
                            var id: number;
                            var text: string;

                            if (!lookupField) {
                                id = c.get_id();
                                text = c.get_item('Title');
                            } else {
                                var value = <SP.FieldLookupValue>c.get_item(lookupField);
                                id = value.get_lookupId();
                                text = value.get_lookupValue();
                            }
                            var isSelected = _selectedValue == id;
                            if (isSelected) {
                                selected = true;
                            }
                            var opt = new Option(text, id.toString(), isSelected, isSelected);
                            _dropdownElt.options.add(opt);
                            isEmptyList = false;
                        }
                        pendingLoads--;
                        _optionsLoaded = true;
                        if (!pendingLoads) {
                            if (isFirstLoad) {
                                if (_selectedValue == 0 && !selected) {
                                    _dropdownElt.selectedIndex = 0;
                                    OnLookupValueChanged();
                                }
                            } else {
                                if (_selectedValue != 0 && !selected) {
                                    _dropdownElt.selectedIndex = 0;
                                }
                                OnLookupValueChanged();
                            }
                        }


                    }, (o, args) => { console.log(args.get_message()); });
                }
            }

        }

        computedValue(targetField: string, transform: (...values: string[]) => string, ...sourceField: string[]): ICSR {
            var dependentValues: { [field: string]: string } = {};

            return this.onPostRenderField(targetField, (schema:SPClientTemplates.FieldSchema_InForm, ctx: SPClientTemplates.RenderContext_FieldInForm) => {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
                    || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                    var targetControl = CSR.getControl(schema);
                    sourceField.forEach((field) => {
                        CSR.addUpdatedValueCallback(ctx, field, v => {
                            dependentValues[field] = v;
                            targetControl.value = transform.apply(this,
                                sourceField.map(n => dependentValues[n] || ''));

                        });
                    });
                }
            });
        }

        setInitialValue(fieldName: string, value: any, ignoreNull?: boolean): ICSR {
            if (value || !ignoreNull) {
                return this.onPreRenderField(fieldName, (schema:SPClientTemplates.FieldSchema, ctx: SPClientTemplates.RenderContext_FieldInForm) => {
                    ctx.ListData.Items[0][fieldName] = value;
                });
            } else {
                return this;
            }
        }


        autofill(fieldName: string, init: (ctx: IAutoFillFieldContext) => () => void): ICSR {
            return this
                .fieldNew(fieldName, SPFieldLookup_Autofill_Edit)
                .fieldEdit(fieldName, SPFieldLookup_Autofill_Edit);

            function SPFieldLookup_Autofill_Edit(rCtx: SPClientTemplates.RenderContext_FieldInForm) {
                if (rCtx == null)
                    return '';
                var _myData = SPClientTemplates.Utility.GetFormContextForCurrentField(rCtx);

                if (_myData == null || _myData.fieldSchema == null)
                    return '';

                var _autoFillControl: SPClientAutoFill;
                var _textInputElt: HTMLInputElement;
                var _textInputId = _myData.fieldName + '_' + _myData.fieldSchema.Id + '_$' + _myData.fieldSchema.Type + 'Field';
                var _autofillContainerId = _myData.fieldName + '_' + _myData.fieldSchema.Id + '_$AutoFill';

                var validators = new SPClientForms.ClientValidation.ValidatorSet();
                if (_myData.fieldSchema.Required) {
                    validators.RegisterValidator(new SPClientForms.ClientValidation.RequiredValidator());
                }
                _myData.registerClientValidator(_myData.fieldName, validators);

                _myData.registerInitCallback(_myData.fieldName, initAutoFillControl);
                _myData.registerFocusCallback(_myData.fieldName, function () {
                    if (_textInputElt != null)
                        _textInputElt.focus();
                });
                _myData.registerValidationErrorCallback(_myData.fieldName, function (errorResult) {
                    SPFormControl_AppendValidationErrorMessage(_textInputId, errorResult);
                });
                _myData.registerGetValueCallback(_myData.fieldName, () => _myData.fieldValue);
                _myData.updateControlValue(_myData.fieldName, _myData.fieldValue);

                return buildAutoFillControl();

                function initAutoFillControl() {
                    _textInputElt = <HTMLInputElement>document.getElementById(_textInputId);

                    SP.SOD.executeFunc("autofill.js", "SPClientAutoFill", () => {
                        _autoFillControl = new SPClientAutoFill(_textInputId, _autofillContainerId, (_) => callback());
                        var callback = init({
                            renderContext: rCtx,
                            fieldContext: _myData,
                            autofill: _autoFillControl,
                            control: _textInputElt,
                        });

                        //_autoFillControl.AutoFillMinTextLength = 2;
                        //_autoFillControl.VisibleItemCount = 15;
                        //_autoFillControl.AutoFillTimeout = 500;
                    });

                }
                //function OnPopulate(targetElement: HTMLInputElement) {

                //}

                //function OnLookupValueChanged() {
                //    _myData.updateControlValue(_myData.fieldName, GetCurrentLookupValue());
                //}
                //function GetCurrentLookupValue() {
                //    return _valueStr;
                //}
                function buildAutoFillControl() {
                    var result: string[] = [];
                    result.push('<div dir="' + STSHtmlEncode(_myData.fieldSchema.Direction) + '" style="position: relative;">');
                    result.push('<input type="text" id="' + STSHtmlEncode(_textInputId) + '" title="' + STSHtmlEncode(_myData.fieldSchema.Title) + '"/>');

                    result.push("<div class='sp-peoplepicker-autoFillContainer' id='" + STSHtmlEncode(_autofillContainerId) + "'></div>");
                    result.push("</div>");

                    return result.join("");
                }
            }


        }

        seachLookup(fieldName: string): ICSR {
            return this.autofill(fieldName, (ctx: IAutoFillFieldContext) => {
                var _myData = ctx.fieldContext;
                var _schema = <SPClientTemplates.FieldSchema_InForm_Lookup>_myData.fieldSchema;
                if (_myData.fieldSchema.Type != 'Lookup') {
                    return null;
                }

                var _valueStr = _myData.fieldValue != null ? _myData.fieldValue : '';
                var _selectedValue = SPClientTemplates.Utility.ParseLookupValue(_valueStr);
                var _noValueSelected = _selectedValue.LookupId == 0;
                ctx.control.value = _selectedValue.LookupValue;
                $addHandler(ctx.control, "blur", _ => {
                    if (ctx.control.value == '') {
                        _myData.fieldValue = '';
                        _myData.updateControlValue(fieldName, _myData.fieldValue);
                    }
                });

                if (_noValueSelected)
                    _myData.fieldValue = '';

                var _autoFillControl = ctx.autofill;
                _autoFillControl.AutoFillMinTextLength = 2;
                _autoFillControl.VisibleItemCount = 15;
                _autoFillControl.AutoFillTimeout = 500;

                return () => {
                    var value = ctx.control.value;
                    _autoFillControl.PopulateAutoFill([AutoFillOptionBuilder.buildLoadingItem('Please wait...')], onSelectItem);

                    SP.SOD.executeFunc("sp.search.js", "Microsoft.SharePoint.Client.Search.Query", () => {
                        var Search = Microsoft.SharePoint.Client.Search.Query;
                        var ctx = SP.ClientContext.get_current();
                        var query = new Search.KeywordQuery(ctx);
                        query.set_rowLimit(_autoFillControl.VisibleItemCount);
                        query.set_queryText('contentclass:STS_ListItem ListID:{' + _schema.LookupListId + '} ' + value);
                        var selectProps = query.get_selectProperties();
                        selectProps.clear();
                        //TODO: Handle ShowField attribute
                        selectProps.add('Title');
                        selectProps.add('ListItemId');
                        var executor = new Search.SearchExecutor(ctx);
                        var result = executor.executeQuery(query);
                        ctx.executeQueryAsync(
                            () => {
                                //TODO: Discover proper way to load collection
                                var tableCollection = new Search.ResultTableCollection();
                                tableCollection.initPropertiesFromJson(result.get_value());

                                var relevantResults = tableCollection.get_item(0);
                                var rows = relevantResults.get_resultRows();

                                var items:ISPClientAutoFillData[] = [];
                                for (var i = 0; i < rows.length; i++) {
                                    items.push(AutoFillOptionBuilder.buildOptionItem(parseInt(rows[i]["ListItemId"], 10), rows[i]["Title"]));
                                }

                                items.push(AutoFillOptionBuilder.buildSeparatorItem());

                                if (relevantResults.get_totalRows() == 0)
                                    items.push(AutoFillOptionBuilder.buildFooterItem("No results. Please refine your query."));
                                else
                                    items.push(AutoFillOptionBuilder.buildFooterItem("Showing " + rows.length + " of" + relevantResults.get_totalRows() + " items!"));

                                _autoFillControl.PopulateAutoFill(items, onSelectItem);

                            },
                            (sender, args) => {
                                _autoFillControl.PopulateAutoFill([AutoFillOptionBuilder.buildFooterItem("Error executing query/ See log for details.")], onSelectItem);
                                console.log(args.get_message());
                            });
                    });
                }

                function onSelectItem(targetInputId:string, item: ISPClientAutoFillData) {
                    var targetElement = ctx.control;
                    targetElement.value = item[SPClientAutoFill.DisplayTextProperty];
                    _selectedValue.LookupId = item[SPClientAutoFill.KeyProperty];
                    _selectedValue.LookupValue = item[SPClientAutoFill.DisplayTextProperty];
                    _myData.fieldValue = item[SPClientAutoFill.KeyProperty] + ';#' + item[SPClientAutoFill.TitleTextProperty];
                    _myData.updateControlValue(_myData.fieldSchema.Name, _myData.fieldValue);
                }

            });
        }

        lookupAddNew(fieldName: string, prompt: string, showDialog?: boolean, contentTypeId?: string): ICSR {
            return this.onPostRenderField(fieldName,
                (schema: SPClientTemplates.FieldSchema_InForm_Lookup, ctx: SPClientTemplates.RenderContext_FieldInForm) => {
                    if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
                        || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm)

                        var control = CSR.getControl(schema);
                    if (control) {
                        var weburl = _spPageContextInfo.webServerRelativeUrl;
                        if (weburl[weburl.length - 1] == '/') {
                            weburl = weburl.substring(0, weburl.length - 1);
                        }
                        var newFormUrl = weburl + '/_layouts/listform.aspx/listform.aspx?PageType=8'
                            + "&ListId=" + encodeURIComponent('{' + schema.LookupListId + '}');
                        if (contentTypeId) {
                            newFormUrl += '&ContentTypeId=' + contentTypeId;
                        }

                        var link = document.createElement('a');
                        link.href = "javascript:NewItem2(event, \'" + newFormUrl + "&Source=" + encodeURIComponent(document.location.href) + "')";
                        link.textContent = prompt;
                        if (control.nextElementSibling) {
                            control.parentElement.insertBefore(link, control.nextElementSibling);
                        } else {
                            control.parentElement.appendChild(link);
                        }

                        if (showDialog) {
                            $addHandler(link, "click", (e: Sys.UI.DomEvent) => {
                                SP.SOD.executeFunc('sp.ui.dialog.js', 'SP.UI.ModalDialog.ShowPopupDialog', () => {
                                    SP.UI.ModalDialog.ShowPopupDialog(newFormUrl);
                                });
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        }
                    }
                });
        }

        register() {
            if (!this.IsRegistered) {
                SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this);
                this.IsRegistered = true;
            }
        }
    }

    export class AutoFillOptionBuilder {

        static buildFooterItem(title: string): ISPClientAutoFillData {
            var item = {};

            item[SPClientAutoFill.DisplayTextProperty] = title;
            item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Footer;

            return item;
        }

        static buildOptionItem(id: number, title: string, displayText?: string, subDisplayText?: string): ISPClientAutoFillData {

            var item = {};

            item[SPClientAutoFill.KeyProperty] = id;
            item[SPClientAutoFill.DisplayTextProperty] = displayText || title;
            item[SPClientAutoFill.SubDisplayTextProperty] = subDisplayText;
            item[SPClientAutoFill.TitleTextProperty] = title;
            item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Option;

            return item;
        }

        static buildSeparatorItem(): ISPClientAutoFillData {
            var item = {};
            item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Separator;
            return item;
        }

        static buildLoadingItem(title: string): ISPClientAutoFillData {
            var item = {};

            item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Loading;
            item[SPClientAutoFill.DisplayTextProperty] = title;
            return item;
        }

    }

    /** Lightweight client-side rendering template overrides.*/
    export interface ICSR {
        /** Override rendering template.
            @param name Name of template to override.
            @param template New template.
        */
        template(name: string, template: string): ICSR;

        /** Override rendering template.
            @param name Name of template to override.
            @param template New template.
        */
        template(name: string, template: (ctx: SPClientTemplates.RenderContext) => string): ICSR;

        /** Override field rendering template.
            @param name Internal name of field to override.
            @param name Name of template to override.
            @param template New template.
        */
        fieldTemplate(field: string, name: string, template: string): ICSR;

        /** Override field rendering template.
            @param name Internal name of field to override.
            @param name Name of template to override.
            @param template New template.
        */
        fieldTemplate(field: string, name: string, template: (ctx: SPClientTemplates.RenderContext) => string): ICSR;

        /** Sets pre-render callbacks. Callback called before rendering starts.
            @param callbacks pre-render callbacks.
        */
        onPreRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICSR;

        /** Sets post-render callbacks. Callback called after rendered html inserted to DOM.
            @param callbacks post-render callbacks.
        */
        onPostRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICSR;

        /** Sets pre-render callbacks for field. Callback called before rendering starts. Correctly handles form rendering.
            @param fieldName Internal name of the field.
            @param callbacks pre-render callbacks.
        */
        onPreRenderField(field: string, callback: { (schema: SPClientTemplates.FieldSchema, ctx: SPClientTemplates.RenderContext): void; }): ICSR;

        /** Sets post-render callbacks. Callback called after rendered html inserted to DOM. Correctly handles form rendering.
            @param fieldName Internal name of the field.
            @param callbacks post-render callbacks.
        */
        onPostRenderField(field: string, callback: { (schema: SPClientTemplates.FieldSchema, ctx: SPClientTemplates.RenderContext): void; }): ICSR;

        /** Registers overrides in client-side templating engine.*/
        register(): void;

        /** Override View rendering template.
            @param template New view template.
        */
        view(template: string): ICSR;

        /** Override View rendering template.
            @param template New view template.
        */
        view(template: (ctx: SPClientTemplates.RenderContext_InView) => string): ICSR;
        view(template: (ctx: SPClientTemplates.RenderContext_Form) => string): ICSR;

        /** Override Item rendering template.
            @param template New item template.
        */
        item(template: string): ICSR;

        /** Override Item rendering template.
            @param template New item template.
        */
        item(template: (ctx: SPClientTemplates.RenderContext_ItemInView) => string): ICSR;
        item(template: (ctx: SPClientTemplates.RenderContext_Form) => string): ICSR;

        /** Override Header rendering template.
            @param template New header template.
        */
        header(template: string): ICSR;

        /** Override Header rendering template.
            @param template New header template.
        */
        header(template: (ctx: SPClientTemplates.RenderContext) => string): ICSR;

        /** Override Body rendering template.
            @param template New body template.
        */
        body(template: string): ICSR;

        /** Override Body rendering template.
            @param template New body template.
        */
        body(template: (ctx: SPClientTemplates.RenderContext) => string): ICSR;

        /** Override Footer rendering template.
            @param template New footer template.
        */
        footer(template: string): ICSR;

        /** Override Footer rendering template.
            @param template New footer template.
        */
        footer(template: (ctx: SPClientTemplates.RenderContext) => string): ICSR;

        /** Override View rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New View template.
        */
        fieldView(fieldName: string, template: string): ICSR;

        /** Override View rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New View template.
        */
        fieldView(fieldName: string, template: (ctx: SPClientTemplates.RenderContext_FieldInView) => string): ICSR;

        /** Override DisplyForm rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New DisplyForm template.
        */
        fieldDisplay(fieldName: string, template: string): ICSR;

        /** Override DisplyForm rendering template.
            @param fieldName Internal name of the field.
            @param template New DisplyForm template.
        */
        fieldDisplay(fieldName: string, template: (ctx: SPClientTemplates.RenderContext_FieldInForm) => string): ICSR;

        /** Override EditForm rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New EditForm template.
        */
        fieldEdit(fieldName: string, template: string): ICSR;

        /** Override EditForm rendering template.
            @param fieldName Internal name of the field.
            @param template New EditForm template.
        */
        fieldEdit(fieldName: string, template: (ctx: SPClientTemplates.RenderContext_FieldInForm) => string): ICSR;

        /** Override NewForm rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New NewForm template.
        */
        fieldNew(fieldName: string, template: string): ICSR;

        /** Override NewForm rendering template.
            @param fieldName Internal name of the field.
            @param template New NewForm template.
        */
        fieldNew(fieldName: string, template: (ctx: SPClientTemplates.RenderContext_FieldInForm) => string): ICSR;


        /** Set initial value for field.
            @param fieldName Internal name of the field.
            @param value Initial value for field.
        */
        setInitialValue(fieldName: string, value: any): ICSR;

        /** Make field hidden in list view and standard forms.
            @param fieldName Internal name of the field.
        */
        makeHidden(fieldName: string): ICSR


        /** Replace New and Edit templates for field to Display template.
            @param fieldName Internal name of the field.
        */
        makeReadOnly(fieldName: string): ICSR

        /** Create cascaded Lookup Field.
            @param fieldName Internal name of the field.
            @param camlFilter CAML predicate expression (inside Where clause). Use {FieldName} tokens for dependency fields substitutions.
        */
        filteredLookup(fieldName: string, camlFilter: string, listname?: string, lookupField?: string): ICSR

        /** Auto computes text-based field value based on another fields.
            @param targetField Internal name of the field.
            @param transform Function combines source field values.
            @param sourceField Internal names of source fields.
        */
        computedValue(targetField: string, transform: (...values: string[]) => string, ...sourceField: string[]): ICSR

        /** Field text value with autocomplete based on autofill.js
            @param fieldName Internal name of the field.
            @param ctx AutoFill context.
        */
        autofill(fieldName: string, init: (ctx: IAutoFillFieldContext) => () => void): ICSR

        /** Replace defult dropdown to search-based autocomplete for Lookup field.
            @param fieldName Internal name of the field.
        */
        seachLookup(fieldName: string): ICSR;

        /** Adds link to add new value to lookup list. 
            @param fieldName Internal name of the field.
            @param prompt Text to display as a link to add new value.
            @param contentTypeID Default content type for new item.
        */
        lookupAddNew(fieldName: string, prompt: string, showDialog?: boolean, contentTypeId?: string): ICSR;
    }

    export interface IAutoFillFieldContext {
        renderContext: SPClientTemplates.RenderContext_FieldInForm;
        fieldContext: SPClientTemplates.ClientFormContext;
        autofill: SPClientAutoFill;
        control: HTMLInputElement;
    }


    interface IFormRenderContexWithHook extends SPClientTemplates.RenderContext_FieldInForm {
        FormContextHook: IFormContextHook;
    }

    interface IFormContextHook {
        [fieldName: string]: IFormContextHookField;
    }

    interface IFormContextHookField {
        fieldSchema?: SPClientTemplates.FieldSchema_InForm;
        lastValue?: any;
        getValue?: () => any;
        updatedValueCallbacks: UpdatedValueCallback[];
    }


    function ensureFormContextHookField(hook: IFormContextHook, fieldName: string): IFormContextHookField {
        return hook[fieldName] = hook[fieldName] || {
            updatedValueCallbacks: []
        };

    }

    class BooleanValueValidator implements SPClientForms.ClientValidation.IValidator {
        constructor(public valueGetter: () => boolean, public validationMessage: string) { }

        Validate(value: any): SPClientForms.ClientValidation.ValidationResult {
            return new SPClientForms.ClientValidation.ValidationResult(!this.valueGetter(), this.validationMessage);
        }
    }

}

if (typeof SP == 'object' && SP && typeof SP.SOD == 'object' && SP.SOD) {
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("sp-ts-csr.ts");
}