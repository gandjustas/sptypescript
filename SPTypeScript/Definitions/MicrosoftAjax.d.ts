declare module Sys {
    export class EventArgs {
        static Empty: Sys.EventArgs;
    }
    export class StringBuilder {
        /** Appends a string to the string builder */
        append(s: string): void;
        /** Appends a line to the string builder */
        appendLine(s: string): void;
        /** Clears the contents of the string builder */
        clear(): void;
        /** Indicates wherever the string builder is empty */
        isEmpty(): bool;
        /** Gets the contents of the string builder as a string */
        toString(): string;
    }
    export class Component {
        get_id(): string;
        static create(type: Component, properties?: any, events?: any, references?: any, element?: Node);
        initialize(): void;
        updated(): void;
    }
    declare module UI {
        export class Control { }
        export class DomEvent { }
    }
    declare module Net {
        export class WebRequest { }
        export class WebRequestExecutor { }
    }
    declare interface IDisposable {
        dispose(): void;
    }

}