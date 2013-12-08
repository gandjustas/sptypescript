/// <reference path="SP.d.ts"/>

declare module SP {
    export module DocumentSet {
        export class DocumentSet extends ClientObject {
            static create(context: ClientContext, parentFolder: Folder, name: string, ctid: ContentTypeId): StringResult;
        }
    }

    export module Video {
        export class EmbedCodeConfiguration extends ClientValueObject {
            public get_autoPlay(): boolean;
            public set_autoPlay(value: boolean): boolean;

            public get_displayTitle(): boolean;
            public set_displayTitle(value: boolean): boolean;

            public get_linkToOwnerProfilePage(): boolean;
            public set_linkToOwnerProfilePage(value: boolean): boolean;

            public get_linkToVideoHomePage(): boolean;
            public set_linkToVideoHomePage(value: boolean): boolean;

            public get_loop(): boolean;
            public set_loop(value: boolean): boolean;

            public get_pixelHeight(): number;
            public set_pixelHeight(value: number): number;

            public get_pixelWidth(): number;
            public set_pixelWidth(value: number): number;

            public get_startTime(): number;
            public set_startTime(value: number): number;

            public get_previewImagePath(): string;
            public set_previewImagePath(value: string): string;
        }

        export class VideoSet extends DocumentSet.DocumentSet {
            static createVideo(context: ClientContext, parentFolder: Folder, name: string, ctid: ContentTypeId): StringResult;
            static uploadVideo(context: ClientContext, list: List, fileName: string, file: any[], overwriteIfExists: boolean, parentFolderPath: string): StringResult;
            static getEmbedCode(context: ClientContext, videoPath: string, properties: EmbedCodeConfiguration): StringResult;
            static migrateVideo(context: ClientContext, videoFile: File): SP.ListItem;
        }
    }
}
