///<reference path="../Definitions/jquery.d.ts" />
///<reference path="../Definitions/SharePoint.d.ts" />

module CSRTabs {

    export function init() {
        var options: SPClientTemplates.TemplateOverridesOptions;
        options = { Templates: {} };
        options.OnPreRender = OnPreRender;
        options.Templates.Item = RenderFields;
        options.OnPostRender = OnPostRender;
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(options);
    }

    // At the time of writing, there was a bug in CSR.
    // Even having rendering mode set to CSRCustomLayout, field titles were still rendered by server.
    // Here I hide those artifacts
    function OnPreRender(ctx: SPClientTemplates.RenderContext_Form) {
        var serverRenderArtifacts = <HTMLElement>$get("WebPart" + ctx.FormUniqueId).children[0];
        serverRenderArtifacts.style.display = 'none';
    }


    class TabCollection {
        constructor(fields: SPClientTemplates.FieldSchema_InForm[]) {
            this.tabs = [];
            for (var i = 0; i < (fields.length / 5); i++)
            {
                this.tabs.push(new Tab(
                    "tab" + (i + 1).toString(),
                    "Tab " + (i + 1).toString(),
                    fields.slice(i * 5, (i + 1) * 5 - 1)
                    ));
            }
        }
        tabs: Tab[];
        renderHeaders() {
            var resultHtml = '<ul>';
            for (var i = 0; i < this.tabs.length; i++)
            {
                resultHtml += this.tabs[i].renderHeader();
            }
            resultHtml += '</ul>';
            return resultHtml;
        }
        renderContents(context: SPClientTemplates.RenderContext_Form) {
            var resultHtml = '';
            for (var i = 0; i < this.tabs.length; i++)
            {
                resultHtml += this.tabs[i].renderContent(context);
            }
            return resultHtml;
        }
    }

    class Tab {
        constructor(name: string, title: string, fields: SPClientTemplates.FieldSchema_InForm[]) {
            this.name = name;
            this.title = title;
            this.fields = fields;
        }
        name: string;
        title: string;
        fields: SPClientTemplates.FieldSchema_InForm[];
        renderHeader() {
            return '<li><a href="#' + this.name + '">' + this.title + '</a></li>';
        }
        renderContent(context: SPClientTemplates.RenderContext_Form) {
            var resultHtml: string = '';
            resultHtml += '<div id="' + this.name + '">';
            resultHtml += '<table width="100%" class="ms-formtable" border="0" cellspacing="0" cellpadding="0">';
            for (var i = 0; i < this.fields.length; i++) {
                resultHtml += RenderFieldRow(context, this.fields[i]);
            }
            resultHtml += '</table></div>'
            return resultHtml;
        }
    }

    function RenderFields(context: SPClientTemplates.RenderContext_Form) {

        var tabs = new TabCollection(context.ListSchema.Field);

        var resultHtml = '<div id="tabbedForm">';
        resultHtml += tabs.renderHeaders();
        resultHtml += tabs.renderContents(context);
        resultHtml += '</div>'

        return resultHtml;
    }

    function RenderFieldRow(context: SPClientTemplates.RenderContext_Form, field: SPClientTemplates.FieldSchema_InForm) {

        var resultHtml = '';
        resultHtml += '<tr>';
        resultHtml += '<td width="113" class="ms-formlabel" nowrap="true" valign="top"><h3 class="ms-standardheader"><nobr>';
        resultHtml += field.Title;
        if (field.Required)
        {
            resultHtml += '<span title="This is a required field." class="ms-accentText"> *</span>';
        }
        resultHtml += '</nobr></h3></td>';
        resultHtml += '<td width="350" class="ms-formbody" valign="top">' + context.RenderFieldByName(context, field.Name) + '</td>';
        resultHtml += '</tr>';
        return resultHtml;
    }

    function OnPostRender(ctx: SPClientTemplates.RenderContext_Form) {
        (<any>$("#tabbedForm")).tabs();
    }

};

(function () {
    SP.SOD.executeOrDelayUntilScriptLoaded(() => {
        CSRTabs.init();
        //Enable script with MDS
        SP.SOD.executeOrDelayUntilScriptLoaded(() => {
            RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Sample_CSRTabs/CSRTabs.js"), CSRTabs.init);
        }, "sp.js");

    }, "clienttemplates.js");

})();