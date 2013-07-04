var spdevlab;
(function (spdevlab) {
    (function (mQuery) {
        var DynamicTable = (function () {
            function DynamicTable() {
                this._domContainer = null;
                this._tableContainer = null;
                this._rowTemplateId = null;
                this._rowTemplateContent = null;
                this._options = {
                    tableCnt: '.spdev-rep-tb',
                    addCnt: '.spdev-rep-tb-add',
                    removeCnt: '.spdev-rep-tb-del'
                };
            }
            DynamicTable.prototype.init = function (domContainer, options) {
                if (m$.isDefinedAndNotNull(options)) {
                    m$.extend(this._options, options);
                }

                this._initContainers(domContainer);

                this._initRowTemplate();
                this._initEvents();
                this._showUI();
            };

            DynamicTable.prototype._initContainers = function (domContainer) {
                this._domContainer = domContainer;
                this._tableContainer = m$(this._options.tableCnt, this._domContainer);
            };

            DynamicTable.prototype._showUI = function () {
                m$(this._domContainer).css("display", "");
            };

            DynamicTable.prototype._initEvents = function () {
                var _this = this;
                m$(this._options.addCnt, this._domContainer).click(function () {
                    if (m$.isDefinedAndNotNull(_this._rowTemplateContent)) {
                        m$(_this._tableContainer).append(_this._rowTemplateContent);

                        m$("tr:last-child " + _this._options.removeCnt, _this._tableContainer).click(function (e) {
                            var targetElement = e.currentTarget;
                            var parentRow = m$(targetElement).parents("tr").first();

                            m$(parentRow).remove();
                        });
                    }

                    return false;
                });
            };

            DynamicTable.prototype._initRowTemplate = function () {
                var templateId = m$(this._tableContainer).attr("template-id");

                if (m$.isDefinedAndNotNull(templateId)) {
                    this._rowTemplateId = templateId;
                    this._rowTemplateContent = DynamicTable._templates[templateId];
                }
            };

            DynamicTable.initTables = function () {
                m$('script').forEach(function (scriptContainer) {
                    var id = m$(scriptContainer).attr("dynamic-table-template-id");

                    if (m$.isDefinedAndNotNull(id)) {
                        DynamicTable._templates[id] = scriptContainer.innerHTML;
                    }
                });

                m$(".spdev-rep-tb-cnt").forEach(function (divContainer) {
                    var dynamicTable = new DynamicTable();

                    dynamicTable.init(divContainer, {
                        removeCnt: '.spdev-rep-tb-del-override'
                    });
                });
            };
            DynamicTable._templates = [];
            return DynamicTable;
        })();
        mQuery.DynamicTable = DynamicTable;
        ;
    })(spdevlab.mQuery || (spdevlab.mQuery = {}));
    var mQuery = spdevlab.mQuery;
    m$.ready(function () {
        spdevlab.mQuery.DynamicTable.initTables();
    });
})(spdevlab || (spdevlab = {}));
//@ sourceMappingURL=mquery.js.map
