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