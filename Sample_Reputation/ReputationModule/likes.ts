module SampleReputation {

    interface MyList extends SPClientTemplates.RenderContext_InView {
        listId: string;
    }

    class MyItem {

        id: number;
        title: string;
        likesCount: number;
        isLikedByCurrentUser: boolean;

        constructor(public row: SPClientTemplates.Item) {
            this.id = parseInt(row['ID']);
            this.title = row['Title'];
            this.likesCount = parseInt(row['LikesCount']) || 0;
            this.isLikedByCurrentUser = this.getLike(row['LikedBy']);
        }

        private getLike(likedBy:MyItem[]): boolean {
            if (likedBy && likedBy.length > 0) {
                for (var i = 0; i < likedBy.length; i++) {
                    if (likedBy[i].id == _spPageContextInfo.userId) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    function init() {
        SP.SOD.registerSod('reputation.js', '/_layouts/15/reputation.js');
        SP.SOD.registerSod('sp-ts-csr.ts', '/SPTypeScript/Extensions/sp-ts-csr.js');
        SP.SOD.executeFunc('sp-ts-csr.ts', 'CSR', () => {
            CSR.override(10004, 1)
                .onPreRender((ctx: MyList) => {
                    ctx.listId = ctx.listName.substring(1, 37);
                })
                .header('<ul>')
                .body(renderTemplate)
                .footer('</ul>')
                .register();
        });

        SP.SOD.execute('mQuery.js', 'm$.ready', () => {
            RegisterModuleInit('/SPTypeScript/ReputationModule/likes.js', init);
        });


        SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('likes.js');
    }

    function renderTemplate(ctx: MyList) {
        var rows = ctx.ListData.Row;
        var result = '';
        for (var i = 0; i < rows.length; i++) {
            var item = new MyItem(rows[i]);
            result += '\
			    <li>' + item.title +'\
					<a style="cursor: pointer;" onclick="SampleReputation.setLike(' + item.id + ', \'' + ctx.listId + '\')" >\
						<span id="likesCountText' + item.id + '">' + getLikeText(item.isLikedByCurrentUser) + '</span><span id="likesCount' + item.id + '">' + item.likesCount + '</span>\
					</a>\
			    </li>';
        }
        return result;
    }

    function getLikeText(isLikedByCurrentUser: boolean) {
        return isLikedByCurrentUser ? '\u2665' : '\u2661';
    }

    export function setLike(itemId: number, listId: string): void {
        var context = SP.ClientContext.get_current();
        var isLiked = m$('#likesCountText' + itemId)[0].textContent == '\u2661';
        SP.SOD.executeFunc('reputation.js', 'Microsoft.Office.Server.ReputationModel.Reputation', function () {
            Microsoft.Office.Server.ReputationModel.Reputation.setLike(context, listId, itemId, isLiked);
            context.executeQueryAsync(
                () => {
                    m$('#likesCountText' + itemId)[0].textContent = getLikeText(isLiked);
                    var likesCount = parseInt(m$('#likesCount' + itemId)[0].textContent);
                    m$('#likesCount' + itemId)[0].textContent = (isLiked ? likesCount + 1 : likesCount - 1).toString();
                },
                (sender, args) => {
                    alert(args.get_message());
                });
        });
    }

    init();
}

