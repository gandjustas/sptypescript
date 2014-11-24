var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SP;
(function (SP) {
    // Class
    var ClientContextPromise = (function (_super) {
        __extends(ClientContextPromise, _super);
        function ClientContextPromise(serverRelativeUrlOrFullUrl) {
            _super.call(this, serverRelativeUrlOrFullUrl);
        }
        /** To use this function, you must ensure that jQuery and CSOMPromise js files are loaded to the page */
        ClientContextPromise.prototype.executeQueryPromise = function () {
            var deferred = jQuery.Deferred();
            this.executeQueryAsync(function (sender, args) {
                deferred.resolve(sender, args);
            }, function (sender, args) {
                deferred.reject(sender, args);
            });
            return deferred.promise();
        };
        ClientContextPromise.get_current = function () {
            return new ClientContextPromise(_spPageContextInfo.siteServerRelativeUrl);
        };
        return ClientContextPromise;
    })(SP.ClientContext);
    SP.ClientContextPromise = ClientContextPromise;
})(SP || (SP = {}));
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("CSOMPromise.ts");
//# sourceMappingURL=CSOMPromise.js.map