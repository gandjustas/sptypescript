///<reference path="../Definitions/SharePoint.d.ts" />

/** Lightweight client-side rendering template overrides.*/
module CSR {

    /** Creates new overrides. Call .register() at the end.*/
    export function override(listTemplateType?: number, baseViewId?: string): ICSR;
    export function override(listTemplateType?: number, baseViewId?: number): ICSR;

    export function override(listTemplateType?: number, baseViewId?: any): ICSR {
        return new csr(listTemplateType, baseViewId);
    }

    export function getControl(schema: SPClientTemplates.FieldSchema_InForm): HTMLInputElement {
        var id = schema.Name + '_' + schema.Id + '_$' + schema.FieldType + 'Field';
        //TODO: Handle different input types
        return <HTMLInputElement>$get(id);
    }


    class csr implements ICSR, SPClientTemplates.TemplateOverridesOptions {

        public Templates: SPClientTemplates.TemplateOverrides;
        public OnPreRender: { (ctx: SPClientTemplates.RenderContext): void; }[];
        public OnPostRender: { (ctx: SPClientTemplates.RenderContext): void; }[];
        private IsRegistered: boolean;


        constructor(public ListTemplateType?: number, public BaseViewID?: any) {
            this.Templates = { Fields: {} };
            this.OnPreRender = [];
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

        makeReadOnly(fieldName: string): ICSR {
            this.onPreRender(ctx => {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid
                    || ctx.ControlMode == SPClientTemplates.ClientControlMode.DisplayForm) return;

                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                    var ctxInView = <SPClientTemplates.RenderContext_InView>ctx;

                    var fieldSchema: SPClientTemplates.FieldSchema;
                    var fields = ctxInView.ListSchema.Field;

                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].Name === fieldName) {
                            fieldSchema = fields[i];
                        }
                    }
                    if (fieldSchema) {
                        if (ctxInView.inGridMode) {
                            //TODO: Disable editing in grid mode
                            (<SPClientTemplates.FieldSchema_InForm>fieldSchema).ReadOnlyField = true;
                        } else {
                            var fieldSchemaInView = <SPClientTemplates.FieldSchema_InView>fieldSchema;
                            fieldSchemaInView.ReadOnly = "TRUE";
                        }
                    }
                } else {
                    var ctxInForm = <SPClientTemplates.RenderContext_FieldInForm>ctx;
                    var fieldSchemaInForm = ctxInForm.ListSchema.Field[0];
                    if (fieldSchemaInForm.Name === fieldName) {
                        fieldSchemaInForm.ReadOnlyField = true;
                        var template = GetFieldTemplate(fieldSchemaInForm, SPClientTemplates.ClientControlMode.DisplayForm);
                        ctxInForm.Templates.Fields[fieldName] = template;
                    }
                    //TODO: Fixup list data for User field
                }

            });
            return this;
        }

        makeHidden(fieldName: string): ICSR {
            this.onPreRender(ctx => {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid) return;

                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                    var ctxInView = <SPClientTemplates.RenderContext_InView>ctx;

                    var fieldSchema: SPClientTemplates.FieldSchema;
                    var fields = ctxInView.ListSchema.Field;

                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].Name === fieldName) {
                            fieldSchema = fields[i];
                        }
                    }
                    if (fieldSchema) {
                        if (ctxInView.inGridMode) {
                            //TODO: Hide item in grid mode
                            (<SPClientTemplates.FieldSchema_InForm>fieldSchema).Hidden = true;
                        } else {
                            ctxInView.ListSchema.Field.splice(ctxInView.ListSchema.Field.indexOf(fieldSchema), 1);
                        }
                    }
                } else {
                    var ctxInForm = <SPClientTemplates.RenderContext_FieldInForm>ctx;
                    var fieldSchemaInForm = ctxInForm.ListSchema.Field[0];
                    if (fieldSchemaInForm.Name === fieldName) {
                        fieldSchemaInForm.Hidden = true;
                        var pHolderId = ctxInForm.FormUniqueId + ctxInForm.FormContext.listAttributes.Id + fieldName;
                        var placeholder = $get(pHolderId);
                        var current = placeholder;
                        while (current.tagName.toUpperCase()!== "TR") {
                            current = current.parentElement;
                        }
                        var row = <HTMLTableRowElement>current;
                        row.style.display = 'none';
                    }
                }

            });
            return this;
        }

        cascadeLookup(fieldName: string, camlFilter: string): ICSR {
            var parseRegex = /\{[^\}]+\}/g;
            var dependentFieldNames = <string[]>parseRegex.exec(camlFilter).map((v, idx, _) => stripBraces(v));
            var dependentControls:{ [field:string]:HTMLInputElement } = {};

            var _dropdownElt: HTMLSelectElement;
            var _schema: SPClientTemplates.FieldSchema_InForm_Lookup;
            var _myData: SPClientTemplates.ClientFormContext;
            
                

            return this.fieldEdit(fieldName, SPFieldCascadedLookup_Edit)
                       .fieldNew(fieldName, SPFieldCascadedLookup_Edit)
                       .onPostRender(postRender);

            function postRender(ctx: SPClientTemplates.RenderContext_FieldInForm) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
                    || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                    var schema = ctx.ListSchema.Field[0];
                    dependentFieldNames.forEach((field, idx, _) => {
                        if (schema.Name == field) {
                            dependentControls[field] = CSR.getControl(schema);
                            $addHandler(dependentControls[field], "change", e => {
                                loadOptions();
                            });
                        }
                    });
                }
            }

            function loadOptions() {
                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', () => {
                    var ctx = SP.ClientContext.get_current();
                    //TODO: Handle lookup to another web
                    var web = ctx.get_web();
                    var listId = _schema.LookupListId;
                    var list = web.get_lists().getById(listId);
                    var query = new SP.CamlQuery();

                    var predicate = camlFilter.replace(parseRegex, (v, a) => {
                        var field = stripBraces(v);
                        return dependentControls[field] ? dependentControls[field].value : '';
                    });

                    //TODO: Handle ShowField attribure
                    query.set_viewXml('<View><Query><Where>' +
                         predicate +
                        '</Where></Query> ' +
                        '<ViewFields><FieldRef Name="ID" /><FieldRef Name="Title"/></ViewFields></View>');
                    var results = list.getItems(query);
                    ctx.load(results);
                    ctx.executeQueryAsync((o, e) => {
                        while (_dropdownElt.options.length) {
                            _dropdownElt.options.remove(0);
                        }
                        //TODO: Save selected value
                        if (!_schema.Required) {
                            var defaultOpt = new Option(Strings.STS.L_LookupFieldNoneOption, '0');
                            _dropdownElt.options.add(defaultOpt);                            
                        }

                        var enumerator = results.getEnumerator();
                        while (enumerator.moveNext()) {
                            var c = enumerator.get_current();
                            var opt = new Option(c.get_item('Title'), c.get_item('ID'));
                            _dropdownElt.options.add(opt);
                        }
                        OnLookupValueChanged();
                    }, (o, args) => { console.log(args.get_message()); });
                });
            }

            function SPFieldCascadedLookup_Edit(rCtx: SPClientTemplates.RenderContext_FieldInForm) {
                if (rCtx == null)
                    return '';
                _myData = SPClientTemplates.Utility.GetFormContextForCurrentField(rCtx);

                if (_myData == null || _myData.fieldSchema == null)
                    return '';
                _schema = <SPClientTemplates.FieldSchema_InForm_Lookup>_myData.fieldSchema;

                if (_myData.fieldSchema.Required) {
                    var validators = new SPClientForms.ClientValidation.ValidatorSet();

                    validators.RegisterValidator(new SPClientForms.ClientValidation.RequiredValidator());
                    _myData.registerClientValidator(_myData.fieldName, validators);
                }

                var _dropdownId = _myData.fieldName + '_' + _myData.fieldSchema.Id + '_$LookupField';
                var _valueStr = _myData.fieldValue != null ? _myData.fieldValue : '';
                var _selectedValue = SPClientTemplates.Utility.ParseLookupValue(_valueStr);
                var _noValueSelected = _selectedValue.LookupId == 0;

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
                    loadOptions();
                }




                function BuildLookupDropdownControl() {
                    var result = '<span dir="' + STSHtmlEncode(_myData.fieldSchema.Direction) + '">';

                    result += '<select id="' + STSHtmlEncode(_dropdownId) + '" title="' + STSHtmlEncode(_myData.fieldSchema.Title) + '">';

                    //if (!_myData.fieldSchema.Required && _optionsArray.length > 0) {
                    //    var noneOptSelectedStr = _noValueSelected ? 'selected="selected" ' : '';

                    //    result += '<option ' + noneOptSelectedStr + 'value="0">' + STSHtmlEncode(Strings.STS.L_LookupFieldNoneOption) + '</option>';
                    //}
                    //for (var choiceIdx = 0; choiceIdx < _optionsArray.length; choiceIdx++) {
                    //    _optionsDictionary[_optionsArray[choiceIdx].LookupId] = _optionsArray[choiceIdx].LookupValue;
                    //    var curValueSelected = !_noValueSelected && _selectedValue.LookupId == _optionsArray[choiceIdx].LookupId;
                    //    var curValueSelectedStr = curValueSelected ? 'selected="selected" ' : '';

                    //    result += '<option ' + curValueSelectedStr + 'value="' + STSHtmlEncode(_optionsArray[choiceIdx].LookupId.toString()) + '">';
                    //    result += STSHtmlEncode(_optionsArray[choiceIdx].LookupValue) + '</option>';
                    //}
                    result += '</select><br/></span>';
                    return result;
                }
            }

            function OnLookupValueChanged() {
                if (_dropdownElt != null)
                    _myData.updateControlValue(_myData.fieldName, GetCurrentLookupValue());
            }

            function GetCurrentLookupValue() {
                if (_dropdownElt == null)
                    return '';
                return _dropdownElt.value == '0' || _dropdownElt.value == '' ? '' : _dropdownElt.value + ';#' + _dropdownElt.options[_dropdownElt.selectedIndex].text;
            }

            function stripBraces(input:string):string {
                return input.substring(1, input.length - 1);
            }
        }


        computedValue(targetField: string, transform: (...values: string[]) => string, ...sourceField: string[]): ICSR {
            var dependentControls: { [field: string]: HTMLInputElement } = {};
            var targetControl: HTMLInputElement;

            return this.onPostRender((ctx: SPClientTemplates.RenderContext_FieldInForm) => {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm
                    || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                    var schema = ctx.ListSchema.Field[0];

                    if (schema.Name == targetField) {
                        targetControl = CSR.getControl(schema);
                    }

                    sourceField.forEach((field, idx, _) => {
                        if (schema.Name == field) {
                            dependentControls[field] = CSR.getControl(schema);
                            $addHandler(dependentControls[field], "change", e => {
                                updateValue();
                            });
                        }
                    });
                }
            });  

            function updateValue() {
                if (targetControl) {
                    targetControl.value = transform.apply(this,
                        sourceField.map(n => dependentControls[n] ? dependentControls[n].value : ''));
                }
            }
        }


        register() {
            if (!this.IsRegistered) {
                SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this);
                this.IsRegistered = true;
            }
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

        /** Override Item rendering template.
            @param template New item template.
        */
        item(template: string): ICSR;

        /** Override Item rendering template.
            @param template New item template.
        */
        item(template: (ctx: SPClientTemplates.RenderContext_ItemInView) => string): ICSR;

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


        /** Make field readonly in forms and quick edit.
            @param fieldName Internal name of the field.
        */
        makeReadOnly(fieldName: string): ICSR;

        /** Make field hidden in list view and standard forms.
            @param fieldName Internal name of the field.
        */
        makeHidden(fieldName: string): ICSR

        /** Create cascaded Lookup Field.
            @param fieldName Internal name of the field.
            @param camlFilter CAML predicate expression (inside Where clause). Use {FieldName} tokens for dependency fields substitutions.
        */
        cascadeLookup(fieldName: string, camlFilter:string): ICSR

        /** Auto computes text-based field value based on another fields.
            @param targetField Internal name of the field.
            @param transform Function combines source field values.
            @param sourceField Internal names of source fields.
        */
        computedValue(targetField: string, transform: (...values: string[]) => string, ...sourceField: string[]): ICSR
    }

    function GetFieldTemplate(field: SPClientTemplates.FieldSchema, mode: SPClientTemplates.ClientControlMode): SPClientTemplates.FieldCallback {
        var ctx = { ListSchema: { Field: [field] }, FieldControlModes: {} };
        ctx.FieldControlModes[field.Name] = mode;
        var templates = SPClientTemplates.TemplateManager.GetTemplates(ctx);
        return templates.Fields[field.Name];
    }
}

if (typeof SP == 'object' && SP && typeof SP.SOD == 'object' && SP.SOD) {
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");    
}