/// <reference path="SP.d.ts"/>

declare module SP.WorkflowServices {

    export enum WorkflowStatus {
        notStarted = 0,
        started = 1,
        suspended = 2,
        canceling = 3,
        canceled = 4,
        terminated = 5,
        completed = 6,
        notSpecified = 7,
        invalid = 8
    }

    // TODO: comments, types
    export class InteropService extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext, objectPath: SP.ObjectPathStaticProperty);
        static getCurrent(context: SP.ClientRuntimeContext): InteropService;
        enableEvents(listId, itemGuid): void;
        disableEvents(listId, itemGuid): void;
        startWorkflow(associationName, correlationId, listId, itemGuid, workflowParameters): SP.GuidResult;
        cancelWorkflow(instanceId): void;
    }

    /** Represents a workflow definition and associated properties. */
    export class WorkflowDefinition extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext);
        /** Url of the association form */
        get_associationUrl(): string;
        /** Url of the association form */
        set_associationUrl(value: string): string;
        get_description(): string;
        set_description(value: string): string;
        get_displayName(): string;
        set_displayName(value: string): string;
        /** Identifier for a draft version of the workflow definition */
        get_draftVersion(): string;
        /** Identifier for a draft version of the workflow definition */
        set_draftVersion(value: string): string;
        /** Defines the fields of the workflow initiation forms and association forms (CAML string)  */
        get_formField(): string;
        /** Defines the fields of the workflow initiation forms and association forms (CAML string)  */
        set_formField(value: string): string;
        get_id(): string;
        set_id(value: string): string;
        get_initiationUrl(): string;
        set_initiationUrl(value: string): string;
        /** Gets custom properties of the workflow definition */
        get_properties(): { [propertyName: string]: any; };
        /** true if the workflow definition has been published to the external workflow host; false if the workflow definition is only saved on the site  */
        get_published(): bool;
        /** Determines whether to automatically generate an association form for this workflow.
            If the value is true, and the associationUrl is not already set, a default association form is automatically generated for the workflow when saveDefinition is called.  */
        get_requiresAssociationForm(): bool;
        /** Determines whether to automatically generate an association form for this workflow.
            If the value is true, and the associationUrl is not already set, a default association form is automatically generated for the workflow when saveDefinition is called.  */
        set_requiresAssociationForm(value: bool): bool;
        /** Determines whether to automatically generate an initiation form for this workflow.
            If the value is true, and the initiationUrl is not already set, a default initiation form is automatically generated for the workflow when saveDefinition is called.  */
        get_requiresInitiationForm(): bool;
        /** Determines whether to automatically generate an initiation form for this workflow.
            If the value is true, and the initiationUrl is not already set, a default initiation form is automatically generated for the workflow when saveDefinition is called.  */
        set_requiresInitiationForm(value: bool): bool;
        /** RestrictToScope is a GUID value, used in conjunction with the RestrictToType property to further restrict the scope of the definition.
            For example, if the RestrictToType is "List", then setting the RestrictToScope to a particular list identifier limits the definition to be associable only to the specified list.
            If the RestrictToType is "List" but the RestrictToScope is null or the empty string, then the definition is associable to any list. */
        get_restrictScope(): string;
        /** RestrictToScope is a GUID value, used in conjunction with the RestrictToType property to further restrict the scope of the definition.
            For example, if the RestrictToType is "List", then setting the RestrictToScope to a particular list identifier limits the definition to be associable only to the specified list.
            If the RestrictToType is "List" but the RestrictToScope is null or the empty string, then the definition is associable to any list. */
        set_restrictScope(value: string): string;
        /** RestrictToType determines the possible event source type for a workflow subscription that uses this definition.
            Possible values include "List", "Site", the empty string, or null.  */
        get_restrictToType(): string;
        /** RestrictToType determines the possible event source type for a workflow subscription that uses this definition.
            Possible values include "List", "Site", the empty string, or null.  */
        set_restrictToType(value: string): string;
        /** XAML definition of the workflow */
        get_xaml(): string;
        /** XAML definition of the workflow */
        set_xaml(value: string): string;
        /** This method adds a key-value pair (propertyName, value) to the workflow definition object’s property bag.  */
        setProperty(propertyName: string, value: string): void;
        /** This method is internal and is not intended to be used in your code. */
        initPropertiesFromJson(parentNode: any): void;
    }

    /** Represents a collection of WorkflowDefinition objects */
    export class WorkflowDefinitionCollection extends SP.ClientObjectCollection {
        itemAt(index: number): WorkflowDefinition;
        get_item(index: number): WorkflowDefinition;
        /** returns SP.WorkflowDefinition class */
        get_childItemType(): any;
    }

    // TODO: comments, types
    export class WorkflowDeploymentService extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext, objectPath: SP.ObjectPathStaticProperty);
        getDesignerActions(web: SP.Web): any;
        getActivitySignatures(lastChanged): any;
        saveDefinition(definition: WorkflowDefinition): SP.GuidResult;
        validateActivity(activityXaml: string): SP.StringResult;
        publishDefinition(definitionId: string): void;
        deprecateDefinition(definitionId: string): void;
        deleteDefinition(definitionId: string): void;
        enumerateDefinitions(publishedOnly: bool): WorkflowDefinitionCollection;
        getDefinition(definitionId): WorkflowDefinition;
        saveCollateral(workflowDefinitionId: string, leafFileName, fileContent): void;
        deleteCollateral(workflowDefinitionId, leafFileName): void;
        getCollateralUri(workflowDefinitionId, leafFileName): SP.StringResult;
        packageDefinition(definitionId, packageDefaultFilename, packageTitle, packageDescription): SP.StringResult;
    }

    /** Represents an instance of a workflow association that performs on a list item the process that is defined in a workflow template */
    export class WorkflowInstance extends SP.ClientObject {
        /** Contains the error string or exception information if the workflow faults. */
        get_faultInfo(): string;
        /** Unique identifier (GUID) for the workflow instance */
        get_id(): string;
        /** Gets the Coordinated Universal Time (UTC) when this workflow instance was created. */
        get_instanceCreated(): string;
        /** Gets the Coordinated Universal Time (UTC) when the workflow instance state was last persisted */
        get_lastUpdated(): string;
        /** Specifies properties of this workflow instance */
        get_properties(): { [name: string]: string; };
        /** Returns runtime status of the workflow instance */
        get_status(): any;
        /** Specifies the custom status set by workflow authors. */
        get_userStatus(): string;
        /** Specifies the custom status set by workflow authors. */
        set_userStatus(value: string): string;
        /** Gets the unique identifier (GUID) of the subscription that instantiates the WorkflowInstance */
        get_workflowSubscriptionId(): string;
        /** This method is internal and is not intended to be used in your code. */
        initPropertiesFromJson(parentNode: any): void;

    }

    /** Represents a collection of WorkflowInstance objects */
    export class WorkflowInstanceCollection extends SP.ClientObjectCollection {
        itemAt(index: number): WorkflowInstance;
        get_item(index: number): WorkflowInstance;
        /** returns SP.WorkflowInstance class */
        get_childItemType(): any;
    }

    // TODO: comments, types
    export class WorkflowInstanceService extends SP.ClientObject {
        startWorkflow(subscription: WorkflowSubscription, payload): SP.GuidResult;
        startWorkflowOnListItem(subscription: WorkflowSubscription, itemId, payload): SP.GuidResult;
        getInstance(instanceId): WorkflowInstance;
        enumerate(parentSubscription: WorkflowSubscription): WorkflowInstanceCollection;
        enumerateWithOffset(parentSubscription: WorkflowSubscription, offset): WorkflowInstanceCollection;
        enumerateInstancesForListItem(listId, itemId): WorkflowInstanceCollection;
        enumerateInstancesForListItemWithOffset(listId, itemId, offset): WorkflowInstanceCollection;
        enumerateInstancesForSite(): WorkflowInstanceCollection;
        enumerateInstancesForSiteWithOffset(offset): WorkflowInstanceCollection;
        countInstances(parentSubscription: WorkflowSubscription): SP.IntResult;
        countInstancesWithStatus(parentSubscription: WorkflowSubscription, status): SP.IntResult;
        cancelWorkflow(instance: WorkflowInstance): void;
        terminateWorkflow(instance: WorkflowInstance): void;
        suspendWorkflow(instance: WorkflowInstance): void;
        resumeWorkflow(instance: WorkflowInstance): void;
        publishCustomEvent(instance: WorkflowInstance, eventName, payload): void;
        getDebugInfo(instance: WorkflowInstance): SP.StringResult;
    }

    /** Describes the workflow host configuration states and provides service objects that interact with the workflow */
    export class WorkflowServiceManager extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext, web: SP.Web);
        static newObject(context: SP.ClientRuntimeContext, web: SP.Web): WorkflowServiceManager;
        /** The current application identifier.*/
        get_appId(): string;
        /** Indicates whether this workflow service is actively connected to a workflow host. */
        get_isConnected(): bool;
        /** Returns the path of the current scope in the workflow host. */
        get_scopePath(): string;
        getWorkflowDeploymentService(): WorkflowDeploymentService;
        getWorkflowInstanceService(): WorkflowInstanceService;
        getWorkflowInteropService(): InteropService;
        getWorkflowSubscriptionService(): WorkflowSubscriptionService;
        /** This method is internal and is not intended to be used in your code. */
        initPropertiesFromJson(parentNode: any): void;
    }

    // TODO: comments, types
    export class WorkflowSubscription extends SP.ClientObject {
        get_definitionId();
        set_definitionId(value);
        get_enabled();
        set_enabled(value);
        get_eventSourceId();
        set_eventSourceId(value);
        get_eventTypes();
        set_eventTypes(value);
        get_id();
        set_id(value);
        get_manualStartBypassesActivationLimit();
        set_manualStartBypassesActivationLimit(value);
        get_name();
        set_name(value);
        get_propertyDefinitions();
        get_statusFieldName();
        set_statusFieldName(value);
        /** This method adds a key-value pair (propertyName, value) to the workflow subscription object’s property bag.  */
        setProperty(propertyName: string, value: string): void;
        /** This method is internal and is not intended to be used in your code. */
        initPropertiesFromJson(parentNode: any): void;
    }

    /** Represents a collection of WorkflowSubscription objects */
    export class WorkflowSubscriptionCollection extends SP.ClientObjectCollection {
        itemAt(index: number): WorkflowSubscription;
        get_item(index: number): WorkflowSubscription;
        /** returns SP.WorkflowInstance class */
        get_childItemType(): any;
    }

    export class WorkflowSubscriptionService extends SP.ClientObject {
        constructor(context: SP.ClientRuntimeContext, objectPath: SP.ObjectPathStaticProperty);
        static getCurrent(context: SP.ClientRuntimeContext): WorkflowSubscriptionService;
        /** Creates a workflow subscription for a workflow, and returns the unique identifier of the new subscription. */
        publishSubscription(subscription: WorkflowSubscription): SP.GuidResult;
        /** Creates a workflow subscription for a workflow and if necessary an event receiver on the specified list.
            Also writes an EventSourceId that matches the list as the event source.
            Returns the unique identifier of the new subscription.
            @param listId Unique identifier (GUID) for the specified list. */
        publishSubscriptionForList(subscription: WorkflowSubscription, listId: string): SP.GuidResult;
        /** Ensures that an event receiver will monitor a list for the specified event.
            @param listId Unique identifier (GUID) for the specified list.
            @eventName eventName The name of the event to be monitored. */
        registerInterestInList(listId: string, eventName: string): void;
        /** Removes monitoring for an event receiver on the specified list with the specified event.
            @param listId GUID of the list containing the event receiver to be unregistered.
            @eventName eventName The name of the event to be removed. */
        unregisterInterestInList(listId: string, eventName: string): void;
        getSubscription(subscriptionId): WorkflowSubscription;
        deleteSubscription(subscriptionId): WorkflowSubscription;
        /** Retrieves workflow subscriptions that contains all of the workflow subscriptions on the Web  */
        enumerateSubscriptions(): WorkflowSubscriptionCollection;
        /** Retrieves workflow subscriptions based on workflow definition */
        enumerateSubscriptionsByDefinition(definitionId: string): WorkflowSubscriptionCollection;
        /** Retrieves workflow subscriptions based on the specified EventSourceId */
        enumerateSubscriptionsByEventSource(eventSourceId: string): WorkflowSubscriptionCollection;
        /** Retrieves workflow subscriptions based on the specified list.
            @param listId The unique identifier (GUID) of the list on which to filter the subscriptions. */
        enumerateSubscriptionsByList(listId: string): WorkflowSubscriptionCollection;
    }

}
