<%-- Следующие 4 строки представляют собой директивы ASP.NET, необходимые при использовании компонентов SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <head> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.debug.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.debug.js"></script>

    <!-- Добавьте свои стили CSS в следующий файл -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Добавьте свой код JavaScript в следующий файл -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <body> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <p id="message">
            <!-- При выполнении приложения следующее содержимое будет заменено именем пользователя - см. App.js -->
            initializing...
        </p>
    </div>

</asp:Content>
