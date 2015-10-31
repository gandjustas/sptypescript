declare module spdevlab {
    module mQuery {
        class DynamicTable {
            _domContainer: HTMLElement;
            _tableContainer: MQueryResultSetElements;
            _rowTemplateId: string;
            _rowTemplateContent: string;
            _options: {
                tableCnt: string;
                addCnt: string;
                removeCnt: string;
            };
            init(domContainer: HTMLElement, options: any): void;
            _initContainers(domContainer: any): void;
            _showUI(): void;
            _initEvents(): void;
            _initRowTemplate(): void;
            static _templates: string[];
            static initTables(): void;
        }
    }
}
