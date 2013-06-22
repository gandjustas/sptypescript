/// <reference path="SP.d.ts"/>

declare module SP {
    export module UI {
        export class PopoutMenu implements Sys.IDisposable {
            constructor(launcherId: string, menuId: string, iconId: string, launcherOpenCssClass: string, textDirection: string, closeIconUrl: string, isClustered: bool, closeIconOffsetLeft: number, closeIconOffsetTop: number, closeIconHeight: number, closeIconWidth: number);
            launchMenu(): void;
            closeMenu(): void;
            static createPopoutMenuInstanceAndLaunch(anchorId: string, menuId: string, iconId: string, anchorOpenCss: string, textDirection: string, closeIconUrl: string, isClustered: bool, x: number, y: number, height: number, width: number): void;
            static closeActivePopoutMenuInstance(): void;
            dispose(): void;
        }
        export class AttractModeControl extends Sys.UI.Control {
            defaultAttractModeIcon: string;
            cssAttractMode: string;
            cssAttractModeBackground: string;
            cssAttractModeCell: string;
            cssAttractModeWrapper: string;
            cssAttractModeIcon: string;
            cssAttractModeText: string;
            get_imageElement(): any;
            get_textElement(): HTMLElement;
            constructor();
        }
        export class Notify {
            static addNotification(strHtml: string, bSticky: bool): string;
            static removeNotification(nid: string): void;
            constructor();
        }
        export enum ContainerID {
            Basic,
            Status,
        }
        export enum EventID {
            OnShow,
            OnHide,
            OnDisplayNotification,
            OnRemoveNotification,
            OnNotificationCountChanged,
        }
        export class SPNotification {
            constructor(containerId: SP.UI.ContainerID, strHtml: string, bSticky: bool, strTooltip: string, onclickHandler: () => void , extraData: any);
            constructor(containerId: SP.UI.ContainerID, strHtml: string, bSticky: bool, strTooltip: string, onclickHandler: () => void );
            constructor(containerId: SP.UI.ContainerID, strHtml: string, bSticky: bool, strTooltip: string);
            constructor(containerId: SP.UI.ContainerID, strHtml: string, bSticky: bool);
            constructor(containerId: SP.UI.ContainerID, strHtml: string);
            get_id(): string;
            Show(bNoAnimate: bool): void;
            Hide(bNoAnimate: bool): void;
        }
        export class SPNotificationContainer {
            constructor(id: number, element: any, layer: number, notificationLimit: number);
            constructor(id: number, element: any, layer: number);
            Clear(): void;
            GetCount(): number;
            SetEventHandler(eventId: SP.UI.EventID, eventHandler: any): void;
        }
        export class Status {
            static addStatus(strTitle: string, strHtml: string, atBegining: bool): string;
            static appendStatus(sid: string, strTitle: string, strHtml: string): string;
            static updateStatus(sid: string, strHtml: string): void;
            static setStatusPriColor(sid: string, strColor: string): void;
            static removeStatus(sid: string): void;
            static removeAllStatus(hide: bool): void;
            constructor();
        }
        export class Workspace {
            static add_resized(handler: () => void ): void;
            static remove_resized(handler: () => void ): void;
        }
        export class Menu {
            static create(id: string): SP.UI.Menu;
            addMenuItem(text: string, actionScriptText: string, imageSourceUrl: string, imageAlternateText: string, sequenceNumber: number, description: string, id: string): HTMLElement;
            addSeparator(): void;
            addSubMenu(text: string, imageSourceUrl: string, imageAlternateText: string, sequenceNumber: number, description: string, id: string): SP.UI.Menu;
            show(relativeElement: HTMLElement, forceRefresh: bool, flipTopLevelMenu: bool, yOffset: number): void;
            showFilterMenu(relativeElement: HTMLElement, forceRefresh: bool, flipTopLevelMenu: bool, yOffset: number, fShowClose: bool, fShowCheckBoxes: bool): void;
            hideIcons(): void;
            showIcons(): void;
        }
        export class MenuTest {
            static setup(relativeElement: HTMLElement): void;
            constructor();
        }
        /** Result of a modal dialog execution */
        export enum DialogResult {
            /** Do not use this */
            invalid,
            /** User closed dialog, cancelling the action */
            cancel,
            /** Dialog actions completed successfully */
            OK
        }
        /** Callback which processes dialog result value after dialog is closed */
        export interface DialogReturnValueCallback {
            (dialogResult: DialogResult, returnValue: any): void;
        }
        /** Options for dialog creation */
        export interface IDialogOptions {
            /** url of the page which is shown in the modal dialog. You should use either html or url attribute, but not both. */
            url?: string;
            /** specifies if close button should be shown on the dialog */
            showClose?: bool;
            /** specifies if maximize button should be shown on the dialog */
            allowMaximize?: bool;
            /** callback that is called after dialog is closed */
            dialogReturnValueCallback?: DialogReturnValueCallback;
            /** automatically determine size of the dialog based on its contents. */
            autoSize?: bool;
            /** minimum width of the dialog when using autoSize option */
            autoSizeStartWidth?: number;
            /** include padding for adding a scrollbar */
            includeScrollBarPadding?: bool;
            /** width of the dialog. if not specified, will be determined automatically based on the contents of the dialog */
            width?: number;
            /** height of the dialog. if not specified, will be determined automatically based on the contents of the dialog */
            height?: number;
            /** html element which will be used as contents of the dialog. You should use either html or url attribute, but not both. */
            html?: HTMLElement;
            /** custom arguments to be passed to the dialog */
            args?: any;
        }
        export class DialogOptions implements IDialogOptions {
            /** url of the page which is shown in the modal dialog. You should use either html or url attribute, but not both. */
            url: string;
            /** specifies if close button should be shown on the dialog */
            showClose: bool;
            /** specifies if maximize button should be shown on the dialog */
            allowMaximize: bool;
            /** callback that is called after dialog is closed */
            dialogReturnValueCallback: DialogReturnValueCallback;
            /** automatically determine size of the dialog based on its contents. */
            autoSize: bool;
            /** minimum width of the dialog when using autoSize option */
            autoSizeStartWidth: number;
            /** include padding for adding a scrollbar */
            includeScrollBarPadding: bool;
            /** width of the dialog. if not specified, will be determined automatically based on the contents of the dialog */
            width: number;
            /** height of the dialog. if not specified, will be determined automatically based on the contents of the dialog */
            height: number;
            /** html element which will be used as contents of the dialog. You should use either html or url attribute, but not both. */
            html: HTMLElement;
            /** custom arguments to be passed to the dialog */
            args: any;
        }
        /** Represents a dialog. Do not use this class directly from your code. */
        export class Dialog {
            get_firstTabStop(): HTMLElement;
            get_lastTabStop(): HTMLElement;
            get_url(): string;
            get_html(): string;
            get_title(): string;
            get_args(): any;
            get_allowMaximize(): bool;
            get_showClose(): bool;
            get_returnValue(): any;
            set_returnValue(value: any): void;
            get_frameElement(): HTMLFrameElement;
            get_dialogElement(): HTMLElement;
            get_isMaximized(): bool;
            get_closed(): bool;
            autoSizeSuppressScrollbar(resizePageCallBack: any): void;
            autoSize(): void;
        }
        /** Represents a modal dialog */
        export class ModalDialog extends SP.UI.Dialog {
            /** Displays a modal dialog defined by the specified options. */
            static showModalDialog(options: SP.UI.IDialogOptions): SP.UI.ModalDialog;
            /** Should be called from an existing dialog. */
            static commonModalDialogClose(dialogResult: SP.UI.DialogResult, returnValue: any): void;
            /** Shows a modal dialog, specified by url, callback, args, and options. Internally, uses SP.UI.ModalDialog.showModalDialog.
                @param url overrides options.url
                @param callback overrides options.dialogResultValueCallback
                @param args overrides options.args */
            static commonModalDialogOpen(url: string, options: SP.UI.IDialogOptions, callback: SP.UI.DialogReturnValueCallback, args: any): void;
            /** Refresh the page if specified dialogResult equals to SP.UI.DialogResult.OK */
            static RefreshPage(dialogResult: SP.UI.DialogResult): void;
            /** Show page specified by the url in a modal dialog. If the dialog returns SP.UI.DialogResult.OK, the page is refreshed. */
            static ShowPopupDialog(url: string): void;
            /** Show modal dialog specified by url, callback, height and width. */
            static OpenPopUpPage(url: string, callback: SP.UI.DialogReturnValueCallback, width: number, height: number): void;
            /** Displays a wait/loading modal dialog with the specified title, message, height and width. Height and width are defined in pixels. Cancel/close button is not shown. */
            static showWaitScreenWithNoClose(title: string, message: string, height: number, width: number): SP.UI.ModalDialog;
            /** Displays a wait/loading modal dialog with the specified title, message, height and width. Height and width are defined in pixels. Cancel button is shown. If user clicks it, the callbackFunc is called. */
            static showWaitScreenSize(title: string, message: string, callbackFunc: SP.UI.DialogReturnValueCallback, height: number, width: number): SP.UI.ModalDialog;
            static showPlatformFirstRunDialog(url: string, callbackFunc: SP.UI.DialogReturnValueCallback): SP.UI.ModalDialog;
            static get_childDialog: any;
            /** Closes the dialog using the specified dialog result. */
            close(dialogResult: SP.UI.DialogResult): void;
        }

    }
}