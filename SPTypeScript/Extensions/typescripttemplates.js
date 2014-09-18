///<reference path="../Definitions/SharePoint.d.ts" />
/** Lightweight client-side rendering template overrides.*/
var CSR;
(function (CSR) {
    

    function override(listTemplateType, baseViewId) {
        return new csr(listTemplateType, baseViewId);
    }
    CSR.override = override;

    function getControl(schema) {
        var id = schema.Name + '_' + schema.Id + '_$' + schema.FieldType + 'Field';

        //TODO: Handle different input types
        return $get(id);
    }
    CSR.getControl = getControl;

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
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                callbacks[_i] = arguments[_i + 0];
            }
            for (var i = 0; i < callbacks.length; i++) {
                this.OnPreRender.push(callbacks[i]);
            }
            return this;
        };

        csr.prototype.onPostRender = function () {
            var callbacks = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                callbacks[_i] = arguments[_i + 0];
            }
            for (var i = 0; i < callbacks.length; i++) {
                this.OnPostRender.push(callbacks[i]);
            }
            return this;
        };

        csr.prototype.makeReadOnly = function (fieldName) {
            this.onPreRender(function (ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid || ctx.ControlMode == SPClientTemplates.ClientControlMode.DisplayForm)
                    return;

                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                    var ctxInView = ctx;

                    var fieldSchema;
                    var fields = ctxInView.ListSchema.Field;

                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].Name === fieldName) {
                            fieldSchema = fields[i];
                        }
                    }
                    if (fieldSchema) {
                        if (ctxInView.inGridMode) {
                            //TODO: Disable editing in grid mode
                            fieldSchema.ReadOnlyField = true;
                        } else {
                            var fieldSchemaInView = fieldSchema;
                            fieldSchemaInView.ReadOnly = "TRUE";
                        }
                    }
                } else {
                    var ctxInForm = ctx;
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
        };

        csr.prototype.makeHidden = function (fieldName) {
            this.onPreRender(function (ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.Invalid)
                    return;

                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.View) {
                    var ctxInView = ctx;

                    var fieldSchema;
                    var fields = ctxInView.ListSchema.Field;

                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].Name === fieldName) {
                            fieldSchema = fields[i];
                        }
                    }
                    if (fieldSchema) {
                        if (ctxInView.inGridMode) {
                            //TODO: Hide item in grid mode
                            fieldSchema.Hidden = true;
                        } else {
                            ctxInView.ListSchema.Field.splice(ctxInView.ListSchema.Field.indexOf(fieldSchema), 1);
                        }
                    }
                } else {
                    var ctxInForm = ctx;
                    var fieldSchemaInForm = ctxInForm.ListSchema.Field[0];
                    if (fieldSchemaInForm.Name === fieldName) {
                        fieldSchemaInForm.Hidden = true;
                        var pHolderId = ctxInForm.FormUniqueId + ctxInForm.FormContext.listAttributes.Id + fieldName;
                        var placeholder = $get(pHolderId);
                        var current = placeholder;
                        while (current.tagName.toUpperCase() !== "TR") {
                            current = current.parentElement;
                        }
                        var row = current;
                        row.style.display = 'none';
                    }
                }
            });
            return this;
        };

        csr.prototype.cascadeLookup = function (fieldName, camlFilter) {
            var parseRegex = /\{[^\}]+\}/g;
            var dependentFieldNames = parseRegex.exec(camlFilter).map(function (v, idx, _) {
                return stripBraces(v);
            });
            var dependentControls = {};

            var _dropdownElt;
            var _schema;
            var _myData;

            return this.fieldEdit(fieldName, SPFieldCascadedLookup_Edit).fieldNew(fieldName, SPFieldCascadedLookup_Edit).onPostRender(postRender);

            function postRender(ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                    var schema = ctx.ListSchema.Field[0];
                    dependentFieldNames.forEach(function (field, idx, _) {
                        if (schema.Name == field) {
                            dependentControls[field] = CSR.getControl(schema);
                            $addHandler(dependentControls[field], "change", function (e) {
                                loadOptions();
                            });
                        }
                    });
                }
            }

            function loadOptions() {
                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                    var ctx = SP.ClientContext.get_current();

                    //TODO: Handle lookup to another web
                    var web = ctx.get_web();
                    var listId = _schema.LookupListId;
                    var list = web.get_lists().getById(listId);
                    var query = new SP.CamlQuery();

                    var predicate = camlFilter.replace(parseRegex, function (v, a) {
                        var field = stripBraces(v);
                        return dependentControls[field] ? dependentControls[field].value : '';
                    });

                    //TODO: Handle ShowField attribure
                    query.set_viewXml('<View><Query><Where>' + predicate + '</Where></Query> ' + '<ViewFields><FieldRef Name="ID" /><FieldRef Name="Title"/></ViewFields></View>');
                    var results = list.getItems(query);
                    ctx.load(results);
                    ctx.executeQueryAsync(function (o, e) {
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
                    }, function (o, args) {
                        console.log(args.get_message());
                    });
                });
            }

            function SPFieldCascadedLookup_Edit(rCtx) {
                if (rCtx == null)
                    return '';
                _myData = SPClientTemplates.Utility.GetFormContextForCurrentField(rCtx);

                if (_myData == null || _myData.fieldSchema == null)
                    return '';
                _schema = _myData.fieldSchema;

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
                    _dropdownElt = document.getElementById(_dropdownId);
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

            function stripBraces(input) {
                return input.substring(1, input.length - 1);
            }
        };

        csr.prototype.computedValue = function (targetField, transform) {
            var sourceField = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                sourceField[_i] = arguments[_i + 2];
            }
            var dependentControls = {};
            var targetControl;

            return this.onPostRender(function (ctx) {
                if (ctx.ControlMode == SPClientTemplates.ClientControlMode.EditForm || ctx.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                    var schema = ctx.ListSchema.Field[0];

                    if (schema.Name == targetField) {
                        targetControl = CSR.getControl(schema);
                    }

                    sourceField.forEach(function (field, idx, _) {
                        if (schema.Name == field) {
                            dependentControls[field] = CSR.getControl(schema);
                            $addHandler(dependentControls[field], "change", function (e) {
                                updateValue();
                            });
                        }
                    });
                }
            });

            function updateValue() {
                if (targetControl) {
                    targetControl.value = transform.apply(this, sourceField.map(function (n) {
                        return dependentControls[n] ? dependentControls[n].value : '';
                    }));
                }
            }
        };

        csr.prototype.register = function () {
            if (!this.IsRegistered) {
                SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this);
                this.IsRegistered = true;
            }
        };
        return csr;
    })();

    

    function GetFieldTemplate(field, mode) {
        var ctx = { ListSchema: { Field: [field] }, FieldControlModes: {} };
        ctx.FieldControlModes[field.Name] = mode;
        var templates = SPClientTemplates.TemplateManager.GetTemplates(ctx);
        return templates.Fields[field.Name];
    }
})(CSR || (CSR = {}));

if (typeof SP == 'object' && SP && typeof SP.SOD == 'object' && SP.SOD) {
    SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");
}
//# sourceMappingURL=typescripttemplates.js.map
