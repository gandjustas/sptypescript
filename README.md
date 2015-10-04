#SharePoint TypeScript
TypeScript declarations for SharePoint JavaScript Object Model (JSOM) + lots of samples.

##Getting started
Install NuGet package using package manager
```powershell
PM> Install-Package sharepoint.TypeScript.DefinitelyTyped
```

or directly from [DefinitelyTyped](../../borisyankov/DefinitelyTyped) repository using [tsd](http://definitelytyped.org/tsd/) tool
```bat
tsd install sharepoint --save
```

If you are using Visual Studio SharePoint projects you need to enable TypeScript build actions:
1. Edit csproj source file (right-click on your project in VS -> Unload project, right click again -> Edit YourProject.csproj)
2. Include the following code: 
```xml
<Import Project="$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets" />
```
3. Reload project
4. Don't forget to set "Deployment Type" to "No Deployment" for **.d.ts** files

## typescripttemplates.ts 
TypeScript Templates is a set of Cleint-Side Rendering (CSR) templates and helper functions to change behaviour of standard forms.
Grab the file [typescripttemplates.ts](SPTypeScript/Extensions/typescripttemplates.ts)

##Definitions coverage
1. JavaScript Side Object Model (JSOM) core classes
  * SP namespace, core classes (sp.js, SP.Runtime.js)
  * SP.WebParts namespace (sp.js)
  * SP.Utilities namespace (sp.js)
  * SP.SOD namespace (init.js, included on every SharePoint page) 
  * SP.RequestExecutor class (sp.requestexecutor.js)
  * mQuery framework (mquery.js, SharePoint 2013+ analogue for jQuery)
  * SP.ListOperation (sp.core.js)
  * Global variables - `_spPageContextInfo`, `_spBodyOnLoadFunctions`, `_spBodyOnLoadComplete`

2. Social object library
  * SP.Sharing namespace (sp.js)
  * SP.UserProfiles namespace (sp.userprofiles.js)
  * SP.Social namespace (sp.userprofiles.js)
  * Reputation model (reputation.js)

3. SharePoint Client Side Rendering 
  * SPClientTemplates module (clienttemplates.js and clinetforms.js)
  * Default form Templates (from clientsforms.js) 

4. Workflows
  * SP.Workflow (sp.js) - 2010 style workflows
  * SP.WorkflowServices (sp.workflowservices.js) - 2013 style workflows 

5. SharePoint UI elements:
  * SP.UI.Notify (sp.core.js, sp.js)
  * SP.UI.Status (sp.core.js, sp.js)
  * SP.UI.Menu (sp.core.js, sp.js)
  * SP.UI.ModalDialog (sp.ui.dialog.js)
  * SP.UI.ApplicationPages (sp.js)
  * CalloutManager (callout.js)
  * SP.UI.Controls (sp.ui.controls.js)
  * SPClientAutoFill (autofill.js)
  * SPAnimation (sp.core.js)
  * Client People Picker (clientpeoplepicker.js)

6. SharePoint Search
  *  Microsoft.SharePoint.Client.Search (sp.search.js) 

7. Business Connectivity Services
  * SP.BusinessData (sp.js)

8. SharePoint Managed Metadata
  * SP.Taxonomy (sp.taxonomy.js)

9. SharePoint Publishing Infrastructure
  * SP.Publishing (sp.publishing.js)
  * SP.DocumentManagement (sp.documentmanagement.js)
  * SP.Policy (sp.policy.js)

10. SharePoint online core library extensions

11. JsGrid\SPGantt (incomplete)

##Samples
Besides the definitions, the project also contains many great samples of SharePoint JSOM usage. No doubt, all of them are made with TypeScript!

Currently we have the following samples:

1. JSOM: Basic tasks in SharePoint using JSOM with TypeScript
2. JSOM: Working with taxonomy with TypeScript
3. mQuery: Sample dynamic table
4. Client controls: Autofill sample
5. Client Side Rendering: Custom list view
6. Client Side Rendering: Complexity field
7. Client Side Rendering: Conditional formatting
8. Client Side Rendering: Form with tabs
9. Client Side Rendering: Custom Field with Validator
10. Client Side Rendering: Lookup field with search
11. Workflow Services: Retrieve list of available workflow actions
12. Search: Using search JSOM with TypeScript
13. User Profiles: Retrieve properties for current user
14. Social: Determine if the current user follows a site and follow it, if not yet
15. App Part: App part with people picker
16. Reputation: like items in list (thanks to Evgeny Vilkov!)
17. Publishing: Create a publishing page

Samples project is made as a SharePoint-hosted app. Download project, open .sln file and run.

##Authors
Stanislav Vyshchepan is SharePoint Server MVP, author, speaker, trainer, CEO and founder of own consulting company in Russia.

* Blog: http://gandjustas.blogspot.ru (in Russian)
* Twitter: @gandjustas
* E-mail: stanislav.v@outlook.com
* Company site: http://vnextsoft.ru

Andrey Markeev is SharePoint Server MVP, online expert, active blogger, published author, frequent speaker. He works as a Senior SharePoint Consultant at NED Software Consulting Oy (Helsinki, Finland).

* Blog: http://markeev.com
* Twitter: @amarkeev



