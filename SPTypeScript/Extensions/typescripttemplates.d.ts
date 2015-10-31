/** Lightweight client-side rendering template overrides.*/
declare module CSR {
    interface UpdatedValueCallback {
        (value: any, fieldSchema?: SPClientTemplates.FieldSchema_InForm): void;
    }
    /** Creates new overrides. Call .register() at the end.*/
    function override(listTemplateType?: number, baseViewId?: number | string): ICSR;
    function getFieldValue(ctx: SPClientTemplates.RenderContext_Form, fieldName: string): any;
    function getFieldSchema(ctx: SPClientTemplates.RenderContext_Form, fieldName: string): SPClientTemplates.FieldSchema_InForm;
    function addUpdatedValueCallback(ctx: SPClientTemplates.RenderContext_Form, fieldName: string, callback: UpdatedValueCallback): void;
    function removeUpdatedValueCallback(ctx: SPClientTemplates.RenderContext_Form, fieldName: string, callback: UpdatedValueCallback): void;
    function getControl(schema: SPClientTemplates.FieldSchema_InForm): HTMLInputElement;
    function getFieldTemplate(field: SPClientTemplates.FieldSchema, mode: SPClientTemplates.ClientControlMode): SPClientTemplates.FieldCallback;
    class AutoFillOptionBuilder {
        static buildFooterItem(title: string): ISPClientAutoFillData;
        static buildOptionItem(id: number, title: string, displayText?: string, subDisplayText?: string): ISPClientAutoFillData;
        static buildSeparatorItem(): ISPClientAutoFillData;
        static buildLoadingItem(title: string): ISPClientAutoFillData;
    }
    /** Lightweight client-side rendering template overrides.*/
    interface ICSR {
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
        onPreRender(...callbacks: {
            (ctx: SPClientTemplates.RenderContext): void;
        }[]): ICSR;
        /** Sets post-render callbacks. Callback called after rendered html inserted to DOM.
            @param callbacks post-render callbacks.
        */
        onPostRender(...callbacks: {
            (ctx: SPClientTemplates.RenderContext): void;
        }[]): ICSR;
        /** Sets pre-render callbacks for field. Callback called before rendering starts. Correctly handles form rendering.
            @param fieldName Internal name of the field.
            @param callbacks pre-render callbacks.
        */
        onPreRenderField(field: string, callback: {
            (schema: SPClientTemplates.FieldSchema, ctx: SPClientTemplates.RenderContext): void;
        }): ICSR;
        /** Sets post-render callbacks. Callback called after rendered html inserted to DOM. Correctly handles form rendering.
            @param fieldName Internal name of the field.
            @param callbacks post-render callbacks.
        */
        onPostRenderField(field: string, callback: {
            (schema: SPClientTemplates.FieldSchema, ctx: SPClientTemplates.RenderContext): void;
        }): ICSR;
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
        makeHidden(fieldName: string): ICSR;
        /** Replace New and Edit templates for field to Display template.
            @param fieldName Internal name of the field.
        */
        makeReadOnly(fieldName: string): ICSR;
        /** Create cascaded Lookup Field.
            @param fieldName Internal name of the field.
            @param camlFilter CAML predicate expression (inside Where clause). Use {FieldName} tokens for dependency fields substitutions.
        */
        filteredLookup(fieldName: string, camlFilter: string, listname?: string, lookupField?: string): ICSR;
        /** Auto computes text-based field value based on another fields.
            @param targetField Internal name of the field.
            @param transform Function combines source field values.
            @param sourceField Internal names of source fields.
        */
        computedValue(targetField: string, transform: (...values: string[]) => string, ...sourceField: string[]): ICSR;
        /** Field text value with autocomplete based on autofill.js
            @param fieldName Internal name of the field.
            @param ctx AutoFill context.
        */
        autofill(fieldName: string, init: (ctx: IAutoFillFieldContext) => () => void): ICSR;
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
        koEditField(fieldName: string, template: string, vm: IKoFieldInForm, dependencyFields?: string[]): ICSR;
    }
    interface IAutoFillFieldContext {
        renderContext: SPClientTemplates.RenderContext_FieldInForm;
        fieldContext: SPClientTemplates.ClientFormContext;
        autofill: SPClientAutoFill;
        control: HTMLInputElement;
    }
    interface IKoFieldInForm {
        renderingContext?: SPClientTemplates.RenderContext_FieldInForm;
        value?: KnockoutObservable<any>;
    }
}
