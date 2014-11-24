///<reference path="../Definitions/SharePoint.d.ts" />
/** Lightweight client-side rendering template overrides.*/
var CSR;
(function (CSR) {
    function override(listTemplateType, baseViewId) {
        return new csr(listTemplateType, baseViewId).onPreRender(hookFormContext).onPostRender(fixCsrCustomLayout);
        function hookFormContext(ctx) {
            if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                for (var i = 0; i < ctx.ListSchema.Field.length; i++) {
                    var fieldSchemaInForm = ctx.ListSchema.Field[i];
                    if (!ctx.FormContextHook) {
                        ctx.FormContextHook = {};
                        var oldRegisterGetValueCallback = ctx.FormContext.registerGetValueCallback;
                        ctx.FormContext.registerGetValueCallback = function (fieldName, callback) {
                            ctx.FormContextHook[fieldName].getValue = callback;
                            oldRegisterGetValueCallback(fieldName, callback);
                        };
                        var oldUpdateControlValue = ctx.FormContext.updateControlValue;
                        ctx.FormContext.updateControlValue = function (fieldName, value) {
                            oldUpdateControlValue(fieldName, value);
                            var hookedContext = ensureFormContextHookField(ctx.FormContextHook, fieldName);
                            hookedContext.lastValue = value;
                            var updatedCallbacks = ctx.FormContextHook[fieldName].updatedValueCallbacks;
                            for (var i = 0; i < updatedCallbacks.length; i++) {
                                updatedCallbacks[i](value, hookedContext.fieldSchema);
                            }
                        };
                    }
                    ensureFormContextHookField(ctx.FormContextHook, fieldSchemaInForm.Name).fieldSchema = fieldSchemaInForm;
                }
            }
        }
        function fixCsrCustomLayout(ctx) {
            if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid || ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
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
    CSR.override = override;
    function getFieldValue(ctx, fieldName) {
        if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var contextWithHook = ctx;
            if (contextWithHook.FormContextHook && contextWithHook.FormContextHook[fieldName] && contextWithHook.FormContextHook[fieldName].getValue) {
                return contextWithHook.FormContextHook[fieldName].getValue();
            }
        }
        return null;
    }
    CSR.getFieldValue = getFieldValue;
    function getFieldSchema(ctx, fieldName) {
        if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var contextWithHook = ctx;
            if (contextWithHook.FormContextHook && contextWithHook.FormContextHook[fieldName]) {
                return contextWithHook.FormContextHook[fieldName].fieldSchema;
            }
        }
        return null;
    }
    CSR.getFieldSchema = getFieldSchema;
    function addUpdatedValueCallback(ctx, fieldName, callback) {
        if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var contextWithHook = ctx;
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
    CSR.addUpdatedValueCallback = addUpdatedValueCallback;
    function removeUpdatedValueCallback(ctx, fieldName, callback) {
        if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var contextWithHook = ctx;
            if (contextWithHook.FormContextHook) {
                var callbacks = ensureFormContextHookField(contextWithHook.FormContextHook, fieldName).updatedValueCallbacks;
                var index = callbacks.indexOf(callback);
                if (index != -1) {
                    callbacks.splice(index, 1);
                }
            }
        }
    }
    CSR.removeUpdatedValueCallback = removeUpdatedValueCallback;
    function getControl(schema) {
        var id = schema.Name + '_' + schema.Id + '_$' + schema.FieldType + 'Field';
        //TODO: Handle different input types
        return $get(id);
    }
    CSR.getControl = getControl;
    function getFieldTemplate(field, mode) {
        var ctx = { ListSchema: { Field: [field] }, FieldControlModes: {} };
        ctx.FieldControlModes[field.Name] = mode;
        var templates = SPClientTemplates.TemplateManager.GetTemplates(ctx);
        return templates.Fields[field.Name];
    }
    CSR.getFieldTemplate = getFieldTemplate;
    var csr = (function () {
        function csr(ListTemplateType, BaseViewID) {
            this.ListTemplateType = ListTemplateType;
            this.BaseViewID = BaseViewID;
            this.Templates = { Fields: {} };
            this.OnPreRender = [];
            this.OnPostRender = [];
            this.IsRegistered = false;
        }
        /* tier 1 methods */
        csr.prototype.view = function (template) {
            this.Templates.View = template;
            return this;
        };
        csr.prototype.item = function (template) {
            this.Templates.Item = template;
            return this;
        };
        csr.prototype.header = function (template) {
            this.Templates.Header = template;
            return this;
        };
        csr.prototype.body = function (template) {
            this.Templates.Body = template;
            return this;
        };
        csr.prototype.footer = function (template) {
            this.Templates.Footer = template;
            return this;
        };
        csr.prototype.fieldView = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].View = template;
            return this;
        };
        csr.prototype.fieldDisplay = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].DisplayForm = template;
            return this;
        };
        csr.prototype.fieldNew = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].NewForm = template;
            return this;
        };
        csr.prototype.fieldEdit = function (fieldName, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].EditForm = template;
            return this;
        };
        /* tier 2 methods */
        csr.prototype.template = function (name, template) {
            this.Templates[name] = template;
            return this;
        };
        csr.prototype.fieldTemplate = function (fieldName, name, template) {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName][name] = template;
            return this;
        };
        /* common */
        csr.prototype.onPreRender = function () {
            var callbacks = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                callbacks[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < callbacks.length; i++) {
                this.OnPreRender.push(callbacks[i]);
            }
            return this;
        };
        csr.prototype.onPostRender = function () {
            var callbacks = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                callbacks[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < callbacks.length; i++) {
                this.OnPostRender.push(callbacks[i]);
            }
            return this;
        };
        csr.prototype.onPreRenderField = function (field, callback) {
            return this.onPreRender(function (ctx) {
                var ctxInView = ctx;
                //ListSchema schma exists in Form and in View rener context
                var fields = ctxInView.ListSchema.Field;
                if (fields) {
                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].Name === field) {
                            callback(fields[i], ctx);
                        }
                    }
                }
            });
        };
        csr.prototype.onPostRenderField = function (field, callback) {
            return this.onPostRender(function (ctx) {
                var ctxInView = ctx;
                //ListSchema schma exists in Form and in View rener context
                var fields = ctxInView.ListSchema.Field;
                if (fields) {
                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].Name === field) {
                            callback(fields[i], ctx);
                        }
                    }
                }
            });
        };
        csr.prototype.makeReadOnly = function (fieldName) {
            return this.onPreRenderField(fieldName, function (schema, ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid || ctx.ControlMode == SPClientTemplates.ClientControlMode.DisplayForm)
                    return;
                schema.ReadOnlyField = true;
                schema.ReadOnly = "TRUE";
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                    var ctxInView = ctx;
                    if (ctxInView.inGridMode) {
                    }
                }
                else {
                    var ctxInForm = ctx;
                    if (schema.Type != 'User' && schema.Type != 'UserMulti') {
                        var template = getFieldTemplate(schema, SPClientTemplates.ClientControlMode.DisplayForm);
                        ctxInForm.Templates.Fields[fieldName] = template;
                        ctxInForm.FormContext.registerGetValueCallback(fieldName, function () { return ctxInForm.ListData.Items[0][fieldName]; });
                    }
                }
            }).onPostRenderField(fieldName, function (schema, ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                    if (schema.Type == 'User' || schema.Type == 'UserMulti') {
                        SP.SOD.executeFunc('clientpeoplepicker.js', 'SPClientPeoplePicker', function () {
                            var topSpanId = schema.Name + '_' + schema.Id + '_$ClientPeoplePicker';
                            var retryCount = 10;
                            var callback = function () {
                                var pp = SPClientPeoplePicker.SPClientPeoplePickerDict[topSpanId];
                                if (!pp) {
                                    if (retryCount--)
                                        setTimeout(callback, 1);
                                }
                                else {
                                    pp.SetEnabledState(false);
                                    pp.DeleteProcessedUser = function () {
                                    };
                                }
                            };
                            callback();
                        });
                    }
                }
            });
        };
        csr.prototype.makeHidden = function (fieldName) {
            return this.onPreRenderField(fieldName, function (schema, ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid)
                    return;
                schema.Hidden = true;
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                    var ctxInView = ctx;
                    if (ctxInView.inGridMode) {
                    }
                    else {
                        ctxInView.ListSchema.Field.splice(ctxInView.ListSchema.Field.indexOf(schema), 1);
                    }
                }
                else {
                    var ctxInForm = ctx;
                    var pHolderId = ctxInForm.FormUniqueId + ctxInForm.FormContext.listAttributes.Id + fieldName;
                    var placeholder = $get(pHolderId);
                    var current = placeholder;
                    while (current.tagName.toUpperCase() !== "TR") {
                        current = current.parentElement;
                    }
                    var row = current;
                    row.style.display = 'none';
                }
            });
        };
        csr.prototype.filteredLookup = function (fieldName, camlFilter, listname, lookupField) {
            return this.fieldEdit(fieldName, SPFieldCascadedLookup_Edit).fieldNew(fieldName, SPFieldCascadedLookup_Edit);
            function SPFieldCascadedLookup_Edit(rCtx) {
                var parseRegex = /\{[^\}]+\}/g;
                var dependencyExpressions = [];
                var result;
                while ((result = parseRegex.exec(camlFilter))) {
                    dependencyExpressions.push(stripBraces(result[0]));
                }
                var dependencyValues = {};
                var _dropdownElt;
                var _myData;
                if (rCtx == null)
                    return '';
                _myData = SPClientTemplates.Utility.GetFormContextForCurrentField(rCtx);
                if (_myData == null || _myData.fieldSchema == null)
                    return '';
                var _schema = _myData.fieldSchema;
                var validators = new SPClientForms.ClientValidation.ValidatorSet();
                validators.RegisterValidator(new BooleanValueValidator(function () { return _optionsLoaded; }, "Wait until lookup values loaded and try again"));
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
                    _dropdownElt = document.getElementById(_dropdownId);
                    if (_dropdownElt != null)
                        AddEvtHandler(_dropdownElt, "onchange", OnLookupValueChanged);
                    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
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
                function stripBraces(input) {
                    return input.substring(1, input.length - 1);
                }
                function getDependencyValue(expr, value, listId, expressionParts, callback) {
                    var isLookupValue = !!listId;
                    if (isLookupValue) {
                        var lookup = SPClientTemplates.Utility.ParseLookupValue(value);
                        if (expressionParts.length == 1 && expressionParts[0] == 'Value') {
                            value = lookup.LookupValue;
                            expressionParts.shift();
                        }
                        else {
                            value = lookup.LookupId.toString();
                        }
                    }
                    if (expressionParts.length == 0) {
                        dependencyValues[expr] = value;
                        callback();
                    }
                    else {
                        var ctx = SP.ClientContext.get_current();
                        var web = ctx.get_web();
                        //TODO: Handle lookup to another web
                        var list = web.get_lists().getById(listId);
                        var item = list.getItemById(parseInt(value, 10));
                        var field = list.get_fields().getByInternalNameOrTitle(expressionParts.shift());
                        ctx.load(item);
                        ctx.load(field);
                        ctx.executeQueryAsync(function (o, e) {
                            var value = item.get_item(field.get_internalName());
                            if (field.get_typeAsString() == 'Lookup') {
                                field = ctx.castTo(field, SP.FieldLookup);
                                var lookup = value;
                                value = lookup.get_lookupId() + ';#' + lookup.get_lookupValue();
                                listId = field.get_lookupList();
                            }
                            getDependencyValue(expr, value, listId, expressionParts, callback);
                        }, function (o, args) {
                            console.log(args.get_message());
                        });
                    }
                }
                function bindDependentControls(dependencyExpressions) {
                    dependencyExpressions.forEach(function (expr) {
                        var exprParts = expr.split(".");
                        var field = exprParts.shift();
                        CSR.addUpdatedValueCallback(rCtx, field, function (v, s) {
                            getDependencyValue(expr, v, s.LookupListId, exprParts.slice(0), loadOptions);
                        });
                    });
                }
                function loadOptions(isFirstLoad) {
                    _optionsLoaded = false;
                    pendingLoads++;
                    var ctx = SP.ClientContext.get_current();
                    //TODO: Handle lookup to another web
                    var web = ctx.get_web();
                    var listId = _schema.LookupListId;
                    var list = !listname ? web.get_lists().getById(listId) : web.get_lists().getByTitle(listname);
                    var query = new SP.CamlQuery();
                    var predicate = camlFilter.replace(parseRegex, function (v, a) {
                        var expr = stripBraces(v);
                        return dependencyValues[expr] ? dependencyValues[expr] : '';
                    });
                    //TODO: Handle ShowField attribure
                    if (predicate.substr(0, 5) == '<View') {
                        query.set_viewXml(predicate);
                    }
                    else {
                        query.set_viewXml('<View Scope="RecursiveAll"><Query><Where>' + predicate + '</Where></Query> ' + '<ViewFields><FieldRef Name="ID" /><FieldRef Name="Title"/></ViewFields></View>');
                    }
                    var results = list.getItems(query);
                    ctx.load(results);
                    ctx.executeQueryAsync(function (o, e) {
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
                            var id;
                            var text;
                            if (!lookupField) {
                                id = c.get_id();
                                text = c.get_item('Title');
                            }
                            else {
                                var value = c.get_item(lookupField);
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
                            }
                            else {
                                if (_selectedValue != 0 && !selected) {
                                    _dropdownElt.selectedIndex = 0;
                                }
                                OnLookupValueChanged();
                            }
                        }
                    }, function (o, args) {
                        console.log(args.get_message());
                    });
                }
            }
        };
        csr.prototype.computedValue = function (targetField, transform) {
            var _this = this;
            var sourceField = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                sourceField[_i - 2] = arguments[_i];
            }
            var dependentValues = {};
            return this.onPostRenderField(targetField, function (schema, ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                    var targetControl = CSR.getControl(schema);
                    sourceField.forEach(function (field) {
                        CSR.addUpdatedValueCallback(ctx, field, function (v) {
                            dependentValues[field] = v;
                            targetControl.value = transform.apply(_this, sourceField.map(function (n) { return dependentValues[n] || ''; }));
                        });
                    });
                }
            });
        };
        csr.prototype.setInitialValue = function (fieldName, value, ignoreNull) {
            if (value || !ignoreNull) {
                return this.onPreRenderField(fieldName, function (schema, ctx) {
                    ctx.ListData.Items[0][fieldName] = value;
                });
            }
            else {
                return this;
            }
        };
        csr.prototype.autofill = function (fieldName, init) {
            return this.fieldNew(fieldName, SPFieldLookup_Autofill_Edit).fieldEdit(fieldName, SPFieldLookup_Autofill_Edit);
            function SPFieldLookup_Autofill_Edit(rCtx) {
                if (rCtx == null)
                    return '';
                var _myData = SPClientTemplates.Utility.GetFormContextForCurrentField(rCtx);
                if (_myData == null || _myData.fieldSchema == null)
                    return '';
                var _autoFillControl;
                var _textInputElt;
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
                _myData.registerGetValueCallback(_myData.fieldName, function () { return _myData.fieldValue; });
                _myData.updateControlValue(_myData.fieldName, _myData.fieldValue);
                return buildAutoFillControl();
                function initAutoFillControl() {
                    _textInputElt = document.getElementById(_textInputId);
                    SP.SOD.executeFunc("autofill.js", "SPClientAutoFill", function () {
                        _autoFillControl = new SPClientAutoFill(_textInputId, _autofillContainerId, function (_) { return callback(); });
                        var callback = init({
                            renderContext: rCtx,
                            fieldContext: _myData,
                            autofill: _autoFillControl,
                            control: _textInputElt
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
                    var result = [];
                    result.push('<div dir="' + STSHtmlEncode(_myData.fieldSchema.Direction) + '" style="position: relative;">');
                    result.push('<input type="text" id="' + STSHtmlEncode(_textInputId) + '" title="' + STSHtmlEncode(_myData.fieldSchema.Title) + '"/>');
                    result.push("<div class='sp-peoplepicker-autoFillContainer' id='" + STSHtmlEncode(_autofillContainerId) + "'></div>");
                    result.push("</div>");
                    return result.join("");
                }
            }
        };
        csr.prototype.seachLookup = function (fieldName) {
            return this.autofill(fieldName, function (ctx) {
                var _myData = ctx.fieldContext;
                var _schema = _myData.fieldSchema;
                if (_myData.fieldSchema.Type != 'Lookup') {
                    return null;
                }
                var _valueStr = _myData.fieldValue != null ? _myData.fieldValue : '';
                var _selectedValue = SPClientTemplates.Utility.ParseLookupValue(_valueStr);
                var _noValueSelected = _selectedValue.LookupId == 0;
                ctx.control.value = _selectedValue.LookupValue;
                $addHandler(ctx.control, "blur", function (_) {
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
                return function () {
                    var value = ctx.control.value;
                    _autoFillControl.PopulateAutoFill([AutoFillOptionBuilder.buildLoadingItem('Please wait...')], onSelectItem);
                    SP.SOD.executeFunc("sp.search.js", "Microsoft.SharePoint.Client.Search.Query", function () {
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
                        ctx.executeQueryAsync(function () {
                            //TODO: Discover proper way to load collection
                            var tableCollection = new Search.ResultTableCollection();
                            tableCollection.initPropertiesFromJson(result.get_value());
                            var relevantResults = tableCollection.get_item(0);
                            var rows = relevantResults.get_resultRows();
                            var items = [];
                            for (var i = 0; i < rows.length; i++) {
                                items.push(AutoFillOptionBuilder.buildOptionItem(parseInt(rows[i]["ListItemId"], 10), rows[i]["Title"]));
                            }
                            items.push(AutoFillOptionBuilder.buildSeparatorItem());
                            if (relevantResults.get_totalRows() == 0)
                                items.push(AutoFillOptionBuilder.buildFooterItem("No results. Please refine your query."));
                            else
                                items.push(AutoFillOptionBuilder.buildFooterItem("Showing " + rows.length + " of" + relevantResults.get_totalRows() + " items!"));
                            _autoFillControl.PopulateAutoFill(items, onSelectItem);
                        }, function (sender, args) {
                            _autoFillControl.PopulateAutoFill([AutoFillOptionBuilder.buildFooterItem("Error executing query/ See log for details.")], onSelectItem);
                            console.log(args.get_message());
                        });
                    });
                };
                function onSelectItem(targetInputId, item) {
                    var targetElement = ctx.control;
                    targetElement.value = item[SPClientAutoFill.DisplayTextProperty];
                    _selectedValue.LookupId = item[SPClientAutoFill.KeyProperty];
                    _selectedValue.LookupValue = item[SPClientAutoFill.DisplayTextProperty];
                    _myData.fieldValue = item[SPClientAutoFill.KeyProperty] + ';#' + item[SPClientAutoFill.TitleTextProperty];
                    _myData.updateControlValue(_myData.fieldSchema.Name, _myData.fieldValue);
                }
            });
        };
        csr.prototype.lookupAddNew = function (fieldName, prompt, showDialog, contentTypeId) {
            return this.onPostRenderField(fieldName, function (schema, ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm)
                    var control = CSR.getControl(schema);
                if (control) {
                    var weburl = _spPageContextInfo.webServerRelativeUrl;
                    if (weburl[weburl.length - 1] == '/') {
                        weburl = weburl.substring(0, weburl.length - 1);
                    }
                    var newFormUrl = weburl + '/_layouts/listform.aspx/listform.aspx?PageType=8' + "&ListId=" + encodeURIComponent('{' + schema.LookupListId + '}');
                    if (contentTypeId) {
                        newFormUrl += '&ContentTypeId=' + contentTypeId;
                    }
                    var link = document.createElement('a');
                    link.href = "javascript:NewItem2(event, \'" + newFormUrl + "&Source=" + encodeURIComponent(document.location.href) + "')";
                    link.textContent = prompt;
                    if (control.nextElementSibling) {
                        control.parentElement.insertBefore(link, control.nextElementSibling);
                    }
                    else {
                        control.parentElement.appendChild(link);
                    }
                    if (showDialog) {
                        $addHandler(link, "click", function (e) {
                            SP.SOD.executeFunc('sp.ui.dialog.js', 'SP.UI.ModalDialog.ShowPopupDialog', function () {
                                SP.UI.ModalDialog.ShowPopupDialog(newFormUrl);
                            });
                            e.stopPropagation();
                            e.preventDefault();
                        });
                    }
                }
            });
        };
        csr.prototype.register = function () {
            if (!this.IsRegistered) {
                SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this);
                this.IsRegistered = true;
            }
        };
        return csr;
    })();
    var AutoFillOptionBuilder = (function () {
        function AutoFillOptionBuilder() {
        }
        AutoFillOptionBuilder.buildFooterItem = function (title) {
            var item = {};
            item[SPClientAutoFill.DisplayTextProperty] = title;
            item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Footer;
            return item;
        };
        AutoFillOptionBuilder.buildOptionItem = function (id, title, displayText, subDisplayText) {
            var item = {};
            item[SPClientAutoFill.KeyProperty] = id;
            item[SPClientAutoFill.DisplayTextProperty] = displayText || title;
            item[SPClientAutoFill.SubDisplayTextProperty] = subDisplayText;
            item[SPClientAutoFill.TitleTextProperty] = title;
            item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Option;
            return item;
        };
        AutoFillOptionBuilder.buildSeparatorItem = function () {
            var item = {};
            item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Separator;
            return item;
        };
        AutoFillOptionBuilder.buildLoadingItem = function (title) {
            var item = {};
            item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Loading;
            item[SPClientAutoFill.DisplayTextProperty] = title;
            return item;
        };
        return AutoFillOptionBuilder;
    })();
    CSR.AutoFillOptionBuilder = AutoFillOptionBuilder;
    function ensureFormContextHookField(hook, fieldName) {
        return hook[fieldName] = hook[fieldName] || {
            updatedValueCallbacks: []
        };
    }
    var BooleanValueValidator = (function () {
        function BooleanValueValidator(valueGetter, validationMessage) {
            this.valueGetter = valueGetter;
            this.validationMessage = validationMessage;
        }
        BooleanValueValidator.prototype.Validate = function (value) {
            return new SPClientForms.ClientValidation.ValidationResult(!this.valueGetter(), this.validationMessage);
        };
        return BooleanValueValidator;
    })();
})(CSR || (CSR = {}));
if (typeof SP == 'object' && SP && typeof SP.SOD == 'object' && SP.SOD) {
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");
}
//# sourceMappingURL=typescripttemplates.js.map