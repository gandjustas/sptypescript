/// <reference path="SP.d.ts"/>
declare module SP {
    declare module Taxonomy {
        export enum StringMatchOption {
            startsWith = 0,
            exactMatch = 1
        };


        export class TaxonomySession extends SP.ClientObject {
            static getTaxonomySession(context: SP.ClientContext): TaxonomySession;
            get_offlineTermStoreNames(): string[];
            get_termStores(): TermStoreCollection;
            getTerms(termLabel: string, trimUnavailable: bool): TermCollection;
            getTerms(labelMatchInformation: LabelMatchInformation): TermCollection;
            updateCache(): void;
            getTerm(guid: SP.Guid): Term;
            getTermsById(termIds: SP.Guid[]): TermCollection;
            getTermsInDefaultLanguage(
                termLabel: string,
                defaultLabelOnly: bool,
                stringMatchOption: StringMatchOption,
                resultCollectionSize: number,
                trimUnavailable: bool,
                trimDeprecated: bool): TermCollection;

            getTermsInWorkingLocale(
                termLabel: string,
                defaultLabelOnly: bool,
                stringMatchOption: StringMatchOption,
                resultCollectionSize: number,
                trimUnavailable: bool,
                trimDeprecated: bool): TermCollection;

            getTermsWithCustomProperty(customPropertyName: string, trimUnavailable: bool): TermCollection;
            getTermsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermCollection;
            getTermSetsByName(termSetName: string, lcid: number): TermSetCollection;
            getTermSetsByTermLabel(requiredTermLabels: string[], lcid: number): TermSetCollection;
            getDefaultKeywordsTermStore(): TermStore;
            getDefaultSiteCollectionTermStore(): TermStore;
        }

        export class TermStoreCollection extends SP.ClientObjectCollection {
            itemAt(index: number): TermStore;
            get_item(index: number): TermStore;
            getById(id: SP.Guid): TermStore;
            getByName(name: string): TermStore;
        }

        export class TermStore extends SP.ClientObject {
            get_contentTypePublishingHub(): string;
            get_defaultLanguage(): number;
            set_defaultLanguage(value: number): void;
            get_groups(): TermGroupCollection;
            get_hashTagsTermSet(): TermSet;
            get_id(): SP.Guid;
            get_isOnline(): bool;
            get_keywordsTermSet(): TermSet;
            get_languages(): number[];
            get_name(): string;
            get_orphanedTermsTermSet(): TermSet;
            get_systemGroup(): TermGroup;
            get_workingLanguage(): number;
            set_workingLanguage(value: number): void;

            addLanguage(lcid: number): void;
            commitAll(): void;
            createGroup(name: string): TermGroup;
            createGroup(name: string, groupId: SP.Guid): TermGroup;

            deleteLanguage(lcid: number): void;

            getChanges(changeInformation: ChangeInformation): ChangedItemCollection;

            getGroup(id: SP.Guid): TermGroup;
            getTerm(termId: SP.Guid): Term;
            getTermInTermSet(termSetId: SP.Guid, termId: SP.Guid): Term;
            getTermsById(termIds: SP.Guid[]): TermCollection;
            getTerms(termLabel: string, trimUnavailable: bool): TermCollection;
            getTerms(labelMatchInformation: LabelMatchInformation): TermCollection;
            getTermSetsByName(termSetName: string, lcid: number): TermSetCollection;
            getTermSetsByTermLabel(requiredTermLabels: string[], lcid: number): TermSetCollection;
            getTermsWithCustomProperty(customPropertyName: string, trimUnavailable: bool): TermCollection;
            getTermsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermCollection;

            getTermSet(termSetId: SP.Guid): TermSet;
            getTermSetsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermSetCollection;
            rollbackAll(): void;
            updateCache(): void;
            getSiteCollectionGroup(currentSite: SP.Site, createIfMissing: bool): TermGroup;
            updateUsedTermsOnSite(currentSite: SP.Site): void;
        }

        export class TaxonomyItem extends SP.ClientObject {
            static normalizeName(context: SP.ClientContext, name: string): SP.StringResult;
            get_createdDate(): Date;
            get_id(): SP.Guid;
            get_lastModifiedDate(): Date;
            get_name(): string;
            set_name(value: string): void;
            get_termStore(): TermStore;
            deleteObject(): void;
        }

        export class TermGroupCollection extends SP.ClientObjectCollection {
            itemAt(index: number): TermGroup;
            get_item(index: number): TermGroup;
            getById(id: SP.Guid): TermGroup;
            getByName(name: string): TermGroup;
        }

        export class TermGroup extends TaxonomyItem {
            get_description(): string;
            set_description(value: string): void;
            get_isSiteCollectionGroup(): bool;
            get_isSystemGroup(): bool;
            get_termSets(): TermSetCollection;
            createTermSet(name: string, newTermSetId: SP.Guid, lcid: number): TermSet;
            exportObject(): SP.StringResult;
            getChanges(changeInformation: ChangeInformation): ChangedItemCollection;
            getTermSetsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermSetCollection;
        };

