<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <style type="text/css">
        .client-autoFillContainer {
            z-index: 1;
            padding: 0px;
            display: none;
            cursor: default;
            max-width: 300px;
            min-width: 300px;
            position: absolute;
            border-color: rgb(198, 198, 198);
        }
    </style>

    <SharePoint:ScriptLink Name="autofill.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <script src="autofill.js" type="text/javascript"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">


    <table>
        <tr>
            <td>Country:</td>
            <td>
                <div style='position: relative;'>
                    <input type='text' id='clientName' />
                    <div class='sp-peoplepicker-autoFillContainer client-autoFillContainer' id='clientAutoCompleteValues'></div>
                </div>
            </td>
        </tr>
    </table>




</asp:Content>
