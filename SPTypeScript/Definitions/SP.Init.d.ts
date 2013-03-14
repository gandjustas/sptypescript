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

declare class _spPageContextInfo {
    static alertsEnabled: bool; //true
    static allowSilverlightPrompt: string; //"True"
    static clientServerTimeDelta: number; //-182
    static crossDomainPhotosEnabled: bool; //true
    static currentCultureName: string; //"ru-RU"
    static currentLanguage: number; //1049
    static currentUICultureName: string; //"ru-RU"
    static layoutsUrl: string;  //"_layouts/15"
    static pageListId: string;  //"{06ee6d96-f27f-4160-b6bb-c18f187b18a7}"
    static pagePersonalizationScope: string; //1
    static serverRequestPath: string; //"/SPTypeScript/Lists/ConditionalFormattingTasksList/AllItems.aspx"
    static siteAbsoluteUrl: string; // "https://gandjustas-7b20d3715e8ed4.sharepoint.com"
    static siteClientTag: string; //"0$$15.0.4454.1021"
    static siteServerRelativeUrl: string; // "/"
    static systemUserKey: string; //"i:0h.f|membership|10033fff84e7cb2b@live.com"
    static tenantAppVersion: string; //"0"
    static userId: number; //12
    static webAbsoluteUrl: string; //"https://gandjustas-7b20d3715e8ed4.sharepoint.com/SPTypeScript"
    static webLanguage: number; //1049
    static webLogoUrl: string; //"/_layouts/15/images/siteIcon.png?rev=23"
    static webPermMasks: { High: number; Low: number; };
    static webServerRelativeUrl: string; //"/SPTypeScript"
    static webTemplate: string; //"17"
    static webTitle: string; //"SPTypeScript"
    static webUIVersion: number; //15
}

declare function STSHtmlEncode(value: string): string;

declare function AddEvtHandler(element: HTMLElement, event:string, func: EventListener): void;