        export class TermSetItem extends TaxonomyItem {
            get_customProperties(): { [key: string]: string; };
            get_customSortOrder(): string;
            set_customSortOrder(value: string): void;
            get_isAvailableForTagging(): bool;
            set_isAvailableForTagging(value: bool): void;
            get_owner(): string;
            set_owner(value: string): void;
            get_terms(): TermCollection;
            createTerm(name: string, lcid: number, newTermId: SP.Guid): Term;
            /*getTerms(pagingLimit: number): TermCollection;*/ //Moved to descendants to void TypeScript errors
            reuseTerm(sourceTerm: Term, reuseBranch: bool): Term;
            reuseTermWithPinning(sourceTerm: Term): Term;
            deleteCustomProperty(name: string): void;
            deleteAllCustomProperties(): void;
            setCustomProperty(name: string, value: string): void;
        }

        export class TermSetCollection extends SP.ClientObjectCollection {
            itemAt(index: number): TermSet;
            get_item(index: number): TermSet;
            getById(id: SP.Guid): TermSet;
            getByName(name: string): TermSet;
        }

        export class TermSet extends TermSetItem {
            get_contact(): string;
            set_contact(value: string): void;
            get_description(): string;
            set_description(value: string): void;
            get_group(): TermGroup;
            get_isOpenForTermCreation(): bool;
            set_isOpenForTermCreation(value: bool): void;
            get_stakeholders(): string[];
            addStakeholder(stakeholderName: string): void;
            copy(): TermSet;
            deleteStakeholder(stakeholderName: string): void;
            exportObject(): SP.StringResult;
            getAllTerms(): TermCollection;
            getChanges(changeInformation: ChangeInformation): ChangedItemCollection;
            getTerm(termId: SP.Guid): Term;
            getTerms(pagingLimit: number): TermCollection;
            getTerms(termLabel: string, trimUnavailable: bool): TermCollection;
            getTerms(labelMatchInformation: LabelMatchInformation): TermCollection;
            getTermsWithCustomProperty(customPropertyName: string, trimUnavailable: bool): TermCollection;
            getTermsWithCustomProperty(customPropertyMatchInformation: CustomPropertyMatchInformation): TermCollection;
            move(targetGroup: TermGroup):void;
        }

        export class TermCollection extends SP.ClientObjectCollection {
            itemAt(index: number): Term;
            get_item(index: number): Term;
            getById(id: SP.Guid): Term;
            getByName(name: string): Term;
        }

        export class Term extends TermSetItem {
            get_description(): string;
            get_isDeprecated(): bool;
            get_isKeyword(): bool;
            get_isPinned(): bool;
            get_isPinnedRoot(): bool;
            get_isReused(): bool;
            get_isRoot(): bool;
            get_isSourceTerm(): bool;
            get_labels: LabelCollection;
            get_localCustomProperties(): { [key: string]: string; };
            get_mergedTermIds(): SP.Guid[];
            get_parent(): Term;
            get_pathOfTerm(): string;
            get_pinSourceTermSet(): TermSet;
            get_reusedTerms(): TermCollection;
            get_sourceTerm(): Term;
            get_termsCount(): number;
            get_termSet(): TermSet;
            get_termSets(): TermSetCollection;
            copy(doCopyChildren: bool): Term;
            createLabel(labelName: string, lcid: number, isDefault: bool): Label;
            deleteLocalCustomProperty(name: string): void;
            deleteAllLocalCustomProperties(): void;
            deprecate(doDepricate: bool): void;
            getAllLabels(lcid: number): LabelCollection;
            getDefaultLabel(lcid: number): Label;
            getDescription(lcid: number): SP.StringResult;

            getTerms(pagingLimit: number): TermCollection;
            getTerms(
                    termLabel: string,
                    lcid:number,
                    defaultLabelOnly: bool,
                    stringMatchOption: StringMatchOption,
                    resultCollectionSize:number,
                    trimUnavailable: bool): TermCollection;

            merge(termToMerge: Term): void;
            move(newParnt: TermSetItem): void;
            reassignSourceTerm(reusedTerm: Term): void;
            setDescription(description:string, lcid:number):void;
            setLocalCustomProperty(name: string, value: string): void;
            getIsDescendantOf(ancestorTerm: Term): SP.BooleanResult;
            getPath(lcid: number): SP.StringResult;
        }


        export class LabelCollection extends SP.ClientObjectCollection {
            itemAt(index: number): Label;
            get_item(index: number): Label;
            getByValue(name: string): Label;
        }

        export class Label extends SP.ClientObject {
            get_isDefaultForLanguage(): bool;
            get_language(): number;
            set_language(value: number): void;
            get_term(): Term;
            get_value(): string;
            set_value(value: string): void;
            deleteObject(): void;
            setAsDefaultForLanguage(): void;
        }

        export class LabelMatchInformation extends SP.ClientObject {
        }

        export class CustomPropertyMatchInformation extends SP.ClientObject {
        }

        export class ChangeInformation extends SP.ClientObject {
        }

        export class ChangedItemCollection extends SP.ClientObjectCollection {
        }

        export class TaxonomyField extends SP.FieldLookup {
        }

        export class MobileTaxonomyField extends SP.ClientObject {
        }
    }
}