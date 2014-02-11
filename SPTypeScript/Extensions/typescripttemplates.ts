///<reference path="../Definitions/SharePoint.d.ts" />

/** Lightweight client-side rendering template overrides.*/
module CSR {

    /** Creates new overrides. Call .register() at the end.*/
    export function override(listTemplateType?: number, baseViewId?: string): ICSR;
    export function override(listTemplateType?: number, baseViewId?: number): ICSR;

    export function override(listTemplateType?: number, baseViewId?: any): ICSR {
        return new csr(listTemplateType, baseViewId);
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