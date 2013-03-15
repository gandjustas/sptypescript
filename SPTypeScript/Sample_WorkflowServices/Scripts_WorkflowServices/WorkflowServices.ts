///<reference path="../../definitions/jquery.d.ts" />
///<reference path="../../definitions/SP.d.ts" />
///<reference path="../../definitions/SP.Init.d.ts" />
///<reference path="../../definitions/SP.WorkflowServices.d.ts" />

SP.SOD.executeOrDelayUntilScriptLoaded(() => {
    var context = SP.ClientContext.get_current();

    var web = context.get_web();
    context.load(web);

    context.executeQueryAsync((sender, args) => {

        var servicesManager = SP.WorkflowServices.WorkflowServicesManager.newObject(context, web);
        context.load(servicesManager);

        context.executeQueryAsync((sender, args) => {

            var deploymentService = servicesManager.getWorkflowDeploymentService();
            context.load(deploymentService);
            var instanceService = servicesManager.getWorkflowInstanceService();
            context.load(instanceService);
            var subscriptionService = servicesManager.getWorkflowSubscriptionService();
            context.load(subscriptionService);

            context.executeQueryAsync((sender, args) => {

                var designerActions = deploymentService.getDesignerActions(web);
                // perform other actions with services here
                // for example, get all workflow definitions:
                //var workflowDefinitions = deploymentService.enumerateDefinitions(false);
                //context.load(workflowDefinitions);

                context.executeQueryAsync((sender, args) => {

                    $('#activities').text(designerActions.get_value());
                    //console.info("Workflow definitions:");
                    //var enumerator = workflowDefinitions.getEnumerator();
                    //while (enumerator.moveNext()) {
                    //    var definition = <SP.WorkflowServices.WorkflowDefinition>enumerator.get_current();
                    //    console.log(definition.get_displayName());
                    //}

                }, (sender, args) => { alert("Error operating with services! " + args.get_message()) });

            }, (sender, args) => { alert("Error loading services! " + args.get_message()) });

        }, (sender, args) => { alert("Error loading serviceManager! " + args.get_message()) });

    }, (sender, args) => { alert("Error loading web! " + args.get_message()) });

}, "sp.workflowservices.js");
