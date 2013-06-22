var CSRTabs;
(function (CSRTabs) {
    function init() {
        var options;
        options = { Templates: {} };
        options.OnPreRender = OnPreRender;
        options.Templates.Item = RenderFields;
        options.OnPostRender = OnPostRender;
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(options);
    }
    CSRTabs.init = init;

    function OnPreRender(ctx) {
        var serverRenderArtifacts = $get("WebPart" + ctx.FormUniqueId).children[0];
        serverRenderArtifacts.style.display = 'none';
    }

    var TabCollection = (function () {
        function TabCollection(fields) {
            this.tabs = [];
            for (var i = 0; i < (fields.length / 5); i++) {
                this.tabs.push(new Tab("tab" + (i + 1).toString(), "Tab " + (i + 1).toString(), fields.slice(i * 5, (i + 1) * 5 - 1)));
            }
        }
        TabCollection.prototype.renderHeaders = function () {
            var resultHtml = '<ul>';
            for (var i = 0; i < this.tabs.length; i++) {
                resultHtml += this.tabs[i].renderHeader();
            }
            resultHtml += '</ul>';
            return resultHtml;
        };
        TabCollection.prototype.renderContents = function (context) {
            var resultHtml = '';
            for (var i = 0; i < this.tabs.length; i++) {
                resultHtml += this.tabs[i].renderContent(context);
            }
            return resultHtml;
        };
        return TabCollection;
    })();

    var Tab = (function () {
        function Tab(name, title, fields) {
            this.name = name;
            this.title = title;
            this.fields = fields;
        }
        Tab.prototype.renderHeader = function () {
            return '<li><a href="#' + this.name + '">' + this.title + '</a></li>';
        };
        Tab.prototype.renderContent = function (context) {
            var resultHtml = '';
            resultHtml += '<div id="' + this.name + '">';
            resultHtml += '<table width="100%" class="ms-formtable" border="0" cellspacing="0" cellpadding="0">';
            for (var i = 0; i < this.fields.length; i++) {
                resultHtml += RenderFieldRow(context, this.fields[i]);
            }
            resultHtml += '</table></div>';
            return resultHtml;
        };
        return Tab;
    })();

    function RenderFields(context) {
        var tabs = new TabCollection(context.ListSchema.Field);

        var resultHtml = '<div id="tabbedForm">';
        resultHtml += tabs.renderHeaders();
        resultHtml += tabs.renderContents(context);
        resultHtml += '</div>';

        return resultHtml;
    }

    function RenderFieldRow(context, field) {
        var resultHtml = '';
        resultHtml += '<tr>';
        resultHtml += '<td width="113" class="ms-formlabel" nowrap="true" valign="top"><h3 class="ms-standardheader"><nobr>';
        resultHtml += field.Title;
        if (field.Required) {
            resultHtml += '<span title="This is a required field." class="ms-accentText"> *</span>';
        }
        resultHtml += '</nobr></h3></td>';
        resultHtml += '<td width="350" class="ms-formbody" valign="top">' + context.RenderFieldByName(context, field.Name) + '</td>';
        resultHtml += '</tr>';
        return resultHtml;
    }

    function OnPostRender(ctx) {
        ($("#tabbedForm")).tabs();
    }
})(CSRTabs || (CSRTabs = {}));
;

(function () {
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        CSRTabs.init();

        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Sample_CSRTabs/CSRTabs.js"), CSRTabs.init);
        }, "sp.js");
    }, "clienttemplates.js");
})();
//@ sourceMappingURL=CSRTabs.js.map
