///<reference path="SP.d.ts" />

declare class SPClientPeoplePicker {
    static ValueName: string; // = 'Key';
    static DisplayTextName: string; // = 'DisplayText';
    static SubDisplayTextName: string; // = 'Title';
    static DescriptionName: string; // = 'Description';
    static SIPAddressName: string; // = 'SIPAddress';
    static SuggestionsName: string; // = 'MultipleMatches';
    static UnvalidatedEmailAddressKey: string; // = "UNVALIDATED_EMAIL_ADDRESS";
    static KeyProperty: string; // = 'AutoFillKey';
    static DisplayTextProperty: string; // = 'AutoFillDisplayText';
    static SubDisplayTextProperty: string; // = 'AutoFillSubDisplayText';
    static TitleTextProperty: string; // = 'AutoFillTitleText';
    static DomainProperty: string; // = 'DomainText';

    static SPClientPeoplePickerDict: {
        [pickerIelementId: string]: SPClientPeoplePicker;
    };

    static InitializeStandalonePeoplePicker(clientId: string, value: ISPClientPeoplePickerEntity[], schema: ISPClientPeoplePickerSchema): void;

    public TopLevelElementId: string;// '',
    public EditorElementId: string;//'',
    public AutoFillElementId: string;//'',
    public ResolvedListElementId: string;//'',
    public InitialHelpTextElementId: string;//'',
    public WaitImageId: string;//'',
    public HiddenInputId: string;//'',
    public AllowEmpty: boolean;//true,
    public ForceClaims: boolean;//false,
    public AutoFillEnabled: boolean;//true,
    public AllowMultipleUsers: boolean;//false,
    public OnValueChangedClientScript: (pickerElementId: string, users: ISPClientPeoplePickerEntity[]) => void;
    public OnUserResolvedClientScript: (pickerElementId: string, users: ISPClientPeoplePickerEntity[]) => void;
    public OnControlValidateClientScript: (pickerElementId: string, users: ISPClientPeoplePickerEntity[]) => void;
    public UrlZone: string;//null,
    public AllUrlZones: boolean;//false,
    public SharePointGroupID: number;//0,
    public AllowEmailAddresses: boolean;//false,
    public PPMRU: SPClientPeoplePickerMRU;
    public UseLocalSuggestionCache: boolean;//true,
    public CurrentQueryStr: string;//'',
    public LatestSearchQueryStr: string;// '',
    public InitialSuggestions: ISPClientPeoplePickerEntity[];
    public CurrentLocalSuggestions: ISPClientPeoplePickerEntity[];
    public CurrentLocalSuggestionsDict: ISPClientPeoplePickerEntity;
    public VisibleSuggestions: number;//5,
    public PrincipalAccountType: string;//'',
    public PrincipalAccountTypeEnum: SP.Utilities.PrincipalType;
    public EnabledClaimProviders: string;//'',
    public SearchPrincipalSource: SP.Utilities.PrincipalSource;//null,
    public ResolvePrincipalSource: SP.Utilities.PrincipalSource;//null,
    public MaximumEntitySuggestions: number;//30,
    public EditorWidthSet: boolean;//false,
    public QueryScriptInit: boolean;//false,
    public AutoFillControl: string;//null,
    public TotalUserCount: number;//0,
    public UnresolvedUserCount: number;//0,
    public UserQueryDict: ISPClientPeoplePickerEntity;
    public ProcessedUserList: ISPClientPeoplePickerEntity;
    public HasInputError: boolean;//false,
    public HasServerError: boolean;//false,
    public ShowUserPresence: boolean;//true,
    public TerminatingCharacter: string;//';',
    public UnresolvedUserElmIdToReplace: string;//'',
    public WebApplicationID: SP.Guid;//'{00000000-0000-0000-0000-000000000000}',

    public GetAllUserInfo(): ISPClientPeoplePickerEntity[];
}

interface ISPClientPeoplePickerSchema {
    TopLevelElementId?: string;
    EditorElementId?: string;
    AutoFillElementId?: string;
    ResolvedListElementId?: string;
    InitialHelpTextElementId?: string;
    WaitImageId?: string;
    HiddenInputId?: string;

    AllowMultipleValues?: boolean;
    Required?: boolean;
    AutoFillEnabled?: boolean;
    ForceClaims?: boolean;
    AllowEmailAddresses?: boolean;
    AllUrlZones?: boolean;
    UseLocalSuggestionCache?: boolean;
    UserNoQueryPermission?: boolean;

    VisibleSuggestions?: number;
    MaximumEntitySuggestions?: number;

    ErrorMessage?: string;
    InitialHelpText?: string;

    InitialSuggestions?: ISPClientPeoplePickerEntity[];


    UrlZone?: SP.UrlZone;
    WebApplicationID?: SP.Guid;
    SharePointGroupID?: number;

    /** Specify User, DL, SecGroup or SPGroup*/
    PrincipalAccountType?: string;

    EnabledClaimProvider?: string;
    ResolvePrincipalSource?: SP.Utilities.PrincipalSource;
    SearchPrincipalSource?: SP.Utilities.PrincipalSource;

    OnUserResolvedClientScript?: (pickerElementId: string, users: ISPClientPeoplePickerEntity[]) => void;
    OnValueChangedClientScript?: (pickerElementId: string, users: ISPClientPeoplePickerEntity[]) => void;

    /** Number or '100%'*/
    Width?: any;

    Rows?: number;

}

declare class SPClientPeoplePickerMRU {
    static PPMRUVersion: number;// = 1;
    static MaxPPMRUItems: number;// = 200;
    static PPMRUDomLocalStoreKey: string;// = "ClientPeoplePickerMRU";
    static GetSPClientPeoplePickerMRU(): SPClientPeoplePickerMRU;

    GetItems(strKey: string): Object[];
    SetItem(strSearchTerm: string, objEntity: Object): void;
    ResetCache(): void;
}

interface ISPClientPeoplePickerEntity {
    Key?: string;
    Description?: string;
    DisplayText?: string;
    EntityType?: string;
    ProviderDisplayName?: string;
    ProviderName?: string;
    IsResolved?: boolean;
    EntityData?: {
        Title: string;
        MobilePhone: string;
        Department: string;
        Email: string;
    };
    MultipleMatches: Object[];
    DomainText?: string;
    [key: string]: any;
}