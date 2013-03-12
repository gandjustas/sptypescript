/// <reference path="MicrosoftAjax.d.ts"/>

declare interface IEnumerator {
    get_current(): any;
    moveNext(): bool;
    reset(): void;
}

declare interface IEnumerable {
    getEnumerator(): IEnumerator;
}

declare module SP {
    export class ScriptUtility {
        static isNullOrEmptyString(str: string): bool;
        static isNullOrUndefined(obj: any): bool;
        static isUndefined(obj: any): bool;
        static truncateToInt(n: number): number;
    }
    export class Guid {
        constructor(guidText: string);
        static get_empty(): SP.Guid;
        static newGuid(): SP.Guid;
        static isValid(uuid: string): bool;
        toString(): string;
        toString(format: string): string;
        equals(uuid: SP.Guid): bool;
        toSerialized(): string;
    }
    export enum PermissionKind {
        emptyMask,
        viewListItems,
        addListItems,
        editListItems,
        deleteListItems,
        approveItems,
        openItems,
        viewVersions,
        deleteVersions,
        cancelCheckout,
        managePersonalViews,
        manageLists,
        viewFormPages,
        anonymousSearchAccessList,
        open,
        viewPages,
        addAndCustomizePages,
        applyThemeAndBorder,
        applyStyleSheets,
        viewUsageData,
        createSSCSite,
        manageSubwebs,
        createGroups,
        managePermissions,
        browseDirectories,
        browseUserInfo,
        addDelPrivateWebParts,
        updatePersonalWebParts,
        manageWeb,
        anonymousSearchAccessWebLists,
        useClientIntegration,
        useRemoteAPIs,
        manageAlerts,
        createAlerts,
        editMyUserInfo,
        enumeratePermissions,
        fullMask,
    }
}


