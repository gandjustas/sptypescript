// Type definitions for SharePoint JSOM 
// Project: https://github.com/gandjustas/sptypescript
// Definitions by: Stanislav Vyshchepan <http://blog.gandjustas.ru>, Andrey Markeev <http://markeev.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace RTE {
    export class CanvasRange {
        insertBefore(node: Node): void;
        insertAfter(node: Node): void;
        wrapRange(node: Node): void;
    }

    export class Cursor {
        static getCurrentElement(): HTMLElement;
        static get_range(): CanvasRange;
        static update(): void;
        static updateRangeToCurrentSelection(): void;
    }
    
    export class Canvas {
        static sendApplicationStateChangedEvent(): void;
    }

    export class CommandState {
        get_applied(): boolean;
    }

    export class ParagraphCommands {
        static queryBulletedList(): CommandState;
    }

    export class SnapshotManager {
        static takeSnapshot(): void;
        static undo(): void;
        static redo(): void;
    }
}