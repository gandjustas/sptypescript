<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="mquery.js" runat="server" OnDemand="false" LoadAfterUI="false" Localizable="false" />
    <script src="mquery.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
<style>
    .spdev-main-cnt td {
        vertical-align: top;
    }

    .spdev-rep-tb-cnt {
        border: 1px #dedede solid;
        padding: 5px;
    }

    .value-w, .value-h, .value-id {
        width: 50px;
    }
</style>

<script type="text/html" dynamic-table-template-id="name-value">
    <tr>
        <td>
            <input type='text' class='value-name' />
        </td>
        <td>
            <input type='text' class='value-value' />
        </td>
        <td><a href='#' class='spdev-rep-tb-del-override'>delete</a></td>
    </tr>
</script>

<script type="text/html" dynamic-table-template-id="whd-value">
    <tr>
        <td>
            <input type='text' class='value-id' />
        </td>
        <td>
            <input type='text' class='value-name' />
        </td>
        <td>
            <input type='text' class='value-w' />
        </td>
        <td>
            <input type='text' class='value-h' />
        </td>
        <td>
            <input type='text' class='value-d' />
        </td>
        <td><a href='#' class='spdev-rep-tb-del-override'>delete</a></td>
    </tr>
</script>

<table class='spdev-main-cnt'>
    <tr>
        <td>
            <div class='spdev-rep-tb-cnt' style='display: none'>

                <table class='spdev-rep-tb' template-id='name-value'>
                    <thead>
                        <td>Name</td>
                        <td>Value</td>
                        <td>Action</td>
                    </thead>
                </table>
                <div>
                    <a href='#' class='spdev-rep-tb-add'>add record</a>
                </div>
            </div>

        </td>
    </tr>
    <tr>
        <td>
            <div class='spdev-rep-tb-cnt' style='display: none'>
                <table class='spdev-rep-tb' template-id='whd-value'>
                    <thead>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Width</td>
                        <td>Height</td>
                        <td>Description</td>
                        <td>Action</td>
                    </thead>
                </table>
                <div>
                    <a href='#' class='spdev-rep-tb-add'>add record</a>
                </div>
            </div>
        </td>
    </tr>
</table>


</asp:Content>
