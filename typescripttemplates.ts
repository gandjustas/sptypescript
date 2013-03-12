/// <reference path="SP.Init.d.ts"/>
/// <reference path="clienttemplates.d.ts"/>

/** Lightweight client-side rendering template overrides.*/
module Csr{

    /** Creates new overrides. Call .register() at the end.*/
    export function override(listTemplateType: number, baseViewId ? : number):ICsr {
        return new csr(listTemplateType, baseViewId);
    }

    class csr implements ICsr, SPClientTemplates.TemplateOverridesOptions {

        public Templates: SPClientTemplates.TemplateOverrides;
        public OnPreRender: { (ctx: SPClientTemplates.RenderContext): void; }[];
        public OnPostRender: { (ctx: SPClientTemplates.RenderContext): void; }[];

        constructor(public ListTemplateType: number, public BaseViewID?: number) {
            this.Templates = { Fields: {} };
        }

        template(name: string, template: any): ICsr {
            this.Templates[name] = template;
            return this;
        }

        fieldTemplate(field: string, name: string, template: any): ICsr {
            this.Templates.Fields[field][name] = template;
            return this;
        }

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

        /** Sets pre-render callbacks.
            @param callbacks pre-render callbacks.
        */
        onPreRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICsr;

        /** Sets post-render callbacks.
            @param callbacks post-render callbacks.
        */
        onPostRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICsr;

        /** Registers overrides in client-side templating engine.*/
        register(): void;
    }    
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");