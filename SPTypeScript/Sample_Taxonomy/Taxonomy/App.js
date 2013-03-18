(function () {
    var context;
    var web;
    var site;
    var session;
    var termStore;
    var groups;
    $(document).ready(function () {
        context = SP.ClientContext.get_current();
        site = context.get_site();
        web = context.get_web();
        $('#listExisting').click(function () {
            listGroups();
        });
        $('#createTerms').click(function () {
            createTerms();
        });
    });
    function listGroups() {
        session = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
        termStore = session.getDefaultSiteCollectionTermStore();
        context.load(session);
        context.load(termStore);
        context.executeQueryAsync(onListTaxonomySession, onFailListTaxonomySession);
    }
    function onListTaxonomySession() {
        groups = termStore.get_groups();
        context.load(groups);
        context.executeQueryAsync(onRetrieveGroups, onFailRetrieveGroups);
    }
    function onRetrieveGroups() {
        $('#report').children().remove();
        var groupEnum = groups.getEnumerator();
        while(groupEnum.moveNext()) {
            (function () {
                var currentGroup = groupEnum.get_current();
                var groupName = document.createElement("div");
                groupName.setAttribute("style", "float:none;cursor:pointer");
                var groupID = currentGroup.get_id();
                groupName.setAttribute("id", groupID.toString());
                $(groupName).click(function () {
                    return showTermSets(groupID);
                });
                groupName.appendChild(document.createTextNode(currentGroup.get_name()));
                $('#report').append(groupName);
            })();
        }
    }
    function showTermSets(groupID) {
        var parentDiv = document.getElementById(groupID.toString());
        while(parentDiv.childNodes.length > 1) {
            parentDiv.removeChild(parentDiv.lastChild);
        }
        var currentGroup = groups.getById(groupID);
        context.load(currentGroup);
        context.executeQueryAsync(function () {
            var termSets = currentGroup.get_termSets();
            context.load(termSets);
            context.executeQueryAsync(function () {
                var termSetEnum = termSets.getEnumerator();
                while(termSetEnum.moveNext()) {
                    (function () {
                        var currentTermSet = termSetEnum.get_current();
                        var termSetName = document.createElement("div");
                        termSetName.appendChild(document.createTextNode(" + " + currentTermSet.get_name()));
                        termSetName.setAttribute("style", "float:none;cursor:pointer;");
                        var termSetID = currentTermSet.get_id();
                        termSetName.setAttribute("id", termSetID.toString());
                        $(termSetName).click(function () {
                            return showTerms(event, groupID, termSetID);
                        });
                        parentDiv.appendChild(termSetName);
                    })();
                }
            }, function () {
                parentDiv.appendChild(document.createTextNode("An error occurred in loading the term sets for this group"));
            });
        }, function () {
            parentDiv.appendChild(document.createTextNode("An error occurred in loading the term sets for this group"));
        });
    }
    function showTerms(event, groupID, termSetID) {
        event.cancelBubble = true;
        var parentDiv = document.getElementById(termSetID.toString());
        while(parentDiv.childNodes.length > 1) {
            parentDiv.removeChild(parentDiv.lastChild);
        }
        var currentGroup = groups.getById(groupID);
        context.load(currentGroup);
        context.executeQueryAsync(function () {
            var termSets = currentGroup.get_termSets();
            context.load(termSets);
            context.executeQueryAsync(function () {
                var currentTermSet = termSets.getById(termSetID);
                context.load(currentTermSet);
                context.executeQueryAsync(function () {
                    var terms = currentTermSet.get_terms();
                    context.load(terms);
                    context.executeQueryAsync(function () {
                        var termsEnum = terms.getEnumerator();
                        while(termsEnum.moveNext()) {
                            var currentTerm = termsEnum.get_current();
                            var term = document.createElement("div");
                            term.appendChild(document.createTextNode("    - " + currentTerm.get_name()));
                            term.setAttribute("style", "float:none;margin-left:10px;");
                            parentDiv.appendChild(term);
                        }
                    }, function () {
                        parentDiv.appendChild(document.createTextNode("An error occurred when trying to retrieve terms in this term set"));
                    });
                }, function () {
                    parentDiv.appendChild(document.createTextNode("An error occurred when trying to retrieve terms in this term set"));
                });
            }, function () {
                parentDiv.appendChild(document.createTextNode("An error occurred when trying to retrieve terms in this term set"));
            });
        }, function () {
            parentDiv.appendChild(document.createTextNode("An error occurred when trying to retrieve terms in this term set"));
        });
    }
    function onFailRetrieveGroups(sender, args) {
        $('#report').children().remove();
        $('#report').append("Failed to retrieve groups. Error:" + args.get_message());
    }
    function onFailListTaxonomySession(sender, args) {
        $('#report').children().remove();
        $('#report').append("Failed to get session. Error: " + args.get_message());
    }
    function createTerms() {
        session = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
        termStore = session.getDefaultSiteCollectionTermStore();
        context.load(session);
        context.load(termStore);
        context.executeQueryAsync(onGetTaxonomySession, onFailTaxonomySession);
    }
    function onGetTaxonomySession() {
        var guidGroupValue = SP.Guid.newGuid();
        var guidTermSetValue = SP.Guid.newGuid();
        var guidTerm1 = SP.Guid.newGuid();
        var guidTerm2 = SP.Guid.newGuid();
        var guidTerm3 = SP.Guid.newGuid();
        var guidTerm4 = SP.Guid.newGuid();
        var myGroup = termStore.createGroup("CustomTerms", guidGroupValue);
        var myTermSet = myGroup.createTermSet("Privacy", guidTermSetValue, 1033);
        myTermSet.createTerm("Top Secret", 1033, guidTerm1);
        myTermSet.createTerm("Company Confidential", 1033, guidTerm2);
        myTermSet.createTerm("Partners Only", 1033, guidTerm3);
        myTermSet.createTerm("Public", 1033, guidTerm4);
        groups = termStore.get_groups();
        context.load(groups);
        context.executeQueryAsync(onAddTerms, onFailAddTerms);
    }
    function onAddTerms() {
        listGroups();
    }
    function onFailAddTerms(sender, args) {
        $('#report').children().remove();
        $('#report').append("Failed to add terms. Error: " + args.get_message());
    }
    function onFailTaxonomySession(sender, args) {
        $('#report').children().remove();
        $('#report').append("Failed to get session. Error: " + args.get_message());
    }
})();
//@ sourceMappingURL=App.js.map
