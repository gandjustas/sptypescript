///<reference path="../Definitions/SharePoint.d.ts" />
SP.SOD.executeOrDelayUntilScriptLoaded(function () {
    var context = SP.ClientContext.get_current();

    var web = context.get_web();
    context.load(web);

    context.executeQueryAsync(function (sender, args) {
        var servicesManager = SP.WorkflowServices.WorkflowServicesManager.newObject(context, web);
        context.load(servicesManager);

        context.executeQueryAsync(function (sender, args) {
            var deploymentService = servicesManager.getWorkflowDeploymentService();
            context.load(deploymentService);
            var instanceService = servicesManager.getWorkflowInstanceService();
            context.load(instanceService);
            var subscriptionService = servicesManager.getWorkflowSubscriptionService();
            context.load(subscriptionService);

            context.executeQueryAsync(function (sender, args) {
                var designerActions = deploymentService.getDesignerActions(web);

                // perform other actions with services here
                // for example, get all workflow definitions:
                //var workflowDefinitions = deploymentService.enumerateDefinitions(false);
                //context.load(workflowDefinitions);
                context.executeQueryAsync(function (sender, args) {
                    $get('results').innerHTML = STSHtmlEncode(designerActions.get_value());
                    // example enumerating workflow definitions
                    //console.info("Workflow definitions:");
                    //var enumerator = workflowDefinitions.getEnumerator();
                    //while (enumerator.moveNext()) {
                    //    var definition = <SP.WorkflowServices.WorkflowDefinition>enumerator.get_current();
                    //    console.log(definition.get_displayName());
                    //}
                }, function (sender, args) {
                    alert("Error operating with services! " + args.get_message());
                });
            }, function (sender, args) {
                alert("Error loading services! " + args.get_message());
            });
        }, function (sender, args) {
            alert("Error loading serviceManager! " + args.get_message());
        });
    }, function (sender, args) {
        alert("Error loading web! " + args.get_message());
    });
}, "sp.workflowservices.js");
//# sourceMappingURL=WorkflowServices.js.map