declare module SP {
    export class BaseCollection implements IEnumerable {
        getEnumerator(): IEnumerator;
        get_count(): number;
        itemAtIndex(index: number): any;
        constructor();
    }
    export interface IFromJson {
        fromJson(initValue: any): void;
        customFromJson(initValue: any): bool;
    }
    export class Base64EncodedByteArray {
        constructor();
        constructor(base64Str: string);
        get_length(): number;
        toBase64String(): string;
        append(b: any): void;
        getByteAt(index: number): any;
        setByteAt(index: number, b: any): void;
    }
    export class ConditionalScopeBase {
        startScope(): any;
        startIfTrue(): any;
        startIfFalse(): any;
        get_testResult(): bool;
        fromJson(initValue: any): void;
        customFromJson(initValue: any): bool;
    }
    export class ClientObjectPropertyConditionalScope extends SP.ConditionalScopeBase {
        constructor(clientObject: SP.ClientObject, propertyName: string, comparisonOperator: string, valueToCompare: any);
        constructor(clientObject: SP.ClientObject, propertyName: string, comparisonOperator: string, valueToCompare: any, allowAllActions: bool);
    }
    export class ClientResult {
        get_value(): any;
        setValue(value: any): void;
        constructor();
    }
    export class BooleanResult {
        get_value(): bool;
        constructor();
    }
    export class CharResult {
        get_value(): any;
        constructor();
    }
    export class IntResult {
        get_value(): number;
        constructor();
    }
    export class DoubleResult {
        get_value(): number;
        constructor();
    }
    export class StringResult {
        get_value(): string;
        constructor();
    }
    export class DateTimeResult {
        get_value(): Date;
        constructor();
    }
    export class GuidResult {
        get_value(): SP.Guid;
        constructor();
    }
    export class JsonObjectResult {
        get_value(): any;
        constructor();
    }
    export class ClientDictionaryResultHandler {
        constructor(dict: SP.ClientResult);
    }
    export class ClientUtility {
        static urlPathEncodeForXmlHttpRequest(url: string): string;
        static getOrCreateObjectPathForConstructor(context: SP.ClientRuntimeContext, typeId: string, args: any[]): SP.ObjectPath;
    }
    export class XElement {
        get_name(): string;
        set_name(value: string): void;
        get_attributes(): any;
        set_attributes(value: any): void;
        get_children(): any;
        set_children(value: any): void;
        constructor();
    }
    export class ClientXElement {
        get_element(): SP.XElement;
        set_element(value: SP.XElement): void;
        constructor();
    }
    export class ClientXDocument {
        get_root(): SP.XElement;
        set_root(value: SP.XElement): void;
        constructor();
    }
    export class DataConvert {
        static writePropertiesToXml(writer: SP.XmlWriter, obj: any, propNames: string[], serializationContext: SP.SerializationContext): void;
        static populateDictionaryFromObject(dict: any, parentNode: any): void;
        static fixupTypes(context: SP.ClientRuntimeContext, dict: any): void;
        static populateArray(context: SP.ClientRuntimeContext, dest: any, jsonArrayFromServer: any): void;
        static fixupType(context: SP.ClientRuntimeContext, obj: any): any;
        static writeDictionaryToXml(writer: SP.XmlWriter, dict: any, topLevelElementTagName: string, keys: any, serializationContext: SP.SerializationContext): void;
        static writeValueToXmlElement(writer: SP.XmlWriter, objValue: any, serializationContext: SP.SerializationContext): void;
        static invokeSetProperty(obj: any, propName: string, propValue: any): void;
        static invokeGetProperty(obj: any, propName: string): any;
        static specifyDateTimeKind(datetime: Date, kind: SP.DateTimeKind): void;
        static getDateTimeKind(datetime: Date): SP.DateTimeKind;
        static createUnspecifiedDateTime(year: number, month: number, day: number, hour: number, minute: number, second: number, milliseconds: number): Date;
        static createUtcDateTime(milliseconds: number): Date;
        static createLocalDateTime(milliseconds: number): Date;
    }
    export interface IWebRequestExecutorFactory {
        createWebRequestExecutor(): Sys.Net.WebRequestExecutor;
    }
    export class PageRequestFailedEventArgs extends Sys.EventArgs {
        get_executor(): Sys.Net.WebRequestExecutor;
        get_errorMessage(): string;
        get_isErrorPage(): bool;
    }
    export class PageRequestSucceededEventArgs extends Sys.EventArgs {
        get_executor(): Sys.Net.WebRequestExecutor;
    }
    export class PageRequest {
        get_request(): Sys.Net.WebRequest;
        get_url(): string;
        set_url(value: string): void;
        get_expectedContentType(): string;
        set_expectedContentType(value: string): void;
        post(body: string): void;
        get(): void;
        static doPost(url: string, body: string, expectedContentType: string, succeededHandler: (sender: any, args: SP.PageRequestSucceededEventArgs) => void, failedHandler: (sender: any, args: SP.PageRequestFailedEventArgs) => void): void;
        static doGet(url: string, expectedContentType: string, succeededHandler: (sender: any, args: SP.PageRequestSucceededEventArgs) => void, failedHandler: (sender: any, args: SP.PageRequestFailedEventArgs) => void): void;
        add_succeeded(value: (sender: any, args: SP.PageRequestSucceededEventArgs) => void): void;
        remove_succeeded(value: (sender: any, args: SP.PageRequestSucceededEventArgs) => void): void;
        add_failed(value: (sender: any, args: SP.PageRequestFailedEventArgs) => void): void;
        remove_failed(value: (sender: any, args: SP.PageRequestFailedEventArgs) => void): void;
        constructor();
    }
    export class ResResources {
        static getString(resourceId: string, args: any[]): string;
    }
    export class XmlWriter {
        static create(sb: Sys.StringBuilder): SP.XmlWriter;
        writeStartElement(tagName: string): void;
        writeElementString(tagName: string, value: string): void;
        writeEndElement(): void;
        writeAttributeString(localName: string, value: string): void;
        writeStartAttribute(localName: string): void;
        writeEndAttribute(): void;
        writeString(value: string): void;
        writeRaw(xml: string): void;
        close(): void;
    }
    export class ClientConstants {
        AddExpandoFieldTypeSuffix: string;
        Actions: string;
        ApplicationName: string;
        Body: string;
        CatchScope: string;
        ChildItemQuery: string;
        ChildItems: string;
        ConditionalScope: string;
        Constructor: string;
        Context: string;
        ErrorInfo: string;
        ErrorMessage: string;
        ErrorStackTrace: string;
        ErrorCode: string;
        ErrorTypeName: string;
        ErrorValue: string;
        ErrorDetails: string;
        ErrorTraceCorrelationId: string;
        ExceptionHandlingScope: string;
        ExceptionHandlingScopeSimple: string;
        QueryableExpression: string;
        FinallyScope: string;
        HasException: string;
        Id: string;
        Identity: string;
        IfFalseScope: string;
        IfTrueScope: string;
        IsNull: string;
        LibraryVersion: string;
        TraceCorrelationId: string;
        Count: string;
        Method: string;
        Methods: string;
        Name: string;
        Object: string;
        ObjectPathId: string;
        ObjectPath: string;
        ObjectPaths: string;
        ObjectType: string;
        ObjectIdentity: string;
        ObjectIdentityQuery: string;
        ObjectVersion: string;
        Parameter: string;
        Parameters: string;
        ParentId: string;
        Processed: string;
        Property: string;
        Properties: string;
        Query: string;
        QueryResult: string;
        Request: string;
        Results: string;
        ScalarProperty: string;
        SchemaVersion: string;
        ScopeId: string;
        SelectAll: string;
        SelectAllProperties: string;
        SetProperty: string;
        SetStaticProperty: string;
        StaticMethod: string;
        StaticProperty: string;
        SuffixChar: string;
        SuffixByte: string;
        SuffixInt16: string;
        SuffixUInt16: string;
        SuffixInt32: string;
        SuffixUInt32: string;
        SuffixInt64: string;
        SuffixUInt64: string;
        SuffixSingle: string;
        SuffixDouble: string;
        SuffixDecimal: string;
        SuffixTimeSpan: string;
        SuffixArray: string;
        Test: string;
        TryScope: string;
        Type: string;
        TypeId: string;
        Update: string;
        Version: string;
        XmlElementName: string;
        XmlElementAttributes: string;
        XmlElementChildren: string;
        XmlNamespace: string;
        FieldValuesMethodName: string;
        RequestTokenHeader: string;
        FormDigestHeader: string;
        useWebLanguageHeader: string;
        useWebLanguageHeaderValue: string;
        ClientTagHeader: string;
        TraceCorrelationIdRequestHeader: string;
        TraceCorrelationIdResponseHeader: string;
        greaterThan: string;
        lessThan: string;
        equal: string;
        notEqual: string;
        greaterThanOrEqual: string;
        lessThanOrEqual: string;
        andAlso: string;
        orElse: string;
        not: string;
        expressionParameter: string;
        expressionProperty: string;
        expressionStaticProperty: string;
        expressionMethod: string;
        expressionStaticMethod: string;
        expressionConstant: string;
        expressionConvert: string;
        expressionTypeIs: string;
        ofType: string;
        take: string;
        where: string;
        orderBy: string;
        orderByDescending: string;
        thenBy: string;
        thenByDescending: string;
        queryableObject: string;
        ServiceFileName: string;
        ServiceMethodName: string;
        fluidApplicationInitParamUrl: string;
        fluidApplicationInitParamViaUrl: string;
        fluidApplicationInitParamRequestToken: string;
        fluidApplicationInitParamFormDigestTimeoutSeconds: string;
        fluidApplicationInitParamFormDigest: string;
    }
    export class ClientSchemaVersions {
        version14: string;
        version15: string;
        currentVersion: string;
    }
    export class ClientErrorCodes {
        genericError: number;
        accessDenied: number;
        docAlreadyExists: number;
        versionConflict: number;
        listItemDeleted: number;
        invalidFieldValue: number;
        notSupported: number;
        redirect: number;
        notSupportedRequestVersion: number;
        fieldValueFailedValidation: number;
        itemValueFailedValidation: number;
    }
    export class ClientAction {
        get_id(): number;
        get_path(): SP.ObjectPath;
        get_name(): string;
    }
    export class ClientActionSetProperty extends SP.ClientAction {
        constructor(obj: SP.ClientObject, propName: string, propValue: any);
    }
    export class ClientActionSetStaticProperty extends SP.ClientAction {
        constructor(context: SP.ClientRuntimeContext, typeId: string, propName: string, propValue: any);
    }
    export class ClientActionInvokeMethod extends SP.ClientAction {
        constructor(obj: SP.ClientObject, methodName: string, parameters: any[]);
    }
    export class ClientActionInvokeStaticMethod extends SP.ClientAction {
        constructor(context: SP.ClientRuntimeContext, typeId: string, methodName: string, parameters: any[]);
    }
    export class ClientObject {
        get_context(): SP.ClientRuntimeContext;
        get_path(): SP.ObjectPath;
        get_objectVersion(): string;
        set_objectVersion(value: string): void;
        fromJson(initValue: any): void;
        customFromJson(initValue: any): bool;
        retrieve(): void;
        refreshLoad(): void;
        retrieve(propertyNames: string[]): void;
        isPropertyAvailable(propertyName: string): bool;
        isObjectPropertyInstantiated(propertyName: string): bool;
        get_serverObjectIsNull(): bool;
        get_typedObject(): SP.ClientObject;
    }
    export class ClientObjectData {
        get_properties(): any;
        get_clientObjectProperties(): any;
        get_methodReturnObjects(): any;
        constructor();
    }
    export class ClientObjectCollection extends SP.ClientObject implements IEnumerable {
        get_areItemsAvailable(): bool;
        retrieveItems(): SP.ClientObjectPrototype;
        getEnumerator(): IEnumerator;
        get_count(): number;
        fromJson(obj: any): void;
    }
    export class ClientObjectList extends SP.ClientObjectCollection {
        constructor(context: SP.ClientRuntimeContext, objectPath: SP.ObjectPath, childItemType: any);
        fromJson(initValue: any): void;
        customFromJson(initValue: any): bool;
    }
    export class ClientObjectPrototype {
        retrieve(): void;
        retrieve(propertyNames: string[]): void;
        retrieveObject(propertyName: string): SP.ClientObjectPrototype;
        retrieveCollectionObject(propertyName: string): SP.ClientObjectCollectionPrototype;
    }
    export class ClientObjectCollectionPrototype extends SP.ClientObjectPrototype {
        retrieveItems(): SP.ClientObjectPrototype;
    }
    export enum ClientRequestStatus {
        active,
        inProgress,
        completedSuccess,
        completedException,
    }
    export class WebRequestEventArgs extends Sys.EventArgs {
        constructor(webRequest: Sys.Net.WebRequest);
        get_webRequest(): Sys.Net.WebRequest;
    }
    export class ClientRequest {
        static get_nextSequenceId(): number;
        get_webRequest(): Sys.Net.WebRequest;
        add_requestSucceeded(value: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void): void;
        remove_requestSucceeded(value: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void): void;
        add_requestFailed(value: (sender: any, args: SP.ClientRequestFailedEventArgs) => void): void;
        remove_requestFailed(value: (sender: any, args: SP.ClientRequestFailedEventArgs) => void): void;
        get_navigateWhenServerRedirect(): bool;
        set_navigateWhenServerRedirect(value: bool): void;
    }
    export class ClientRequestEventArgs extends Sys.EventArgs {
        get_request(): SP.ClientRequest;
    }
    export class ClientRequestFailedEventArgs extends SP.ClientRequestEventArgs {
        constructor(request: SP.ClientRequest, message: string, stackTrace: string, errorCode: number, errorValue: string, errorTypeName: string, errorDetails: any);
        constructor(request: SP.ClientRequest, message: string, stackTrace: string, errorCode: number, errorValue: string, errorTypeName: string, errorDetails: any, errorTraceCorrelationId: string);
        get_message(): string;
        get_stackTrace(): string;
        get_errorCode(): number;
        get_errorValue(): string;
        get_errorTypeName(): string;
        get_errorDetails(): any;
        get_errorTraceCorrelationId(): string;
    }
    export class ClientRequestSucceededEventArgs extends SP.ClientRequestEventArgs {
    }
    export class ClientRuntimeContext implements Sys.IDisposable {
        constructor(serverRelativeUrlOrFullUrl: string);
        get_url(): string;
        get_viaUrl(): string;
        set_viaUrl(value: string): void;
        get_formDigestHandlingEnabled(): bool;
        set_formDigestHandlingEnabled(value: bool): void;
        get_applicationName(): string;
        set_applicationName(value: string): void;
        get_clientTag(): string;
        set_clientTag(value: string): void;
        get_webRequestExecutorFactory(): SP.IWebRequestExecutorFactory;
        set_webRequestExecutorFactory(value: SP.IWebRequestExecutorFactory): void;
        get_pendingRequest(): SP.ClientRequest;
        get_hasPendingRequest(): bool;
        add_executingWebRequest(value: (sender: any, args: SP.WebRequestEventArgs) => void): void;
        remove_executingWebRequest(value: (sender: any, args: SP.WebRequestEventArgs) => void): void;
        add_requestSucceeded(value: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void): void;
        remove_requestSucceeded(value: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void): void;
        add_requestFailed(value: (sender: any, args: SP.ClientRequestFailedEventArgs) => void): void;
        remove_requestFailed(value: (sender: any, args: SP.ClientRequestFailedEventArgs) => void): void;
        add_beginningRequest(value: (sender: any, args: SP.ClientRequestEventArgs) => void): void;
        remove_beginningRequest(value: (sender: any, args: SP.ClientRequestEventArgs) => void): void;
        get_requestTimeout(): number;
        set_requestTimeout(value: number): void;
        executeQueryAsync(succeededCallback: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void, failedCallback: (sender: any, args: SP.ClientRequestFailedEventArgs) => void): void;
        executeQueryAsync(succeededCallback: (sender: any, args: SP.ClientRequestSucceededEventArgs) => void): void;
        executeQueryAsync(): void;
        get_staticObjects(): any;
        castTo(obj: SP.ClientObject, type: any): SP.ClientObject;
        addQuery(query: SP.ClientAction): void;
        addQueryIdAndResultObject(id: number, obj: any): void;
        parseObjectFromJsonString(json: string): any;
        parseObjectFromJsonString(json: string, skipTypeFixup: bool): any;
        load(clientObject: SP.ClientObject): void;
        loadQuery(clientObjectCollection: SP.ClientObjectCollection, exp: string): any;
        load(clientObject: SP.ClientObject, exps: string[]): void;
        loadQuery(clientObjectCollection: SP.ClientObjectCollection): any;
        get_serverSchemaVersion(): string;
        get_serverLibraryVersion(): string;
        get_traceCorrelationId(): string;
        set_traceCorrelationId(value: string): void;
        dispose(): void;
    }
    export class SimpleDataTable {
        get_rows(): any[];
        constructor();
    }
    export class ClientValueObject {
        fromJson(obj: any): void;
        customFromJson(obj: any): bool;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
        customWriteToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): bool;
        get_typeId(): string;
    }
    export class ClientValueObjectCollection extends SP.ClientValueObject implements IEnumerable {
        get_count(): number;
        getEnumerator(): IEnumerator;
        writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
    }
    export class ExceptionHandlingScope {
        constructor(context: SP.ClientRuntimeContext);
        startScope(): any;
        startTry(): any;
        startCatch(): any;
        startFinally(): any;
        get_processed(): bool;
        get_hasException(): bool;
        get_errorMessage(): string;
        get_serverStackTrace(): string;
        get_serverErrorCode(): number;
        get_serverErrorValue(): string;
        get_serverErrorTypeName(): string;
        get_serverErrorDetails(): any;
    }
    export class ObjectIdentityQuery extends SP.ClientAction {
        constructor(objectPath: SP.ObjectPath);
    }
    export class ObjectPath {
        setPendingReplace(): void;
    }
    export class ObjectPathProperty extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, parent: SP.ObjectPath, propertyName: string);
    }
    export class ObjectPathStaticProperty extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, typeId: string, propertyName: string);
    }
    export class ObjectPathMethod extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, parent: SP.ObjectPath, methodName: string, parameters: any[]);
    }
    export class ObjectPathStaticMethod extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, typeId: string, methodName: string, parameters: any[]);
    }
    export class ObjectPathConstructor extends SP.ObjectPath {
        constructor(context: SP.ClientRuntimeContext, typeId: string, parameters: any[]);
    }
    export class SerializationContext {
        addClientObject(obj: SP.ClientObject): void;
        addObjectPath(path: SP.ObjectPath): void;
    }
    export class ResourceStrings {
        argumentExceptionMessage: string;
        argumentNullExceptionMessage: string;
        cC_AppIconAlt: string;
        cC_AppWebUrlNotSet: string;
        cC_ArrowImageAlt: string;
        cC_BackToSite: string;
        cC_ErrorGettingThemeInfo: string;
        cC_HelpLinkToolTip: string;
        cC_HostSiteUrlNotSet: string;
        cC_InvalidArgument: string;
        cC_InvalidJSON: string;
        cC_InvalidOperation: string;
        cC_PlaceHolderElementNotFound: string;
        cC_RequiredScriptNotLoaded: string;
        cC_SendFeedback: string;
        cC_SettingsLinkToolTip: string;
        cC_TimeoutGettingThemeInfo: string;
        cC_Welcome: string;
        cannotFindContextWebServerRelativeUrl: string;
        collectionHasNotBeenInitialized: string;
        collectionModified: string;
        invalidUsageOfConditionalScope: string;
        invalidUsageOfConditionalScopeNowAllowedAction: string;
        invalidUsageOfExceptionHandlingScope: string;
        namedPropertyHasNotBeenInitialized: string;
        namedServerObjectIsNull: string;
        noObjectPathAssociatedWithObject: string;
        notSameClientContext: string;
        notSupportedQueryExpressionWithExpressionDetail: string;
        objectNameIdentity: string;
        objectNameMethod: string;
        objectNameProperty: string;
        objectNameType: string;
        propertyHasNotBeenInitialized: string;
        rE_BrowserBinaryDataNotSupported: string;
        rE_BrowserNotSupported: string;
        rE_CannotAccessSite: string;
        rE_CannotAccessSiteCancelled: string;
        rE_CannotAccessSiteOpenWindowFailed: string;
        rE_DismissOpenWindowMessageLinkText: string;
        rE_DomainDoesNotMatch: string;
        rE_FixitHelpMessage: string;
        rE_InvalidArgumentOrField: string;
        rE_InvalidOperation: string;
        rE_NoTrustedOrigins: string;
        rE_OpenWindowButtonText: string;
        rE_OpenWindowMessage: string;
        rE_RequestAbortedOrTimedout: string;
        rE_RequestUnexpectedResponse: string;
        rE_RequestUnexpectedResponseWithContentTypeAndStatus: string;
        requestAbortedOrTimedOut: string;
        requestEmptyQueryName: string;
        requestHasBeenExecuted: string;
        requestUnexpectedResponse: string;
        requestUnexpectedResponseWithContentTypeAndStatus: string;
        requestUnexpectedResponseWithStatus: string;
        requestUnknownResponse: string;
        serverObjectIsNull: string;
        unknownError: string;
        unknownResponseData: string;
    }
    export class RuntimeRes {
        cC_PlaceHolderElementNotFound: string;
        rE_CannotAccessSiteOpenWindowFailed: string;
        noObjectPathAssociatedWithObject: string;
        cC_TimeoutGettingThemeInfo: string;
        unknownResponseData: string;
        requestUnexpectedResponseWithStatus: string;
        objectNameProperty: string;
        requestUnknownResponse: string;
        rE_RequestUnexpectedResponseWithContentTypeAndStatus: string;
        rE_BrowserNotSupported: string;
        argumentExceptionMessage: string;
        namedServerObjectIsNull: string;
        objectNameType: string;
        requestUnexpectedResponseWithContentTypeAndStatus: string;
        cC_InvalidJSON: string;
        invalidUsageOfExceptionHandlingScope: string;
        serverObjectIsNull: string;
        cC_AppWebUrlNotSet: string;
        rE_OpenWindowMessage: string;
        argumentNullExceptionMessage: string;
        cC_HelpLinkToolTip: string;
        propertyHasNotBeenInitialized: string;
        rE_RequestAbortedOrTimedout: string;
        invalidUsageOfConditionalScope: string;
        cC_ErrorGettingThemeInfo: string;
        rE_DismissOpenWindowMessageLinkText: string;
        rE_CannotAccessSiteCancelled: string;
        objectNameIdentity: string;
        cC_HostSiteUrlNotSet: string;
        rE_FixitHelpMessage: string;
        notSupportedQueryExpressionWithExpressionDetail: string;
        rE_RequestUnexpectedResponse: string;
        rE_DomainDoesNotMatch: string;
        cC_BackToSite: string;
        rE_NoTrustedOrigins: string;
        rE_InvalidOperation: string;
        collectionModified: string;
        cC_Welcome: string;
        cC_AppIconAlt: string;
        cC_SendFeedback: string;
        cC_ArrowImageAlt: string;
        cC_InvalidOperation: string;
        requestAbortedOrTimedOut: string;
        invalidUsageOfConditionalScopeNowAllowedAction: string;
        cannotFindContextWebServerRelativeUrl: string;
        rE_OpenWindowButtonText: string;
        unknownError: string;
        cC_InvalidArgument: string;
        rE_InvalidArgumentOrField: string;
        cC_SettingsLinkToolTip: string;
        requestEmptyQueryName: string;
        cC_RequiredScriptNotLoaded: string;
        rE_CannotAccessSite: string;
        notSameClientContext: string;
        requestUnexpectedResponse: string;
        rE_BrowserBinaryDataNotSupported: string;
        collectionHasNotBeenInitialized: string;
        namedPropertyHasNotBeenInitialized: string;
        requestHasBeenExecuted: string;
        objectNameMethod: string;
    }
    export class ParseJSONUtil {
        static parseObjectFromJsonString(json: string): any;
        static validateJson(text: string): bool;
    }
    export enum DateTimeKind {
        unspecified,
        utc,
        local,
    }
    export class OfficeVersion {
        majorBuildVersion: number;
        previousMajorBuildVersion: number;
        majorVersion: string;
        previousVersion: string;
        majorVersionDotZero: string;
        previousVersionDotZero: string;
        assemblyVersion: string;
        wssMajorVersion: string;
    }
}
