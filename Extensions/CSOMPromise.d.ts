declare module SP {
    class ClientContextPromise extends SP.ClientContext {
        /** To use this function, you must ensure that jQuery and CSOMPromise js files are loaded to the page */
        executeQueryPromise(): JQueryPromise<any>;
        constructor(serverRelativeUrlOrFullUrl: string);
        static get_current(): ClientContextPromise;
    }
}
