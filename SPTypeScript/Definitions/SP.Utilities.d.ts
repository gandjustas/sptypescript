/// <reference path="SP.d.ts"/>

declare module SP {

    export module Utilities {
        export class Utility {
            lAYOUTS_LATESTVERSION_RELATIVE_URL: string;
            lAYOUTS_LATESTVERSION_URL: string;
            static get_layoutsLatestVersionRelativeUrl(): string;
            static get_layoutsLatestVersionUrl(): string;
            static getLayoutsPageUrl(pageName: string): string;
            static getImageUrl(imageName: string): string;
            static createWikiPageInContextWeb(context: SP.ClientRuntimeContext, parameters: SP.Utilities.WikiPageCreationInformation): SP.File;
            static localizeWebPartGallery(context: SP.ClientRuntimeContext, items: SP.ListItemCollection): SP.ClientObjectList;
            static getAppLicenseInformation(context: SP.ClientRuntimeContext, productId: SP.Guid): SP.AppLicenseCollection;
            static importAppLicense(context: SP.ClientRuntimeContext, licenseTokenToImport: string, contentMarket: string, billingMarket: string, appName: string, iconUrl: string, providerName: string, appSubtype: number): void;
            static getAppLicenseDeploymentId(context: SP.ClientRuntimeContext): SP.GuidResult;
            static logCustomAppError(context: SP.ClientRuntimeContext, error: string): SP.IntResult;
            static logCustomRemoteAppError(context: SP.ClientRuntimeContext, productId: SP.Guid, error: string): SP.IntResult;
            static getLocalizedString(context: SP.ClientRuntimeContext, source: string, defaultResourceFile: string, language: number): SP.StringResult;
            static createNewDiscussion(context: SP.ClientRuntimeContext, list: SP.List, title: string): SP.ListItem;
            static createNewDiscussionReply(context: SP.ClientRuntimeContext, parent: SP.ListItem): SP.ListItem;
            static markDiscussionAsFeatured(context: SP.ClientRuntimeContext, listID: string, topicIDs: string): void;
            static unmarkDiscussionAsFeatured(context: SP.ClientRuntimeContext, listID: string, topicIDs: string): void;
            static searchPrincipals(context: SP.ClientRuntimeContext, web: SP.Web, input: string, scopes: SP.Utilities.PrincipalType, sources: SP.Utilities.PrincipalSource, usersContainer: SP.UserCollection, maxCount: number): SP.Utilities.PrincipalInfo[];
            static getCurrentUserEmailAddresses(context: SP.ClientRuntimeContext): SP.StringResult;
            static createEmailBodyForInvitation(context: SP.ClientRuntimeContext, pageAddress: string): SP.StringResult;
            static getPeoplePickerURL(context: SP.ClientRuntimeContext, web: SP.Web, fieldUser: SP.FieldUser): SP.StringResult;
            static resolvePrincipal(context: SP.ClientRuntimeContext, web: SP.Web, input: string, scopes: SP.Utilities.PrincipalType, sources: SP.Utilities.PrincipalSource, usersContainer: SP.UserCollection, inputIsEmailOnly: bool): SP.Utilities.PrincipalInfo;
            static getLowerCaseString(context: SP.ClientRuntimeContext, sourceValue: string, lcid: number): SP.StringResult;
            static formatDateTime(context: SP.ClientRuntimeContext, web: SP.Web, datetime: Date, format: SP.Utilities.DateTimeFormat): SP.StringResult;
            static isUserLicensedForEntityInContext(context: SP.ClientRuntimeContext, licensableEntity: string): SP.BooleanResult;
        }
        export enum DateTimeFormat {
            dateTime,
            dateOnly,
            timeOnly,
            iSO8601,
            monthDayOnly,
            monthYearOnly,
            longDate,
            unknownFormat,
        }
        export class EmailProperties extends SP.ClientValueObject {
            get_additionalHeaders(): any;
            set_additionalHeaders(value: any): void;
            get_bCC(): string[];
            set_bCC(value: string[]): void;
            get_body(): string;
            set_body(value: string): void;
            get_cC(): string[];
            set_cC(value: string[]): void;
            get_from(): string;
            set_from(value: string): void;
            get_subject(): string;
            set_subject(value: string): void;
            get_to(): string[];
            set_to(value: string[]): void;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export enum IconSize {
            size16,
            size32,
            size256,
        }
        export enum LogAppErrorResult {
            success,
            errorsThrottled,
            accessDenied,
        }
        export class PrincipalInfo extends SP.ClientValueObject {
            get_department(): string;
            get_displayName(): string;
            get_email(): string;
            get_jobTitle(): string;
            get_loginName(): string;
            get_mobile(): string;
            get_principalId(): number;
            get_principalType(): SP.Utilities.PrincipalType;
            get_sIPAddress(): string;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export enum PrincipalSource {
            none,
            userInfoList,
            windows,
            membershipProvider,
            roleProvider,
            all,
        }
        export enum PrincipalType {
            none,
            user,
            distributionList,
            securityGroup,
            sharePointGroup,
            all,
        }
        export enum SPWOPIFrameAction {
            view,
            edit,
            mobileView,
            interactivePreview,
        }
        export class WikiPageCreationInformation extends SP.ClientValueObject {
            get_serverRelativeUrl(): string;
            set_serverRelativeUrl(value: string): void;
            get_wikiHtmlContent(): string;
            set_wikiHtmlContent(value: string): void;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
    }
}