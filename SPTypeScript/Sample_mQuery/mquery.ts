///<reference path="../Definitions/SharePoint.d.ts" />


module spdevlab {
    export module mQuery {
        export class DynamicTable {

            // private fields
            _domContainer = null;
            _tableContainer = null;

            _rowTemplateId = null;
            _rowTemplateContent = null;

            _options = {
                tableCnt: '.spdev-rep-tb',
                addCnt: '.spdev-rep-tb-add',
                removeCnt: '.spdev-rep-tb-del'
            };

            // public methods
            init(domContainer:MQueryResultSet, options) {

                if (m$.isDefinedAndNotNull(options)) {
                    m$.extend(this._options, options);
                }

                this._initContainers(domContainer);

                this._initRowTemplate();
                this._initEvents();
                this._showUI();
            }

            // private methods
            _initContainers(domContainer) {

                this._domContainer = domContainer;
                this._tableContainer = m$(this._options.tableCnt, this._domContainer);
            }

            _showUI() {
                m$(this._domContainer).css("display", "");
            }

            _initEvents() {

                m$(this._options.addCnt, this._domContainer).click(() => {

                    if (m$.isDefinedAndNotNull(this._rowTemplateContent)) {

                        m$(this._tableContainer).append(this._rowTemplateContent);

                        m$("tr:last-child " + this._options.removeCnt, this._tableContainer).click( (e) => {

                            var targetElement = e.currentTarget;
                            var parentRow = m$(targetElement).parents("tr").first();

                            m$(parentRow).remove();
                        });
                    }

                    return false;
                });
            }

            _initRowTemplate() {

                var templateId = m$(this._tableContainer).attr("template-id");

                if (m$.isDefinedAndNotNull(templateId)) {
                    this._rowTemplateId = templateId;
                    this._rowTemplateContent = DynamicTable._templates[templateId];
                }
            }

            static _templates = [];
            static initTables() {
                // init templates
                m$('script').forEach((scriptContainer) =>  {

                    var id = m$(scriptContainer).attr("dynamic-table-template-id");

                    if (m$.isDefinedAndNotNull(id)) {
                        DynamicTable._templates[id] = scriptContainer.innerHTML;
                    }
                });

                // init tables
                m$(".spdev-rep-tb-cnt").forEach( (divContainer) => {

                    var dynamicTable = new DynamicTable();

                    dynamicTable.init(divContainer, {
                        removeCnt: '.spdev-rep-tb-del-override'
                    });
                });
            }

        };


    }
    m$.ready(() => {
        spdevlab.mQuery.DynamicTable.initTables();
    });
}