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
