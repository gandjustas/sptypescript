var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SP;
(function (SP) {
    var ClientContextPromise = (function (_super) {
        __extends(ClientContextPromise, _super);
        function ClientContextPromise() {
            _super.apply(this, arguments);

        }
        ClientContextPromise.prototype.executeQueryPromise = function () {
            var deferred = new jQuery.Deferred();
            this.executeQueryAsync(function (sender, args) {
                deferred.resolve(sender, args);
            }, function (sender, args) {
                deferred.reject(sender, args);
            });
            return deferred.promise();
        };
        return ClientContextPromise;
    })(SP.ClientContext);
    SP.ClientContextPromise = ClientContextPromise;    
})(SP || (SP = {}));
//@ sourceMappingURL=CSOMPromise.js.map
