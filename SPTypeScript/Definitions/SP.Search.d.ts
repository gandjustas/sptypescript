/// <reference path="SP.d.ts"/>

declare module Microsoft.SharePoint.Client.Search {
    declare module Query {

        /**Contains information common to all types of search queries.*/
        export class Query extends SP.ClientObject {
            get_blockDedupeMode: () => number;
            set_blockDedupeMode: (number) => void;

            get_bypassResultTypes: () => bool;
            set_bypassResultTypes: (bool) => void;

            get_clientType: () => string;
            set_clientType: (string) => void;

            get_culture: () => number;
            set_culture: (number) => void;

            get_desiredSnippetLength: () => number;
            set_desiredSnippetLength: (number) => void;

            get_enableInterleaving: () => bool;
            set_enableInterleaving: (bool) => void;

            get_enableNicknames: () => bool;
            set_enableNicknames: (bool) => void;

            get_enableOrderingHitHighlightedProperty: () => bool;
            set_enableOrderingHitHighlightedProperty: (bool) => void;

            get_enablePhonetic: () => bool;
            set_enablePhonetic: (bool) => void;

            get_enableQueryRules: () => bool;
            set_enableQueryRules: (bool) => void;

            get_enableStemming: () => bool;
            set_enableStemming: (bool) => void;

            get_generateBlockRankLog: () => bool;
            set_generateBlockRankLog: (bool) => void;

            get_hitHighlightedMultivaluePropertyLimit: () => number;
            set_hitHighlightedMultivaluePropertyLimit: (number) => void;

            get_hitHighlightedProperties: () => StringCollection;

            get_ignoreSafeQueryPropertiesTemplateUrl: () => bool;
            set_ignoreSafeQueryPropertiesTemplateUrl: (bool) => void;

            get_impressionID: () => string;
            set_impressionID: (string) => void;

            get_maxSnippetLength: () => number;
            set_maxSnippetLength: (number) => void;

            get_personalizationData: () => QueryPersonalizationData;
            set_personalizationData: (QueryPersonalizationData) => void;

            get_processBestBets: () => bool;
            set_processBestBets: (bool) => void;

            get_processPersonalFavorites: () => bool;
            set_processPersonalFavorites: (bool) => void;

            get_queryTag: () => string;
            set_queryTag: (string) => void;

            get_queryTemplate: () => string;
            set_queryTemplate: (string) => void;

            get_queryTemplateParameters: () => { [string]: bool; };

            get_queryText: () => string;
            set_queryText: (string) => void;

            get_rankingModelId: () => string;
            set_rankingModelId: (string) => void;

            get_resultsUrl: () => string;
            set_resultsUrl: (string) => void;

            get_rowLimit: () => number;
            set_rowLimit: (number) => void;

            get_rowsPerPage: () => number;
            set_rowsPerPage: (number) => void;

            get_safeQueryPropertiesTemplateUrl: () => string;
            set_safeQueryPropertiesTemplateUrl: (string) => void;

            get_showPeopleNameSuggestions: () => bool;
            set_showPeopleNameSuggestions: (bool) => void;

            get_sourceId: () => SP.Guid;
            set_sourceId: (value: SP.Guid) => void;

            get_startRow: () => number;
            set_startRow: (number) => void;

            get_summaryLength: () => number;
            set_summaryLength: (number) => void;

            get_timeout: () => number;
            set_timeout: (number) => void;

            get_totalRowsExactMinimum: () => number;
            set_totalRowsExactMinimum: (number) => void;

            get_trimDuplicates: () => bool;
            set_trimDuplicates: (bool) => void;


            get_uiLanguage: () => number;
            set_uiLanguage: (number) => void;



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
            set_collapseSpecification: (string) => void;

            get_enableSorting: () => bool;
            set_enableSorting: (bool) => void;

            get_hiddenConstraints: () => string;
            set_hiddenConstraints: (string) => void;

            get_properties: () => KeywordQueryProperties;

            get_refinementFilters: () => StringCollection;
            set_refinementFilters: (StringCollection) => void;

            get_refiners: () => string;
            set_refiners: (string) => void;

            get_reorderingRules: () => ReorderingRuleCollection;
            set_reorderingRules: (ReorderingRuleCollection) => void;

            /**Specifies the list of managed properties to be returned for each search result.*/
            get_selectProperties: () => StringCollection;

            get_sortList: () => SortCollection;

            get_trimDuplicatesIncludeId: () => number;
            set_trimDuplicatesIncludeId: (number) => void;
        }

        /**Executes queries against a search server.*/
        export class SearchExecutor extends SP.ClientObject {
            constructor(context: SP.ClientContext);

            /**Runs a query.*/
            executeQuery: (Query) => SP.JsonObjectResult;
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
    }
}