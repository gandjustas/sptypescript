/// <reference path="SP.d.ts" />

declare module Microsoft {
    export module Office {
        export module Server {
            export module ReputationModel {
                export class Reputation {
                    constructor();
                    static setLike(context: SP.ClientContext, listId: string, itemId: number, like: boolean): void;
                    static setRating(context: SP.ClientContext, listId: string, itemId: number, rating: number): void;
                }
            }
        }
    }
}