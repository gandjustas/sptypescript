/// <reference path="SP.d.ts"/>
declare module SP {
    declare module Taxonomy {
        export enum StringMatchOption {
            startsWith = 0,
            exactMatch = 1
        };

        export enum ChangeItemType {
            unknown = 0,
            term = 1,
            termSet = 2,
            group = 3,
            termStore = 4,
            site = 5
        };

        export enum ChangeOperationType {
            unknown = 0,
            add = 1,
            edit = 2,
            deleteObject = 3,
            move = 4,
            copy = 5,
            pathChange = 6,
            merge = 7,
            importObject = 8,
            restore = 9
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
            move(targetGroup: TermGroup): void;
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
                lcid: number,
                defaultLabelOnly: bool,
                stringMatchOption: StringMatchOption,
                resultCollectionSize: number,
                trimUnavailable: bool): TermCollection;

            merge(termToMerge: Term): void;
            move(newParnt: TermSetItem): void;
            reassignSourceTerm(reusedTerm: Term): void;
            setDescription(description: string, lcid: number): void;
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
            constructor(context: SP.ClientContext);
            get_defaultLabelOnly(): bool;
            set_defaultLabelOnly(value: bool): void;
            get_excludeKeyword(): bool;
            set_excludeKeyword(value: bool): void;
            get_lcid(): number;
            set_lcid(value: number): void;
            get_resultCollectionSize(): number;
            set_resultCollectionSize(value: number): void;
            get_stringMatchOption(): StringMatchOption;
            set_stringMatchOption(value: StringMatchOption): void;
            get_termLabel(): string;
            set_termLabel(value: string): void;
            get_trimDeprecated(): bool;
            set_trimDeprecated(value: bool): void;
            get_trimUnavailable(): bool;
            set_trimUnavailable(value: bool): void;
        }

        export class CustomPropertyMatchInformation extends SP.ClientObject {
            constructor(context: SP.ClientContext);
            get_customPropertyName(): string;
            set_customPropertyName(value: string): void;
            get_customPropertyValue(): string;
            set_customPropertyValue(value: string): void;
            get_resultCollectionSize(): number;
            set_resultCollectionSize(value: number): void;
            get_stringMatchOption(): StringMatchOption;
            set_stringMatchOption(value: StringMatchOption): void;
            get_trimUnavailable(): bool;
            set_trimUnavailable(value: bool): void;
        }

        export class ChangeInformation extends SP.ClientObject {
            constructor(context: SP.ClientContext);
            get_itemType(): ChangeItemType;
            set_itemType(value: ChangeItemType): void;
            get_operationType(): ChangeOperationType;
            set_operationType(value: ChangeOperationType): void;
            get_startTime(): Date;
            set_startTime(value: Date): void;
            get_withinTimeSpan(): number;
            set_withinTimeSpan(value: number): void;
        }

        export class ChangedItemCollection extends SP.ClientObjectCollection {
            itemAt(index: number): ChangedItem;
            get_item(index: number): ChangedItem;
        }

        export class ChangedItem extends SP.ClientObject {
            get_changedBy(): string;
            get_changedTime(): Date;
            get_id(): SP.Guid;
            get_itemType(): ChangeItemType;
            get_operation(): ChangeOperationType;
        }

        export class ChangedSite extends ChangedItem {
            get_siteId(): SP.Guid;
            get_termId(): SP.Guid;
            get_termSetId(): SP.Guid;
        }

        export class ChangedGroup extends ChangedItem {
        }

        export class ChangedTerm extends ChangedItem {
            get_changedCustomProperties(): string[];
            get_changedLocalCustomProperties(): string[];
            get_groupId(): SP.Guid;
            get_lcidsForChangedDescriptions(): number[];
            get_lcidsForChangedLabels(): number[];
            get_termSetId(): SP.Guid;
        }

        export class ChangedTermSet extends ChangedItem {
            get_fromGroupId(): SP.Guid;
            get_groupId(): SP.Guid;
        }
        export class ChangedTermStore extends ChangedItem {
            get_changedLanguage(): number;
            get_isDefaultLanguageChanged(): bool;
            get_isFullFarmRestore(): bool;
        }

        export class TaxonomyField extends SP.FieldLookup {
            constructor(context: SP.ClientContext, fields: SP.FieldCollection, filedName: string);
            get_anchorId(): SP.Guid;
            set_anchorId(value: SP.Guid): void;
            get_createValuesInEditForm(): bool;
            set_createValuesInEditForm(value: bool): void;
            get_isAnchorValid(): bool;
            get_isKeyword(): bool;
            set_isKeyword(value: bool): void;
            get_isPathRendered(): bool;
            set_isPathRendered(value: bool): void;
            get_isTermSetValid(): bool;
            get_open(): bool;
            set_open(value: bool): void;
            get_sspId(): SP.Guid;
            set_sspId(value: SP.Guid): void;
            get_targetTemplate(): string;
            set_targetTemplate(value: string): void;
            get_termSetId(): SP.Guid;
            set_termSetId(value: SP.Guid): void;
            get_textField(): SP.Guid;
            get_userCreated(): SP.Guid;
            set_userCreated(value: SP.Guid): void;

            getFieldValueAsText(value: TaxonomyFieldValue): SP.StringResult;
            getFieldValueAsTaxonomyFieldValue(value: string): TaxonomyFieldValue;
            getFieldValueAsTaxonomyFieldValueCollection(value: string): TaxonomyFieldValueCollection;
            setFieldValueByTerm(listItem: SP.ListItem, term: Term, lcid: number): void;
            setFieldValueByTermCollection(listItem: SP.ListItem, terms: TermCollection, lcid: number): void;
            setFieldValueByCollection(listItem: SP.ListItem, terms: Term[], lcid: number): void;
            setFieldValueByValue(listItem: SP.ListItem, taxValue: TaxonomyFieldValue): void;
            setFieldValueByValueCollection(listItem: SP.ListItem, taxValueCollection: TaxonomyFieldValueCollection): void;
            getFieldValueAsHtml(value: TaxonomyFieldValue): SP.StringResult;
            getValidatedString(value: TaxonomyFieldValue): SP.StringResult;

        }

        export class TaxonomyFieldValueCollection extends SP.ClientObjectCollection {
            constructor(context: SP.ClientContext, fieldValue: string, creatingField: SP.Field);
            itemAt(index: number): TaxonomyFieldValue;
            get_item(index: number): TaxonomyFieldValue;
            populateFromLabelGuidPairs(text: string): void;
        }

        export class TaxonomyFieldValue extends SP.ClientValueObject {
            get_label(): string;
            set_label(value: string): void;
            get_termGuid(): SP.Guid;
            set_termGuid(value: SP.Guid): void;
            get_wssId(): SP.Guid;
            set_wssId(value: SP.Guid): void;
        }

        export class MobileTaxonomyField extends SP.ClientObject {
            get_readOnly(): bool;
        }
    }
}