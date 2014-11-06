
declare var Strings: any;
declare module SP {
    export var Ribbon: any;
}

module CSRTabs {

    var author, editor, created, modified;

    export function init() {
        var options: SPClientTemplates.TemplateOverridesOptions;
        options = { Templates: {} };
        options.Templates.Item = RenderFields;
        options.OnPostRender = OnPostRender;
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(options);
    }

    class TabCollection {
        constructor(fields: SPClientTemplates.FieldSchema_InForm[]) {
            this.tabs = [];
            var fieldsForTabs = [];
            for (var i = 0; i < fields.length; i++)
            {
                if (fields[i].Name != "Modified" && fields[i].Name != "Editor"
                    && fields[i].Name != "Created" && fields[i].Name != "Author")
                {
                    fieldsForTabs.push(fields[i]);
                }
            }
            for (var i = 0; i < (fieldsForTabs.length / 5); i++)
            {
                this.tabs.push(new Tab(
                    "tab" + (i + 1).toString(),
                    "Tab " + (i + 1).toString(),
                    fieldsForTabs.slice(i * 5, (i + 1) * 5)
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
            return (<any>String).format('<li><a href="#{0}">{1}</a></li>', this.name, this.title);
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

        var resultHtml = '';
        resultHtml += '<div id="tabbedForm">';
        resultHtml += tabs.renderHeaders();
        resultHtml += tabs.renderContents(context);
        resultHtml += '</div>';

        // Fix for proper displaying CreatedModifiedInfo control
        author = context.RenderFieldByName(context, "Author");
        created = context.RenderFieldByName(context, "Created");
        editor = context.RenderFieldByName(context, "Editor");
        modified = context.RenderFieldByName(context, "Modified");

        return resultHtml;
    }

    function RenderFieldRow(context: SPClientTemplates.RenderContext_Form, field: SPClientTemplates.FieldSchema_InForm) {

        var resultHtml = '<tr>';
        resultHtml += '<td width="113" class="ms-formlabel" nowrap="true" valign="top"><h3 class="ms-standardheader"><nobr>';
        resultHtml += field.Title;
        if (field.Required && context.FieldControlModes[field.Name] != SPClientTemplates.ClientControlMode.DisplayForm)
        {
            resultHtml += (<any>String).format('<span title="{0}" class="ms-accentText"> *</span>', Strings.STS.L_RequiredField_Tooltip);
        }
        resultHtml += '</nobr></h3></td>';
        resultHtml += (<any>String).format('<td width="350" class="ms-formbody" valign="top">{0}</td>', context.RenderFieldByName(context, field.Name));
        resultHtml += '</tr>';
        return resultHtml;
    }

    function OnPostRender(context: SPClientTemplates.RenderContext_Form) {
        $("#tabbedForm").tabs();

        var prefix = context.FormUniqueId + context.FormContext.listAttributes.Id;
        $get(prefix + 'Author').innerHTML = author;
        $get(prefix + 'Created').innerHTML = created;
        $get(prefix + 'Editor').innerHTML = editor;
        $get(prefix + 'Modified').innerHTML = modified;
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