
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
    module UI {
        export class Control { }
        export class DomEvent {
            static addHandler(element: HTMLElement, eventName: string, handler: (e: Event) => void );
            static removeHandler(element: HTMLElement, eventName: string, handler: (e: Event) => void );
        }
    }
    module Net {
        export class WebRequest { }
        export class WebRequestExecutor { }
    }
    interface IDisposable {
        dispose(): void;
    }

}

declare var $get: { (id: string): HTMLElement; };
declare var $addHandler: { (element: HTMLElement, eventName: string, handler: (e: Event) => void ): void; };
declare var $removeHandler: { (element: HTMLElement, eventName: string, handler: (e: Event) => void ): void; };
