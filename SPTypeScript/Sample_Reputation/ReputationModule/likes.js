var SampleReputation;
(function (SampleReputation) {
    var MyItem = (function () {
        function MyItem(row) {
            this.row = row;
            this.id = parseInt(row['ID']);
            this.title = row['Title'];
            this.likesCount = parseInt(row['LikesCount']) || 0;
            this.isLikedByCurrentUser = this.getLike(row['LikedBy']);
        }
        MyItem.prototype.getLike = function (likedBy) {
            if (likedBy && likedBy.length > 0) {
                for (var i = 0; i < likedBy.length; i++) {
                    if (likedBy[i].id == _spPageContextInfo.userId) {
                        return true;
                    }
                }
            }
            return false;
        };
        return MyItem;
    })();
    function init() {
        SP.SOD.registerSod('reputation.js', '/_layouts/15/reputation.js');
        SP.SOD.registerSod('typescripttemplates.ts', '/SPTypeScript/Extensions/typescripttemplates.js');
        SP.SOD.executeFunc('typescripttemplates.ts', 'CSR', function () {
            CSR.override(10004, 1)
                .onPreRender(function (ctx) {
                ctx.listId = ctx.listName.substring(1, 37);
            })
                .header('<ul>')
                .body(renderTemplate)
                .footer('</ul>')
                .register();
        });
        SP.SOD.execute('mQuery.js', 'm$.ready', function () {
            RegisterModuleInit('/SPTypeScript/ReputationModule/likes.js', init);
        });
        SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('likes.js');
    }
    function renderTemplate(ctx) {
        var rows = ctx.ListData.Row;
        var result = '';
        for (var i = 0; i < rows.length; i++) {
            var item = new MyItem(rows[i]);
            result += '\
			    <li>' + item.title + '\
					<a style="cursor: pointer;" onclick="SampleReputation.setLike(' + item.id + ', \'' + ctx.listId + '\')" >\
						<span id="likesCountText' + item.id + '">' + getLikeText(item.isLikedByCurrentUser) + '</span><span id="likesCount' + item.id + '">' + item.likesCount + '</span>\
					</a>\
			    </li>';
        }
        return result;
    }
    function getLikeText(isLikedByCurrentUser) {
        return isLikedByCurrentUser ? '\u2665' : '\u2661';
    }
    function setLike(itemId, listId) {
        var context = SP.ClientContext.get_current();
        var isLiked = m$('#likesCountText' + itemId)[0].textContent == '\u2661';
        SP.SOD.executeFunc('reputation.js', 'Microsoft.Office.Server.ReputationModel.Reputation', function () {
            Microsoft.Office.Server.ReputationModel.Reputation.setLike(context, listId, itemId, isLiked);
            context.executeQueryAsync(function () {
                m$('#likesCountText' + itemId)[0].textContent = getLikeText(isLiked);
                var likesCount = parseInt(m$('#likesCount' + itemId)[0].textContent);
                m$('#likesCount' + itemId)[0].textContent = (isLiked ? likesCount + 1 : likesCount - 1).toString();
            }, function (sender, args) {
                alert(args.get_message());
            });
        });
    }
    SampleReputation.setLike = setLike;
    init();
})(SampleReputation || (SampleReputation = {}));
//# sourceMappingURL=likes.js.map