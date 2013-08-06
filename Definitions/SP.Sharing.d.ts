/// <reference path="SP.d.ts"/>

declare module SP {
    export module Sharing {
        export class DocumentSharingManager {
            static getRoleDefinition(context: SP.ClientRuntimeContext, role: SP.Sharing.Role): SP.RoleDefinition;
            static isDocumentSharingEnabled(context: SP.ClientRuntimeContext, list: SP.List): SP.BooleanResult;
            static updateDocumentSharingInfo(context: SP.ClientRuntimeContext, resourceAddress: string, userRoleAssignments: SP.Sharing.UserRoleAssignment[], validateExistingPermissions: boolean, additiveMode: boolean, sendServerManagedNotification: boolean, customMessage: string, includeAnonymousLinksInNotification: boolean): SP.Sharing.UserSharingResult[];
        }
        export enum Role {
            none,
            view,
            edit,
            owner,
        }
        export class UserRoleAssignment extends SP.ClientValueObject {
            get_role(): SP.Sharing.Role;
            set_role(value: SP.Sharing.Role): void;
            get_userId(): string;
            set_userId(value: string): void;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
        export class UserSharingResult extends SP.ClientValueObject {
            get_allowedRoles(): SP.Sharing.Role[];
            get_currentRole(): SP.Sharing.Role;
            get_isUserKnown(): boolean;
            get_message(): string;
            get_status(): boolean;
            get_user(): string;
            get_typeId(): string;
            writeToXml(writer: SP.XmlWriter, serializationContext: SP.SerializationContext): void;
            constructor();
        }
    }

}