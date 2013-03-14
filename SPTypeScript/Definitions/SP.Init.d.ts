declare module SP {
    export class SOD {
        static execute(fileName: string, functionName: string, args?: any[]): void;
        static executeFunc(fileName: string, functionName: string, fn: () => void): void;
        static executeOrDelayUntilEventNotified(func: () => void, eventName: string): bool;
        static executeOrDelayUntilScriptLoaded(func: () => void, depScriptFileName: string): bool;
        static notifyScriptLoadedAndExecuteWaitingJobs(scriptFileName: string): void;
        static notifyEventAndExecuteWaitingJobs(eventName: string): void;
        static registerSod(fileName: string, url: string): void;
        static registerSodDep(fileName: string, dependentFileName: string): void;
    }
}

declare module SP.UI {
    export class Workspace {
        static add_resized(func: () => void): void;
        static remove_resized(func: () => void): void;
    }
}

/** Register function to rerun on partial update in MDS-enabled site.*/
declare function RegisterModuleInit(scriptFileName: string, initFunc: () => void ): void;

/** Provides access to url and query string parts.*/
declare class JSRequest {
    /** Query string parts.*/
    static QueryString: { [parameter: string]: string; };

    /** initializes class.*/
    static EnsureSetup(): void;

    /** Current file name (after last '/' in url).*/
    static FileName: string;

    /** Current file path (before last '/' in url).*/
    static PathName: string;
}

declare function STSHtmlEncode(value: string): string;

declare function AddEvtHandler(element: HTMLElement, event:string, func: EventListener): void;
