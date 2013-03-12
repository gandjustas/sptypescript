/// <reference path="clienttemplates.d.ts"/>

class csr implements ICsr, SPClientTemplates.TemplateOverridesOptions {
    static override (listTemplateType: number, baseViewId?: number) {
        return new csr(listTemplateType, baseViewId);
    }

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

}

export interface ICsr {
    template(name: string, template: string): ICsr;
    template(name: string, template: (ctx: SPClientTemplates.RenderContext) => string): ICsr;

    fieldTemplate(field: string, name: string, template: string): ICsr;
    fieldTemplate(field: string, name: string, template: (ctx: SPClientTemplates.RenderContext) => string): ICsr;

    onPreRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICsr;
    onPostRender(...callbacks: { (ctx: SPClientTemplates.RenderContext): void; }[]): ICsr;
}

