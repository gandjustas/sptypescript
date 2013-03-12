declare function RegisterModuleInit(scriptFileName:string, initFunc: () => void):void;

declare class JSRequest {
    static QueryString: { [parameter: string]: string; };
    static EnsureSetup(): void;
    static FileName: string;
    static PathName: string;
}