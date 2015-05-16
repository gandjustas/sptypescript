var spdevlab;
(function (spdevlab) {
    var mQuery;
    (function (mQuery) {
        var DynamicTable = (function () {
            function DynamicTable() {
                this._rowTemplateId = null;
                this._rowTemplateContent = null;
                this._options = {
                    tableCnt: '.spdev-rep-tb',
                    addCnt: '.spdev-rep-tb-add',
                    removeCnt: '.spdev-rep-tb-del'
                };
            }
            // public methods
            DynamicTable.prototype.init = function (domContainer, options) {
                if (m$.isDefinedAndNotNull(options)) {
                    m$.extend(this._options, options);
                }
                this._initContainers(domContainer);
                this._initRowTemplate();
                this._initEvents();
                this._showUI();
            };
            // private methods
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
                // init templates
                m$('script').forEach(function (template) {
                    var id = m$(template).attr("dynamic-table-template-id");
                    if (m$.isDefinedAndNotNull(id)) {
                        DynamicTable._templates[id] = template.innerHTML;
                    }
                });
                // init tables
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
    })(mQuery = spdevlab.mQuery || (spdevlab.mQuery = {}));
})(spdevlab || (spdevlab = {}));
m$.ready(function () {
    spdevlab.mQuery.DynamicTable.initTables();
});
//# sourceMappingURL=mquery.js.map