/// <reference path="..\Definitions\SP.Init.d.ts"/>
/// <reference path="..\Definitions\clienttemplates.d.ts"/>

/** Lightweight client-side rendering template overrides.*/
module Csr {

    /** Creates new overrides. Call .register() at the end.*/
    export function override(listTemplateType?: number, baseViewId?: number): ICsr {
        return new csr(listTemplateType, baseViewId);
    }

    class csr implements ICsr, SPClientTemplates.TemplateOverridesOptions {

        public Templates: SPClientTemplates.TemplateOverrides;
        public OnPreRender: { (ctx: SPClientTemplates.RenderContext): void; }[];
        public OnPostRender: { (ctx: SPClientTemplates.RenderContext): void; }[];

        constructor(public ListTemplateType?: number, public BaseViewID?: number) {
            this.Templates = { Fields: {} };
        }

        /* tier 1 methods */
        item(template: any): ICsr {
            this.Templates.Item = template;
            return this;
        }

        header(template: any): ICsr {
            this.Templates.Header = template;
            return this;
        }

        footer(template: any): ICsr {
            this.Templates.Footer = template;
            return this;
        }

        fieldView(fieldName: string, template: any): ICsr {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].View = template;
            return this;
        }

        fieldDisplay(fieldName: string, template: any): ICsr {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].DisplayForm = template;
            return this;
        }

        fieldNew(fieldName: string, template: any): ICsr {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].NewForm = template;
            return this;
        }

        fieldEdit(fieldName: string, template: any): ICsr {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName].EditForm = template;
            return this;
        }

        /* tier 2 methods */
        template(fieldName: string, template: any): ICsr {
            this.Templates[name] = template;
            return this;
        }

        fieldTemplate(fieldName: string, name: string, template: any): ICsr {
            this.Templates.Fields[fieldName] = this.Templates.Fields[fieldName] || {};
            this.Templates.Fields[fieldName][name] = template;
            return this;
        }

        /* common */
        onPreRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICsr {
            this.OnPreRender = callbacks;
            return this;
        }

        onPostRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICsr {
            this.OnPostRender = callbacks;
            return this;
        }

        register() {
            SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this);
        }
    }

    /** Lightweight client-side rendering template overrides.*/
    export interface ICsr {
        /** Override rendering template.
            @param name Name of template to override.
            @param template New template.
        */
        template(name: string, template: string): ICsr;

        /** Override rendering template.
            @param name Name of template to override.
            @param template New template.
        */
        template(name: string, template: (ctx: SPClientTemplates.RenderContext) => string): ICsr;

        /** Override field rendering template.
            @param name Internal name of field to override.
            @param name Name of template to override.
            @param template New template.
        */
        fieldTemplate(field: string, name: string, template: string): ICsr;

        /** Override field rendering template.
            @param name Internal name of field to override.
            @param name Name of template to override.
            @param template New template.
        */
        fieldTemplate(field: string, name: string, template: (ctx: SPClientTemplates.RenderContext) => string): ICsr;

        /** Sets pre-render callbacks. Callback called before rendering starts.
            @param callbacks pre-render callbacks.
        */
        onPreRender(...callbacks: { (ctx: SPClientTemplates.ListViewRenderContext): void; }[]): ICsr;

        /** Sets post-render callbacks. Callback called after rendered html inserted to DOM.
            @param callbacks post-render callbacks.
        */
        onPostRender(...callbacks: { (ctx: SPClientTemplates.ListViewRenderContext): void; }[]): ICsr;

        /** Registers overrides in client-side templating engine.*/
        register(): void;

        /** Override Item rendering template.
            @param template New item template.
        */
        item(template: string): ICsr;

        /** Override Item rendering template.
            @param template New item template.
        */
        item(template: (ctx: SPClientTemplates.ItemRenderContext) => string): ICsr;

        /** Override Header rendering template.
            @param template New header template.
        */
        header(template: string): ICsr;

        /** Override Header rendering template.
            @param template New header template.
        */
        header(template: (ctx: SPClientTemplates.SingleTemplateCallback) => string): ICsr;

        /** Override Footer rendering template.
            @param template New footer template.
        */
        footer(template: string): ICsr;

        /** Override Footer rendering template.
            @param template New footer template.
        */
        footer(template: (ctx: SPClientTemplates.SingleTemplateCallback) => string): ICsr;

        /** Override View rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New View template.
        */
        fieldView(fieldName: string, template: string): ICsr;

        /** Override View rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New View template.
        */
        fieldView(fieldName: string, template: (ctx: SPClientTemplates.FieldInViewRenderContext) => string): ICsr;

        /** Override DisplyForm rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New DisplyForm template.
        */
        fieldDisplay(fieldName: string, template: string): ICsr;

        /** Override DisplyForm rendering template.
            @param fieldName Internal name of the field.
            @param template New DisplyForm template.
        */
        fieldDisplay(fieldName: string, template: (ctx: SPClientTemplates.FieldInFormRenderContext) => string): ICsr;

        /** Override EditForm rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New EditForm template.
        */
        fieldEdit(fieldName: string, template: string): ICsr;

        /** Override EditForm rendering template.
            @param fieldName Internal name of the field.
            @param template New EditForm template.
        */
        fieldEdit(fieldName: string, template: (ctx: SPClientTemplates.FieldInFormRenderContext) => string): ICsr;

        /** Override NewForm rendering template for specified field.
            @param fieldName Internal name of the field.
            @param template New NewForm template.
        */
        fieldNew(fieldName: string, template: string): ICsr;

        /** Override NewForm rendering template.
            @param fieldName Internal name of the field.
            @param template New NewForm template.
        */
        fieldNew(fieldName: string, template: (ctx: SPClientTemplates.FieldInFormRenderContext) => string): ICsr;
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");