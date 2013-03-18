/// <reference path="SP.d.ts"/>

declare module Microsoft.SharePoint.Client.Search {
    declare module Query {

        /**Contains information common to all types of search queries.*/
        export class Query extends SP.ClientObject {
            get_blockDedupeMode: () => number;
            set_blockDedupeMode: (value: number) => void;

            get_bypassResultTypes: () => bool;
            set_bypassResultTypes: (value: bool) => void;

            get_clientType: () => string;
            set_clientType: (value: string) => void;

            get_culture: () => number;
            set_culture: (value: number) => void;

            get_desiredSnippetLength: () => number;
            set_desiredSnippetLength: (value: number) => void;

            get_enableInterleaving: () => bool;
            set_enableInterleaving: (value: bool) => void;

            get_enableNicknames: () => bool;
            set_enableNicknames: (value: bool) => void;

            get_enableOrderingHitHighlightedProperty: () => bool;
            set_enableOrderingHitHighlightedProperty: (value: bool) => void;

            get_enablePhonetic: () => bool;
            set_enablePhonetic: (value: bool) => void;

            get_enableQueryRules: () => bool;
            set_enableQueryRules: (value: bool) => void;

            get_enableStemming: () => bool;
            set_enableStemming: (value: bool) => void;

            get_generateBlockRankLog: () => bool;
            set_generateBlockRankLog: (value: bool) => void;

            get_hitHighlightedMultivaluePropertyLimit: () => number;
            set_hitHighlightedMultivaluePropertyLimit: (value: number) => void;

            get_hitHighlightedProperties: () => StringCollection;

            get_ignoreSafeQueryPropertiesTemplateUrl: () => bool;
            set_ignoreSafeQueryPropertiesTemplateUrl: (value: bool) => void;

            get_impressionID: () => string;
            set_impressionID: (value: string) => void;

            get_maxSnippetLength: () => number;
            set_maxSnippetLength: (value: number) => void;

            get_personalizationData: () => QueryPersonalizationData;
            set_personalizationData: (QueryPersonalizationData) => void;

            get_processBestBets: () => bool;
            set_processBestBets: (value: bool) => void;

            get_processPersonalFavorites: () => bool;
            set_processPersonalFavorites: (value: bool) => void;

            get_queryTag: () => string;
            set_queryTag: (value: string) => void;

            get_queryTemplate: () => string;
            set_queryTemplate: (value: string) => void;

            get_queryTemplateParameters: () => { [key: string]: bool; };

            get_queryText: () => string;
            set_queryText: (value: string) => void;

            get_rankingModelId: () => string;
            set_rankingModelId: (value: string) => void;

            get_resultsUrl: () => string;
            set_resultsUrl: (value: string) => void;

            get_rowLimit: () => number;
            set_rowLimit: (value: number) => void;

            get_rowsPerPage: () => number;
            set_rowsPerPage: (value: number) => void;

            get_safeQueryPropertiesTemplateUrl: () => string;
            set_safeQueryPropertiesTemplateUrl: (value: string) => void;

            get_showPeopleNameSuggestions: () => bool;
            set_showPeopleNameSuggestions: (value: bool) => void;

            get_sourceId: () => SP.Guid;
            set_sourceId: (value: SP.Guid) => void;

            get_startRow: () => number;
            set_startRow: (value: number) => void;

            get_summaryLength: () => number;
            set_summaryLength: (number) => void;

            get_timeout: () => number;
            set_timeout: (value: number) => void;

            get_totalRowsExactMinimum: () => number;
            set_totalRowsExactMinimum: (value: number) => void;

            get_trimDuplicates: () => bool;
            set_trimDuplicates: (value: bool) => void;


            get_uiLanguage: () => number;
            set_uiLanguage: (value: number) => void;



            getQuerySuggestionsWithResults: (iNumberOfQuerySuggestions: number,
                iNumberOfResultSuggestions: number,
                fPreQuerySuggestions: bool,
                fHitHighlighting: bool,
                fCapitalizeFirstLetters: bool,
                fPrefixMatchAllTerms: bool) => QuerySuggestionResults;


        }

        /**Contains information about a keyword based search query.*/
        export class KeywordQuery extends Query {
            constructor(context: SP.ClientContext);

            get_collapseSpecification: () => string;
            set_collapseSpecification: (value: string) => void;

            get_enableSorting: () => bool;
            set_enableSorting: (value: bool) => void;

            get_hiddenConstraints: () => string;
            set_hiddenConstraints: (value: string) => void;

            get_properties: () => KeywordQueryProperties;

            get_refinementFilters: () => StringCollection;
            set_refinementFilters: (value: StringCollection) => void;

            get_refiners: () => string;
            set_refiners: (value: string) => void;

            get_reorderingRules: () => ReorderingRuleCollection;
            set_reorderingRules: (value: ReorderingRuleCollection) => void;

            /**Specifies the list of managed properties to be returned for each search result.*/
            get_selectProperties: () => StringCollection;

            get_sortList: () => SortCollection;

            get_trimDuplicatesIncludeId: () => number;
            set_trimDuplicatesIncludeId: (value: number) => void;
        }

        /**Executes queries against a search server.*/
        export class SearchExecutor extends SP.ClientObject {
            constructor(context: SP.ClientContext);

            /**Runs a query.*/
            executeQuery: (query: Query) => SP.JsonObjectResult;
            executeQueries: (queryIds: string[], queries: Query[], handleExceptions: bool) => SP.JsonObjectResult;
            recordPageClick: (
                pageInfo: string,
                clickType: string,
                blockType: number,
                clickedResultId: string,
                subResultIndex: number,
                immediacySourceId: string,
                immediacyQueryString: string,
                immediacyTitle: string,
                immediacyUrl: string) => void;
            exportPopularQueries: (web: SP.Web, sourceId: SP.Guid) => SP.JsonObjectResult;
        };

        export class StringCollection extends SP.ClientObjectCollection { };
        export class QueryPersonalizationData extends SP.ClientObject { };
        export class QuerySuggestionResults extends SP.ClientValueObject { };
        export class KeywordQueryProperties extends SP.ClientObject { };
        export class ReorderingRuleCollection extends SP.ClientObjectCollection { };
        export class SortCollection extends SP.ClientObjectCollection { };
        export class ResultTableCollection extends SP.ClientValueObjectCollection {
            get_item: (index: number) => ResultTable;

            get_elapsedTime: () => number;
            set_elapsedTime: (value: number) => void;

            get_properties: () => { [key: string]: any; };

            get_queryErrors: () => { [key: string]: WebControls.ControlMessage; };

            get_queryId: () => string;

            get_spellingSuggestion: () => string;

            get_triggeredRules: () => SP.Guid[];

            get_typeId: () => string;

            get_childItemsName: () => string;

            initPropertiesFromJson: (parentNode: any) => void;

        };

        export class ResultTable extends SP.ClientValueObject {
            get_groupTemplateId: () => string;
            get_itemTemplateId: () => string;
            get_properties: () => { [key: string]: any; };
            get_queryId: () => string;
            get_queryRuleId: () => string;
            get_resultRows: () => { [key: string]: any; }[];
            get_resultTitle: () => string;
            get_resultTitleUrl: () => string;
            get_rowCount: () => number;
            get_tableType: () => string;
            get_totalRows: () => number;
            get_totalRowsIncludingDuplicates: () => number;
            get_typeId: () => string;
            initPropertiesFromJson: (parentNode: any) => void;
        };


    }

    module WebControls {
        export class ControlMessage { }
    }
}