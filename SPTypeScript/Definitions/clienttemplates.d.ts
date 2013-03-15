///<reference path="SP.d.ts" />

declare module SPClientTemplates {

    export enum FileSystemObjectType {
        Invalid = -1,
        File = 0,
        Folder = 1,
        Web = 2
    }
    export enum ChoiceFormatType {
        Dropdown = 0,
        Radio = 1
    }

    export enum ClientControlMode {
        Invalid = 0,
        DisplayForm = 1,
        EditForm = 2,
        NewForm = 3,
        View = 4
    }

    export enum RichTextMode {
        Compatible = 0,
        FullHtml = 1,
        HtmlAsXml = 2,
        ThemeHtml = 3
    }
    export enum UrlFormatType {
        Hyperlink = 0,
        Image = 1
    };

    export enum DateTimeDisplayFormat {
        DateOnly = 0,
        DateTime = 1,
        TimeOnly = 2
    };

    export enum DateTimeCalendarType {
        None = 0,
        Gregorian = 1,
        Japan = 3,
        Taiwan = 4,
        Korea = 5,
        Hijri = 6,
        Thai = 7,
        Hebrew = 8,
        GregorianMEFrench = 9,
        GregorianArabic = 10,
        GregorianXLITEnglish = 11,
        GregorianXLITFrench = 12,
        KoreaJapanLunar = 14,
        ChineseLunar = 15,
        SakaEra = 16,
        UmAlQura = 23
    };
    export enum UserSelectionMode {
        PeopleOnly = 0,
        PeopleAndGroups = 1
    }

