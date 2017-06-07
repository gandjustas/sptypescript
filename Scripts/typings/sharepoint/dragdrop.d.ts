// Type definitions for SharePoint JSOM 
// Project: https://github.com/gandjustas/sptypescript
// Definitions by: Stanislav Vyshchepan <http://blog.gandjustas.ru>, Andrey Markeev <http://markeev.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare enum DragDropMode {
    NOTSUPPORTED,   // -1
    IE8,            // 0
    IE9,            // 1
    HTML5           // 3
}

declare enum UploadType {
    NOT_SUPPORTED,  // 0
    ACTIVEX,        // 1
    ACTIVEXNA,      // 2
    HTML5           // 3
}

declare var g_uploadType: UploadType;

declare var SPDragDropManager: {
    DragDropMode: DragDropMode;
}