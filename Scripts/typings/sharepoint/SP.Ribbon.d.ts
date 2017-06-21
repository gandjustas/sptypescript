// Type definitions for SharePoint JSOM 
// Project: https://github.com/gandjustas/sptypescript
// Definitions by: Stanislav Vyshchepan <http://blog.gandjustas.ru>, Andrey Markeev <http://markeev.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="SP.UI.RTE.d.ts"/>

declare namespace SP {
    export namespace Ribbon {
        export class PageManager {
            static get_instance(): PageManager;
            addPageComponent(component: CUI.Page.PageComponent): void;
            add_ribbonInited(handler: () => void): void;
            get_ribbon(): CUI.Ribbon;
        }
    }
}