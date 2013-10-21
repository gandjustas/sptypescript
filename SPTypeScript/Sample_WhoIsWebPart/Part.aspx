<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming runat="server" />

<html>
<head>
    <title>Who is?</title>
    <script src="/_layouts/15/MicrosoftAjax.js"></script>
    <SharePoint:ScriptLink runat="server" Name="core.js" />
    <SharePoint:ScriptLink runat="server" Name="mQuery.js" />
    
    <SharePoint:ScriptLink runat="server" Name="sp.ui.controls.js" />

    <SharePoint:ScriptLink runat="server" Name="sp.js" />

    <SharePoint:ScriptLink runat="server" Name="autofill.js" />
    <SharePoint:ScriptLink runat="server" Name="clientforms.js" />
    <SharePoint:ScriptLink runat="server" Name="clientpeoplepicker.js" />


    <SharePoint:ScriptLink Name="SP.UserProfiles.js" runat="server" OnDemand="false" Localizable="false" LoadAfterUI="true" />

    <script src="Part.js"></script>
    <link href="Part.css" rel="stylesheet" />
</head>
<body>
    <div id="navigation"></div>
    <h1 style="display:none" class="ms-accenttext" id="apppart-notification">
        Add "Who is?" app part to page on the host site.
    </h1>
    <div>
        <h3 id="editmodehdr" style="display: none">Part in edit mode.</h3>
    </div>

    <div id="content" >
        <div id="peoplePicker" style="margin-top: 13px; height: 20px; width: 300px;"></div>
        <div id="userInfo" style="margin-top: 20px; width: 330px;">
            <span id="pic" class="ms-floatLeft"></span>
            <div id="basicInfo" style="margin-top: 13px; margin-left: 100px; display: none; width: 230px;">
                <div><span id="name" class="ms-textLarge" style="position: relative;"></span></div>
                <div><span id="title" style="position: relative;"></span></div>
                <div><span id="department" style="position: relative;"></span></div>
                <div><span id="email" style="position: relative;"></span></div>
                <div><span id="phone" style="position: relative;"></span></div>
            </div>
        </div>
        <div id="detailInfo" style="margin-top: 13px; width: 330px; display: none;"></div>
    </div>
</body>
</html>