    /** Represents schema for a Choice field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Choice extends FieldSchema_InForm {
        /** List of choices for this field. */
        Choices: string[];
        /** Display format for the choice field */
        FormatType: ChoiceFormatType;
    }
    /** Represents schema for a Lookup field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Lookup extends FieldSchema_InForm {
        /** Specifies if the field allows multiple values */
        AllowMultipleValues: bool;
        /** Returns base url for a list display form, e.g. "http://portal/web/_layouts/15/listform.aspx?PageType=4"
            You must add "ListId" (Guid of the list) and "ID" (integer Id of the item) parameters in order to use this Url */
        BaseDisplayFormUrl: string;
        /** Indicates if the field is a dependent lookup */
        DependentLookup: bool;
        /** Indicates wherever the lookup list is throttled (contains more items than value of the "List Throttle Limit" setting). */
        Throttled: bool;
        /** Returns string representation of a number that represents the current value for the "List Throttle Limit" web application setting.
            Only appears if Throttled property is true, i.e. the target lookup list is throttled. */
        MaxQueryResult: string;
        /** List of choices for this field.
            For a lookup field, contains array of possible values pulled from the target lookup list. */
        Choices: string[];
        /** Number of choices. Appears only for Lookup field. */
        ChoiceCount: number;
    }
    /** Represents schema for a DateTime field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_DateTime extends FieldSchema_InForm {
        /** Type of calendar to use */
        CalendarType: DateTimeCalendarType;
        /** Display format for DateTime field. */
        DisplayFormat: DateTimeDisplayFormat;
        /** Indicates wherever current user regional settings specify to display week numbers in day or week views of a calendar.
            Only appears for DateTime fields. */
        ShowWeekNumber: bool;
        TimeSeparator: string;
        TimeZoneDifference: string;
        FirstDayOfWeek: number;
        FirstWeekOfYear: number;
        HijriAdjustment: number;
        WorkWeek: string;
        LocaleId: string;
        LanguageId: string;
        MinJDay: number;
        MaxJDay: number;
        HoursMode24: bool;
        HoursOptions: string[];
    }
    /** Represents schema for a DateTime field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Geolocation extends FieldSchema_InForm {
        BingMapsKey: string;
        IsBingMapBlockedInCurrentRegion: bool;
    }
    /** Represents schema for a Choice field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_MultiChoice extends FieldSchema_InForm {
        /** List of choices for this field. */
        MultiChoices: string[];
        /** Indicates wherever fill-in choice is allowed */
        FillInChoice: bool;
    }
    /** Represents schema for a Choice field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_MultiLineText extends FieldSchema_InForm {
        /** Specifies whether rich text formatting can be used in the field */
        RichText: bool;
        /** Changes are appended to the existing text. */
        AppendOnly: bool;
        /** Rich text mode for the field */
        RichTextMode: RichTextMode;
        /** Number of lines configured to display */
        NumberOfLines: number;
        /** A boolean value that specifies whether hyperlinks can be used in this fields. */
        AllowHyperlink: bool;
        /** WebPartAdderId for the ScriptEditorWebPart */
        ScriptEditorAdderId: string;
    }
    /** Represents schema for a Number field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Number extends FieldSchema_InForm {
        ShowAsPercentage: bool;
    }
    /** Represents schema for a Number field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Text extends FieldSchema_InForm {
        MaxLength: number;
    }
    /** Represents schema for a Number field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_Url extends FieldSchema_InForm {
        DisplayFormat: UrlFormatType;
    }
    /** Represents schema for a Number field in list form or in list view in grid mode */
    export interface FieldSchema_InForm_User extends FieldSchema_InForm {
        Presence: bool;
        WithPicture: bool;
        DefaultRender: bool;
        WithPictureDetail: bool;
        /** Server relative Url for ~site/_layouts/listform.aspx */
        ListFormUrl: string;
        /** Server relative Url for ~site/_layouts/userdisp.aspx */
        UserDisplayUrl: string;
        EntitySeparator: string;
        PictureOnly: bool;
        PictureSize: string;
    }
    /** Represents field schema in Grid mode and on list forms.
        Consider casting objects of this type to more specific field types, e.g. FieldSchemaInForm_Lookup */
    export interface FieldSchema_InForm {
        /** Specifies if the field can be edited while list view is in the Grid mode */
        AllowGridEditing: bool;
        /** Description for this field. */
        Description: string;
        /** Direction of the reading order for the field. */
        Direction: string;
        /** String representation of the field type, e.g. "Lookup". Same as SPField.TypeAsString */
        FieldType: string;
        /** Indicates whether the field is hidden */
        Hidden: bool;
        /** Guid of the field */
        Id: string;
        /** Specifies Input Method Editor (IME) mode bias to use for the field.
            The IME enables conversion of keystrokes between languages when one writing system has more characters than can be encoded for the given keyboard. */
        IMEMode: any;
        /** Internal name of the field */
        Name: string;
        /** Specifies if the field is read only */
        ReadOnlyField: bool;
        /** Specifies wherever field requires values */
        Required: bool;
        RestrictedMode: bool;
        /** Title of the field */
        Title: string;
        /** For OOTB fields, returns the type of field. For "UserMulti" returns "User", for "LookupMulti" returns "Lookup".
            For custom field types, returns base type of the field. */
        Type: string;
        /** If SPFarm.Local.UseMinWidthForHtmlPicker is true, UseMinWidth will be set to true. Undefined in other cases. */
        UseMinWidth: bool;
    }
    export interface ListSchema_InForm {
        Field: FieldSchema_InForm[];
    }
    export interface ListData_InForm {
        Items: Item[];
    }
    export interface RenderContext_FieldInForm extends RenderContext_Form {
        CurrentGroupIdx: number;
        CurrentGroup: Group;
        CurrentItems: Item[];
        CurrentFieldSchema: FieldSchema_InForm;
        CurrentFieldValue: any;
    }
    export interface RenderContext_Form extends RenderContext {
        FieldControlsModes: { [fieldInternalName: string]: ClientControlMode; };
        FormContext: any;
        FormUniqueId: string;
        ListData: ListData_InForm;
        ListSchema: ListSchema_InForm;
    }


    /** Represents field schema in a list view. */
    export interface FieldSchema_InView {
        Name: string;
        DisplayName: string;
        FieldType: string;
        /** Either "TRUE" or "FALSE" */
        Filterable: string;
        /** Guid of the field */
        ID: string;
        Type: string;
        RealFieldName: string;
        /** Either "TRUE" or "FALSE" */
        AllowGridEditing: string;
        /** Either "TRUE" or "FALSE" */
        CalloutMenu: string;
        ClassInfo: string;
        /** Either "TRUE" or "FALSE" */
        Explicit: string;
        /** Either "TRUE" or "FALSE" */
        GroupField: string;
        css: string;
        fieldRenderer: any;
        FieldTitle: string;
        /** Either "TRUE" or "FALSE" */
        ReadOnly: string;
        /** Either "TRUE" or "FALSE" */
        GridActiveAndReadOnly: string;
        ResultType: string;
    }
    export interface ListSchema_InView {
        Aggregate: { [name: string]: string; };
        /** Either "TRUE" or false (for grouping) */
        Collapse: string;
        /** Either "0" or "1" */
        DefaultItemOpen: string;
        Direction: string;
        EffectivePresenceEnabled: any;
        /** If in grid mode (context.inGridMode == true), cast to FieldSchema_InForm[], otherwise cast to FieldSchema_InView[] */
        Field: any[];
        FieldSortParam: string;
        Filter: any;
        /** Either "0" or "1" */
        ForceCheckout: string;
        /** Internal name for the first group by field, if any */
        group1: string;
        /** Internal name for the second group by field, if any */
        group2: string;
        /** "1" if the view contains "Title" field, otherwise not defined. */
        HasTitle: string;
        HttpVDir: string;
        /** Either "0" or "1" */
        InplaceSearchEnabled: string;
        /** Either "0" or "1" */
        IsDocLib: string;
        /** e.g. "1033" */
        LCID: string;
        /** Either "0" or "1" */
        ListRight_AddListItems: string;
        NoListItem: string;
        NoListItemHowTo: string;
        /** Server-relative path to the current page */
        PagePath: string;
        /** Internal name of the field inside which the hierarchy buttons are displayed */
        ParentHierarchyDisplayField: string;
        PresenceAlt: string;
        /** Represents SPList.RootFolder.Properties. Exists only if SPList.FetchPropertyBagForListView property is set to true. */
        PropertyBag: { [key: string]: string; };
        /** Either "True" or "False" */
        RenderSaveAsNewViewButton: string;
        /** Either "True" or "False" */
        RenderViewSelectorPivotMenu: string;
        /** Either "True" or "False" */
        RenderViewSelectorPivotMenuAsync: string;
        RootFolderParam: string;
        SelectedID: string; // number
        ShowWebPart: string;
        /** Either "1" or undefined. */
        StrikeThroughOnCompletedEnabled: string;
        /** Either "0" or "1" */
        TabularView: string;
        Toolbar: string;
        UIVersion: string; // number
        Userid: string; // number
        UserVanilla: any;
        UserDispUrl: any;
        /** Either "1" or "" */
        UseParentHierarchy: string;
        /** Guid of the view */
        View: string;
        /** JSON string */
        ViewSelectorPivotMenuOptions: string;
        ViewSelector_ViewParameters: string;
    }
    export interface ListData_InView {
        FilterLink: string;
        FilterFields: string;
        FirstRow: number;
        /** Either "0" or "1" */
        ForceNoHierarchy: string;
        HierarchyHasIndention: string;
        /** Link to the previous page (not defined if not available) */
        PrevHref: string;
        /** Link to the next page  (not defined if not available) */
        NextHref: string;
        SortField: string;
        SortDir: string;
        LastRow: number;
        Row: Item[];
    }
    export interface RenderContext_GroupInView extends RenderContext_InView {
        CurrentGroupIdx: number;
        CurrentGroup: Group;
        CurrentItems: Item[];
    }
    export interface RenderContext_InView extends RenderContext {
        AllowCreateFolder: bool;
        AllowGridMode: bool;
        BasePermissions: { [PermissionName: string]: bool; }; // SP.BasePermissions?
        bInitialRender: bool;
        CanShareLinkForNewDocument: bool;
        CascadeDeleteWarningMessage: string;
        clvp: HTMLElement; // not in View
        ContentTypesEnabled: bool;
        ctxId: number;
        ctxType: any; // not in View
        CurrentUserId: number;
        CurrentUserIsSiteAdmin: bool;
        dictSel: any;
        /** Absolute path for the list display form */
        displayFormUrl: string;
        /** Absolute path for the list edit form */
        editFormUrl: string;
        EnableMinorVersions: bool;
        ExternalDataList: bool;
        enteringGridMode: bool;
        existingServerFilterHash: any;
        HasRelatedCascadeLists: number;
        HttpPath: string;
        HttpRoot: string;
        imagesPath: string;
        inGridFullRender: any; // not in View
        inGridMode: bool;
        IsAppWeb: bool;
        IsClientRendering: bool;
        isForceCheckout: bool;
        isModerated: bool;
        isPortalTemplate: any;
        isWebEditorPreview: number;
        isVersions: number;
        isXslView: bool;
        LastRowIndexSelected: any; // not in View
        LastSelectableRowIdx: any;
        LastSelectedItemId: any; // not in View
        leavingGridMode: bool;
        listBaseType: number;
        ListData: ListData_InView;
        ListDataJSONItemsKey: string; // ="Row"
        /** Guid of the list */
        listName: string;
        ListSchema: ListSchema_InView;
        listTemplate: string;
        ListTitle: string;
        listUrlDir: string;
        loadingAsyncData: bool;
        ModerationStatus: number;
        NavigateForFormsPages: bool;
        /** Absolute path for the list new form */
        newFormUrl: string;
        NewWOPIDocumentEnabled: any;
        NewWOPIDocumentUrl: any;
        noGroupCollapse: bool;
        OfficialFileName: string;
        OfficialFileNames: string;
        overrideDeleteConfirmation: string; // not in View
        overrideFilterQstring: string; // not in View
        PortalUrl: string;
        queryString: any;
        recursiveView: bool;
        /** either 1 or 0 */
        RecycleBinEnabled: number;
        RegionalSettingsTimeZoneBias: string;
        rootFolder: string;
        rootFolderForDisplay: any;
        RowFocusTimerID: any;
        SelectAllCbx: any;
        SendToLocationName: string;
        SendToLocationUrl: string;
        serverUrl: any;
        SiteTitle: string;
        StateInitDone: bool;
        TableCbxFocusHandler: any;
        TableMouseOverHandler: any;
        TotalListItems: any;
        verEnabled: number;
        /** Guid of the view. */
        view: string;
        viewTitle: string;
        WorkflowAssociated: bool;
        wpq: string;
        WriteSecurity: string;
    }
    export interface RenderContext_ItemInView extends RenderContext_InView {
        CurrentItem: Item;
        CurrentItemIdx: number;
    }
    export interface RenderContext_FieldInView extends RenderContext_ItemInView {
        /** If in grid mode (context.inGridMode == true), cast to FieldSchema_InForm, otherwise cast to FieldSchema_InView */
        CurrentFieldSchema: any;
        CurrentFieldValue: any;
        FieldControlsModes: { [fieldInternalName: string]: ClientControlMode; };
        FormContext: any;
        FormUniqueId: string;
    }

    export interface Item {
        [fieldInternalName: string]: any;
    }
    export interface Group {
        Items: Item[];
    }

    export interface RenderContext {
        BaseViewID: number;
        ControlMode: ClientControlMode;
        CurrentCultureName: string;
        CurrentLanguage: number;
        CurrentSelectedItems: any;
        CurrentUICultureName: string;
        ListTemplateType: number;
        OnPostRender: any;
        OnPreRender: any;
        onRefreshFailed: any;
        RenderBody: (renderContext: RenderContext) => string;
        RenderFieldByName: (renderContext: RenderContext) => string;
        RenderFields: (renderContext: RenderContext) => string;
        RenderFooter: (renderContext: RenderContext) => string;
        RenderGroups: (renderContext: RenderContext) => string;
        RenderHeader: (renderContext: RenderContext) => string;
        RenderItems: (renderContext: RenderContext) => string;
        RenderView: (renderContext: RenderContext) => string;
        SiteClientTag: string;
        Templates: TemplateOverrides;
    }

    export interface SingleTemplateCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_InView): string;
    }
    export interface GroupCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_GroupInView): string;
    }
    export interface ItemCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_ItemInView): string;
    }
    export interface FieldInFormCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_FieldInForm): string;
    }
    export interface FieldInViewCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
        (renderContext: RenderContext_FieldInView): string;
    }

    export interface FieldTemplateOverrides {
        /** Defines templates for rendering the field on a display form. */
        DisplayForm?: FieldInFormCallback;
        /** Defines templates for rendering the field on an edit form. */
        EditForm?: FieldInFormCallback;
        /** Defines templates for rendering the field on a new form. */
        NewForm?: FieldInFormCallback;
        /** Defines templates for rendering the field on a list view. */
        View?: FieldInViewCallback;
    }

    export interface FieldTemplateMap {
        [fieldInternalName: string]: FieldTemplateOverrides;
    }

    export interface TemplateOverrides {
        View?: (renderContext: any) => string; // TODO: determine appropriate context type and purpose of this template
        Body?: (renderContext: any) => string; // TODO: determine appropriate context type and purpose of this template 
        /** Defines templates for rendering groups (aggregations). */
        Group?: GroupCallback;
        /** Defines templates for list items rendering. */
        Item?: ItemCallback;
        /** Defines template for rendering list view header.
			Can be either string or SingleTemplateCallback */
        Header?: SingleTemplateCallback;
        /** Defines template for rendering list view footer.
			Can be either string or SingleTemplateCallback */
        Footer?: SingleTemplateCallback;
        /** Defines templates for fields rendering. The field is specified by it's internal name. */
        Fields: FieldTemplateMap;
    }
    export interface TemplateOverridesOptions {
        /** Template overrides */
        Templates?: TemplateOverrides;

        /** Ñallbacks called before rendering starts. Can be function (ctx: RenderContext) => void or array of functions.*/
        OnPreRender?: any;

        /** Ñallbacks called after rendered html inserted into DOM. Can be function (ctx: RenderContext) => void or array of functions.*/
        OnPostRender?: any;

        /** View style (SPView.StyleID) for which the templates should be applied. 
            If not defined, the templates will be applied only to default view style. */
        ViewStyle?: number;
        /** List template type (SPList.BaseTemplate) for which the template should be applied. 
            If not defined, the templates will be applied to all lists. */
        ListTemplateType?: number;
        /** Base view ID (SPView.BaseViewID) for which the template should be applied.
            If not defined, the templates will be applied to all views. */
        BaseViewID?: number;
    }
    export class TemplateManager {
        static RegisterTemplateOverrides(renderCtx: TemplateOverridesOptions): void;
    }

    export interface ClientUserValue {
        lookupId: number;
        lookupValue: string;
        displayStr: string;
        email: string;
        sip: string;
        title: string;
        picture: string;
        department: string;
        jobTitle: string;
    }
    export interface ClientLookupValue {
        LookupId: number;
        LookupValue: string;
    }
    export interface ClientUrlValue {
        URL: string;
        Description: string;
    }
    export class Utility {
        static ComputeRegisterTypeInfo(renderCtx: TemplateOverridesOptions): any;
        static ControlModeToString(mode: SPClientTemplates.ClientControlMode): string;
        static FileSystemObjectTypeToString(fileSystemObjectType: SPClientTemplates.FileSystemObjectType): string;
        static ChoiceFormatTypeToString(fileSystemObjectType: SPClientTemplates.ChoiceFormatType): string;
        static RichTextModeToString(fileSystemObjectType: SPClientTemplates.RichTextMode): string;
        static IsValidControlMode(mode: number): bool;
        /** Removes leading and trailing spaces */
        static Trim(str: string): string;
        /** Creates SP.ClientContext based on the specified Web URL. If the SP.Runtime.js script is not loaded, returns null */
        static InitContext(webUrl: string): SP.ClientContext;
        static GetControlOptions(control: HTMLElement): any;
        static TryParseInitialUserValue(userStr: string): ClientUserValue[];
        /** Tries to resolve user names from string. Pushes either ClientUserValue (if resolved successfully) or original string (if not) to the resulting array. */
        static TryParseUserControlValue(userStr: string, separator: string): any[];
        static GetPropertiesFromPageContextInfo(context: RenderContext): void;
        /** Replaces tokens "~site/", "~sitecollection/", "~sitecollectionmasterpagegallery", "{lcid}", "{locale}" and "{siteclienttag}" with appropriate context values */
        static ReplaceUrlTokens(tokenUrl: string): string;
        static ParseLookupValue(valueStr: string): ClientLookupValue;
        static ParseMultiLookupValues(valueStr: string): ClientLookupValue[];
        /** Represents lookup values array in some strange format */
        static BuildLookupValuesAsString(choiceArray: ClientLookupValue[], isMultiLookup: bool, setGroupDesc: bool): string;
        static ParseURLValue(value: string): ClientUrlValue;
        static GetFormContextForCurrentField(context: RenderContext_Form): any; // returns ClientFormContext from clientforms.js
    }

}

declare function GenerateIID(renderCtx: SPClientTemplates.RenderContext_ItemInView): string;
declare function GenerateIIDForListItem(renderCtx: SPClientTemplates.RenderContext_InView, listItem: SPClientTemplates.Item): string;

