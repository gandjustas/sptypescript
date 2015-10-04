#Project Description
TypeScript declarations for SharePoint JavaScript Object Model (JSOM) + lots of samples.

#Getting started
Install NuGet package using package manager
```powershell
PM> Install-Package sharepoint.TypeScript.DefinitelyTyped
```

or directly from DefinitelyTyped repository using [tsd] (http://definitelytyped.org/tsd/) tool
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