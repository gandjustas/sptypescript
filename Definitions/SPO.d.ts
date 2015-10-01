/// <reference path="SP.d.ts"/>
/// <reference path="SP.Init.d.ts"/>
/// <reference path="clienttemplates.d.ts"/>

/** Available only in SharePoint Online*/
declare module Define {
    export function loadScript(url: string, successCallback: () => void, errCallback: () => void): void;
    /** Loads script from _layouts/15/[req].js */
    export function require(req: string, callback: Function): void;
    /** Loads script from _layouts/15/[req].js */
    export function require(req: string[], callback: Function): void;
    export function define(name: string, deps: string[], def: Function): void;
}

/** Available only in SharePoint Online*/
declare module Verify {
    export function ArgumentType(arg: string, expected: any): void;
}


/** Available only in SharePoint Online*/
declare module BrowserStorage {
    export var local: CachedStorage;
    export var session: CachedStorage;

    /** Available only in SharePoint Online*/
    interface CachedStorage {
        getItem(key: string): string;
        setItem(key: string, value: string): void;
        removeItem(key: string): void;
        clead(): void;
        length: number;
    }
}

/** Available only in SharePoint Online*/
declare module BrowserDetection {
    export var browseris: Browseris;
}

/** Available only in SharePoint Online*/
declare module CSSUtil {
    export function HasClass(elem: HTMLElement, className: string): boolean;
    export function AddClass(elem: HTMLElement, className: string): void;
    export function RemoveClass(elem: HTMLElement, className: string): void;
    export function pxToFloat(pxString: string): number;
    export function pxToNum(px: string): number;
    export function numToPx(n: number): string;
    export function getCurrentEltStyleByNames(elem: HTMLElement, styleNames: string[]): string;
    export function getCurrentStyle(elem: HTMLElement, cssStyle: string): string;
    export function getCurrentStyleCorrect(element: HTMLElement, camelStyleName: string, dashStyleName: string): string;
    export function getOpacity(element: HTMLElement): number;
    export function setOpacity(element: HTMLElement, value: number): void;
}

/** Available only in SharePoint Online*/
declare module DOM {
    export var rightToLeft: boolean;
    export function cancelDefault(evt: Event): void;
    export function AbsLeft(el: HTMLElement): number;
    export function AbsTop(el: HTMLElement): number;
    export function CancelEvent(evt: Event): void;
    export function GetElementsByName(nae: string): NodeList;
    export function GetEventCoords(evt: Event): { x: number; y: number; };
    export function GetEventSrcElement(evt: Event): HTMLElement;
    export function GetInnerText(el: HTMLElement): string;
    export function PreventDefaultNavigation(evt: Event): void;
    export function SetEvent(eventName: string, eventFunc: Function, el: HTMLElement): void;
}

/** Available only in SharePoint Online*/
declare module Encoding {
    export function EncodeScriptQuote(str: string): string;
    export function HtmlEncode(str: string): string;
    export function HtmlDecode(str: string): string;
    export function AttrQuote(str: string): string;
    export function ScriptEncode(str: string): string;
    export function ScriptEncodeWithQuote(str: string): string;
    export function CanonicalizeUrlEncodingCase(str: string): string;
}

/** Available only in SharePoint Online*/
declare module IE8Support {
    export function arrayIndexOf<T>(array: T[], item: T, startIdx?: number): number;
    export function attachDOMContentLoaded(handler: Function): void;
    export function getComputedStyle(domObj: HTMLElement, camelStyleName: string, dashStyleName: string): string;
    export function stopPropagation(evt: Event): void;
}

/** Available only in SharePoint Online*/
declare module StringUtil {
    export function BuildParam(stPattern: string, ...params: any[]): string;
    export function ApplyStringTemplate(str: string, ...params: any[]): string;
}

/** Available only in SharePoint Online*/
declare module TypeUtil {
    export function IsArray(value: any): boolean;
    export function IsNullOrUndefined(value: any): boolean;
}

/** Available only in SharePoint Online*/
declare module Nav {
    export var ajaxNavigate: AjaxNavigate;
    export function convertRegularURLtoMDSURL(webUrl: string, fullPath: string): string;
    export function isMDSUrl(url: string): boolean;
    export function isPageUrlValid(url: string): boolean;
    export function isPortalTemplatePage(url: string): boolean;
    export function getAjaxLocationWindow(): string;
    export function getSource(defaultSource?: string): string;
    export function getUrlKeyValue(keyName: string, bNoDecode: boolean, url: string, bCaseInsensitive: boolean): string;
    export function getWindowLocationNoHash(hre: string): string;
    export function goToHistoryLink(el: HTMLAnchorElement, strVersion: string): void;
    export function getGoToLinkUrl(el: HTMLAnchorElement): string;
    export function goToLink(el: HTMLAnchorElement): void;
    export function goToLinkOrDialogNewWindow(el: HTMLAnchorElement): void;
    export function goToDiscussion(url: string): void;
    export function onClickHook(evt: Event, topElm: HTMLElement): void;
    export function pageUrlValidation(url: string, alertString: string): string;
    export function parseHash(hash: string): Object;
    export function navigate(url: string): void;
    export function removeMDSQueryParametersFromUrl(url: string): string;
    export function urlFromHashBag(hashObject: Object): string;
    export function wantsNewTab(evt: Event): boolean;
}

/** Available only in SharePoint Online*/
declare module URI_Encoding {
    export function encodeURIComponent(str: string, bAsUrl?: boolean, bForFilterQuery?: boolean, bForCallback?: boolean): string;
    export function escapeUrlForCallback(str: string): string;
}

interface IListItem {
    ID: number;
    ContentTypeId: string;
}

/** Available only in SharePoint Online*/
declare module ListModule {
    export module Util {
        export function createViewEditUrl(renderCtx: SPClientTemplates.RenderContext, listItem: IListItem, useEditFormUrl?: boolean, appendSource?: boolean): string;
        export function createItemPropertiesTitle(renderCtx: SPClientTemplates.RenderContext, listItem: IListItem): string;
        export function clearSelectedItemsDict(context: any): void;
        export function ctxInitItemState(context: any): void;
        export function getAttributeFromItemTable(itemTableParam: HTMLElement, strAttributeName: string, strAttributeOldName: string): string
        export function getSelectedItemsDict(context: any): any;
        export function removeOnlyPagingArgs(url: string): string;
        export function removePagingArgs(url: string): string;
        export function showAttachmentRows(): void;
    }
}

/** Available only in SharePoint Online*/
declare module SPThemeUtils {
    export function ApplyCurrentTheme(): void;
    export function WithCurrentTheme(resultCallback: Function): void;
    export function UseClientSideTheming(): boolean;
    export function Suspend(): void;
}
