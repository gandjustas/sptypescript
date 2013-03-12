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
	export interface RenderContextFieldInViewSchema {
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
	export interface RenderContextFieldInFormSchema {
		AllowGridEditing: bool;
		AllowHyperlink: bool;
		AppendOnly: bool;
		Description: string;
		Direction: string;
		FieldType: string;
		Hidden: bool;
		/** Guid of the field */
		Id: string;
		IMEMode: any;
		Name: string;
		NumberOfLines: number;
		ReadOnlyField: bool;
		Required: bool;
		RestrictedMode: bool;
		RichText: bool;
		RichTextMode: RichTextMode;
		/** Guid */
		ScriptEditorAdderId: string;
		Title: string;
		Type: string;
	}
	export interface RenderContextListSchemaInForm{
		Field: RenderContextFieldInFormSchema[];
	}
	export interface RenderContextListSchema{	
		/** Either "0" or "1" */
		DefaultItemOpen: string;
		Direction: string;
		Field: RenderContextFieldInViewSchema[];
		FieldSortParam: string;
		/** Either "0" or "1" */
		ForceCheckout: string;
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
		/** Either "True" or "False" */
		RenderSaveAsNewViewButton: string;
		/** Either "True" or "False" */
		RenderViewSelectorPivotMenu: string;
		RootFolderParam: string;
		SelectedID: string; // number
		ShowWebPart: string;
		/** Either "0" or "1" */
		TabularView: string;
		Toolbar: string;
		UIVersion: string; // number
		Userid: string; // number
		/** Guid of the view */
		View: string;
		/** JSON string */
		ViewSelectorPivotMenuOptions: string;
	}
	export interface RenderContextItem{
		[fieldInternalName:string]: any;
	}
	export interface RenderContextListData{
		FilterLink: string;
		FirstRow: number;
		/** Either "0" or "1" */
		ForceNoHierarchy: string;
		HierarchyHasIndention: string;
		LastRow: number;
		Row: RenderContextItem[];
	}
	export interface RenderContextListDataInForm{
		Items: RenderContextItem[];
	}
	export interface RenderContextGroup {
		Items: RenderContextItem[];
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
	export interface ListViewRenderContext extends RenderContext {
		AllowCreateFolder: bool;
		AllowGridMode: bool;
		BasePermissions: any; // SP.BasePermissions?
		bInitialRender: bool;
		CanShareLinkForNewDocument: bool;
		CascadeDeleteWarningMessage: string;
		clvp: HTMLElement;
		ContentTypesEnabled: bool;
		ctxId: number;
		ctxType: any;
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
		ImagesPath: string;
		inGridFullRender: any;
		inGridMode: bool;
		IsAppWeb: bool;
		IsClientRendering: bool;
		isForceCheckout: bool;
		isModerated: bool;
		isPortalTemplate: any;
		isWebEditorPreview: number;
		isVersions: number;
		isXslView: bool;
		LastRowIndexSelected: any;
		LastSelectableRowIdx: any;
		LastSelectedItemId: any;
		leavingGridMode: bool;
		listBaseType: number;
		ListData: RenderContextListData;
		ListDataJSONItemsKey: string;
		/** Guid of the list */
		listName: string;
		ListSchema: RenderContextListSchema;
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
		overrideDeleteConfirmation: string;
		overrideFilterQstring: string;
		PortalUrl: string;
		queryString: any;
		recursiveView: bool;
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
	export interface ItemRenderContext extends ListViewRenderContext {
		CurrentItem: RenderContextItem;
		CurrentItemIdx: number;
	}
	export interface FieldInViewRenderContext extends ItemRenderContext {
		CurrentFieldSchema: RenderContextFieldInViewSchema;
		CurrentFieldValue: any;
		FieldControlsModes: { [fieldInternalName:string]:ClientControlMode; };
		FormContext: any;
		FormUniqueId: string;
	}
	export interface GroupRenderContext extends ListViewRenderContext {
		CurrentGroupIdx: number;
		CurrentGroup: RenderContextGroup;
		CurrentItems: RenderContextItem[];
	}
	export interface ListFormRenderContext extends RenderContext {
		FieldControlsModes: { [fieldInternalName:string]:ClientControlMode; };
		FormContext: any;
		FormUniqueId: string;
		ListData: RenderContextListDataInForm;
		ListSchema: RenderContextListSchemaInForm;
	}
	export interface FieldInFormRenderContext extends RenderContext {
		CurrentGroupIdx: number;
		CurrentGroup: RenderContextGroup;
		CurrentItems: RenderContextItem[];
		CurrentFieldSchema: RenderContextFieldInFormSchema;
		CurrentFieldValue: any;
	}
	
	export interface SingleTemplateCallback {
        /** Must return null in order to fall back to a more common template or to a system default template */
	    (renderContext: ListViewRenderContext): string;
	}
	export interface ItemCallback {
		/** Must return null in order to fall back to a more common template or to a system default template */
		(renderContext: ItemRenderContext): string;
	}
	export interface FieldInFormCallback {
		/** Must return null in order to fall back to a more common template or to a system default template */
		(renderContext: FieldInFormRenderContext): string;
	}
	export interface FieldInViewCallback {
		/** Must return null in order to fall back to a more common template or to a system default template */
		(renderContext: FieldInViewRenderContext): string;
	}
	
	export interface FieldTemplateOverrides {
        /** Defines templates for rendering the field on a display form. */
		DisplayForm ?: any;
        /** Defines templates for rendering the field on an edit form. */
		EditForm?: any;
        /** Defines templates for rendering the field on a new form. */
		NewForm?: any;
        /** Defines templates for rendering the field on a list view. */
		View?: any;
	}

	export interface FieldTemplateMap {
	    [fieldInternalName: string]: FieldTemplateOverrides;
	}
	
    export interface TemplateOverrides {
        View?: any;
        Body?: any;
        /** Defines templates for rendering groups (aggregations). */
        Group?: any;
        /** Defines templates for list items rendering. */
        Item? : any;
		/** Defines template for rendering list view header.
			Can be either string or SingleTemplateCallback */
        Header?: any;
		/** Defines template for rendering list view footer.
			Can be either string or SingleTemplateCallback */
        Footer?: any;
        /** Defines templates for fields rendering. The field is specified by it's internal name. */
        Fields: FieldTemplateMap;
    }
    export interface TemplateOverridesOptions {
        Templates: TemplateOverrides;
        OnPreRender ?: any;
        OnPostRender ?: any;

        /** Array of view styles (SPView.StyleID) for which the templates should be applied. 
            If not defined, the templates will be applied only to default view style.
            Value for this property can be number, string or array of strings. */
        ViewStyle ?: any;
        /** Array of list template types (SPList.BaseTemplate) for which the template should be applied. 
            If not defined, the templates will be applied to all lists.
            Value for this property can be number, string or array of strings. */
        ListTemplateType: number;
        /** Array of base view IDs (SPView.BaseViewID) for which the template should be applied.
            If not defined, the templates will be applied to all views.
            Value for this property can be number, string or array of strings.*/
        BaseViewID: number;
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
        static GetFormContextForCurrentField(context: ListFormRenderContext): any; // returns ClientFormContext from clientforms.js
    }

}
