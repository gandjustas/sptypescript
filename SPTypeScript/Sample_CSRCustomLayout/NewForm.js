var _;
(function (_) {
    function init() {
        CSR.override(105).item(function (ctx) {
            var r = [];
            r.push('<table width="100%" class="ms-formtable" style="margin-top: 8px;" border="0" cellspacing="0" cellpadding="0">');
            r.push('<tbody>');
            var fields = ctx.ListSchema.Field;
            var attachmentsField;

            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (field.Name == 'Attachments') {
                    attachmentsField = field;
                    continue;
                }
                if (field.ReadOnlyField) {
                    continue;
                }
                addField(field);
            }
            if (attachmentsField) {
                addField(attachmentsField);
            }
            r.push('</tbody>');
            r.push('</table>');

            return r.join('');

            function addFieldHeader(field) {
                r.push('<td width="113" class="ms-formlabel" nowrap="true" valign="top">');
                r.push('<h3 class="ms-standardheader">');
                r.push('<nobr>');
                r.push(STSHtmlEncode(field.Title));
                if (field.Required) {
                    r.push('<span title="This field is required." class="ms-accentText"> *</span>');
                }
                r.push('</nobr>');

                r.push('</h3');
                r.push('</td>');
            }

            function addFieldControl(field) {
                r.push('<td width="350" class="ms-formbody" valign="top">');
                r.push(ctx.RenderFieldByName(ctx, field.Name));
                r.push('</td>');
            }

            function addField(field) {
                var isAttachment = field.Name == 'Attachments';

                //table row
                if (!isAttachment) {
                    r.push('<tr>');
                } else {
                    r.push('<tr id="idAttachmentsRow" style="display: none;">');
                }

                //title
                addFieldHeader(field);

                //value
                addFieldControl(field);

                if (isAttachment) {
                    r.push('<script type="text/javascript">if (typeof ShowAttachmentRows == "function") ShowAttachmentRows();</script>');
                }
                r.push('</tr>');
            }
        }).register();
    }

    SP.SOD.executeFunc("typescripttemplates.ts", 'CSR', init);

    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Sample_CSRCustomLayout/NewForm.js"), init);
    }, "sp.js");
})(_ || (_ = {}));
//# sourceMappingURL=NewForm.js.map
