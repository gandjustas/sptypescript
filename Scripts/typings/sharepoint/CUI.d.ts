// Type definitions for SharePoint JSOM 
// Project: https://github.com/gandjustas/sptypescript
// Definitions by: Stanislav Vyshchepan <http://blog.gandjustas.ru>, Andrey Markeev <http://markeev.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace CUI {
    export namespace Page {
        export interface ICommandHandler { }

        export abstract class PageComponent implements ICommandHandler {
            init(): void;
        }
    }

    export class QueryRecord { }
    export class DeclarativeTemplateBuildContext { }
    export class CommandInformation { }
    export class DisabledCommandInfoProperties { }
    export class BuildOptions { }
    export class BuildContext { }
    export class DataNodeWrapper { }
    export class CommandEventArgs extends Sys.EventArgs { }
    export class DataQueryResult { }
    export class DataQuery { }
    export class DataSource implements IDataSource { }

    export class Builder implements Sys.IDisposable {
        dispose(): void;
    }

    export class RootProperties { }
    export class StandaloneRootProperties extends RootProperties { }
    export class ContextMenuRootProperties extends StandaloneRootProperties { }

    export class ControlProperties {
        Command: string;
        Id: string;
        Image16by16: string;
        Image16by16Class: string;
        Image16by16Left: number;
        Image16by16Top: number;
        LabelCss: string;
        LabelText: string;
        Sequence: number;
        TemplateAlias: string;
        ToolTipDescription: string;
        ToolTipHelpKeyWord: string;
        ToolTipImage32by32: string;
        ToolTipImage32by32Class: string;
        ToolTipImage32by32Left: string;
        ToolTipImage32by32Top: string;
        ToolTipSelectedItemTitle: string;
        ToolTipShortcutKey: string;
        ToolTipTitle: string;
        QueryCommand: string;
    }

    export class Component implements IMenuItem, Sys.IDisposable {
        get_root(): Component;
        getChild(id: string): Component;
        getChildByTitle(title: string): Component;
        addChild(child: Component): void;
        addChildAtIndex(child: Component, index: number): void;

        dispose(): void;
    }

    export class Root extends Component { }
    export class StandaloneRoot extends Root { }
    export class ScalableRoot extends Root { }
    export class Ribbon extends ScalableRoot { }
    export class ControlComponent extends Component { }

    export class RibbonComponent extends Component {
        get_ribbon(): Component;    
    }

    export class Section extends RibbonComponent {
        constructor(root: Component, id: string, type: number, position: number);
        getRow(index: number): Component;
    }

    export class Group extends RibbonComponent {
        Sequence: number;

        constructor(root: Component, id: string, title: string, description: string, command: string, param: string);
        selectLayout(title: string, layoutTitle?: string): void;
        get_selectedLayout(): Component;
    }

    export class Layout extends RibbonComponent {
        constructor(root: Component, id: string, title: string);
    }

    export class Menu extends Component {
        constructor(root: Component, id: string, param1?: any, param2?: any, param3?: any);
    }

    export class ContextMenu extends Menu { }

    export class MenuSection extends Component {
        constructor(root: Component, id: string, title?: string, description?: string, scrollable?: boolean, maxheight?: any, displayMode?: string);
    }

    export class Gallery extends Component {
        constructor(root: Component, id: string, title: string, description: string, properties: { ElementDimensions: string, Width: number, Command: string });
    }

    export enum GalleryElementDimensions {
        size16by16 = 1,
        size32by32 = 2,
        size48by48 = 3,
        size64by48 = 4,
        size72by96 = 5,
        size96by72 = 6,
        size96by96 = 7,
        size128by128 = 8,
        size190by30 = 9,
        size190by40 = 10,
        size190by50 = 11,
        size190by60 = 12,
        sizeCustom = 13
    }

    export interface IModalController { }
    export interface IMenuItem { }
    export interface ISelectableControl { }
    export interface IDataSource { }

    export class Control implements Sys.IDisposable, IMenuItem {
        constructor(root: Component, id: string, properties: ControlProperties);
        createComponentForDisplayMode(mode: string): Component;
        dispose(): void;
    }

    export class MenuLauncher extends Control implements IModalController { }
    export class ContextMenuLauncher extends MenuLauncher { }

    export namespace Controls {
        export class Button extends Control implements IMenuItem, ISelectableControl { }

        export class ToggleButton extends Control implements IMenuItem, ISelectableControl { }

        export class DropDown extends MenuLauncher {}

        export class ComboBox extends DropDown {
            constructor(root: Component, id: string, properties: ControlProperties, menu: any);
            set_menuItems(value: any): void;
        }

        export class GalleryButton extends Control implements ISelectableControl {
            constructor(root: Component, id: string, properties: any, dim?: any);
        }
    }
}