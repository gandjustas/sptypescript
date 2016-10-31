<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="SP.js" runat="server" OnDemand="false" Localizable="false" LoadAfterUI="true" />
    <SharePoint:ScriptLink Name="SP.UserProfiles.js" runat="server" OnDemand="false" Localizable="false" LoadAfterUI="true" />

    <script type="text/javascript" src="UserProfiles.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="ms-textXLarge">For futher demo add "Who Is?" app part to page on host web.</div>

    <div>
        <div id="results">
            Loading data from service...
        </div>
    </div>

</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    My User Profile Properties
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    My User Profile Properties
</asp:Content>