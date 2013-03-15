<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.debug.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.debug.js"></script>

    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <h3>Typescript Definitions for SharePoint Samples</h3>
        <p>All these samples were created using Typescript. Examine project source code for details.</p>
        <ol>
            <li><a href="javascript:document.location = 'BasicTasksJSOM.html?'+document.URL.split('?')[1]">JSOM: Basic tasks in SharePoint using JSOM with TypeScript</a></li>
            <li><a href="../Lists/CustomList/Overridable.aspx">Client Side Rendering: Custom list view</a></li>
            <li><a href="../Lists/CustomFieldList">Client Side Rendering: Complexity field</a></li>
            <li><a href="../Lists/ConditionalFormattingTasksList">Client Side Rendering: Conditional formatting</a></li>
            <li><a href="../Pages_WorkflowServices">Workflow Services: Retrieve list of available workflow actions</a></li>
        </ol>
    </div>

</asp:Content>
