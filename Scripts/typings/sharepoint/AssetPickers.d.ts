// Type definitions for SharePoint JSOM 
// Project: https://github.com/gandjustas/sptypescript
// Definitions by: Stanislav Vyshchepan <http://blog.gandjustas.ru>, Andrey Markeev <http://markeev.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare class AssetPickerConfig {
    constructor(controlId: string);

    AllowExternalUrls: boolean;
    AssetTextClientID: string;
    AssetType: string;
    AssetUrlClientID: string;
    CurrentWebBaseUrl: string;
    DefaultAssetImageLocation: string;
    DefaultAssetLocation: string;
    DefaultToLastUsedLocation: boolean;
    DisplayLookInSection: boolean;
    OverrideDialogDesc: string;
    OverrideDialogFeatures: object;
    OverrideDialogImageUrl: string;
    OverrideDialogTitle: string;
    UseImageAssetPicker: boolean;
    ReturnCallback: any;
}

declare function APD_LaunchAssetPicker(config: AssetPickerConfig, controlId: string): void;