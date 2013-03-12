/// <reference path="SP.Init.d.ts"/>
/// <reference path="clienttemplates.d.ts"/>

module Csr{

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

    export interface ICsr {
        template(name: string, template: string): ICsr;
        template(name: string, template: (ctx: SPClientTemplates.RenderContext) => string): ICsr;

        fieldTemplate(field: string, name: string, template: string): ICsr;
        fieldTemplate(field: string, name: string, template: (ctx: SPClientTemplates.RenderContext) => string): ICsr;

        onPreRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICsr;
        onPostRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICsr;

        register(): void;
    }    
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");