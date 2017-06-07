// Type definitions for SharePoint JSOM 
// Project: https://github.com/gandjustas/sptypescript
// Definitions by: Stanislav Vyshchepan <http://blog.gandjustas.ru>, Andrey Markeev <http://markeev.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare var inplview: {
    RefreshInplViewUrlByContext: (ctxParam: SPClientTemplates.RenderContext) => void;
    HandleRefreshViewByContext: (ctxParam: SPClientTemplates.RenderContext, bClearPagingParam: boolean) => void;
};