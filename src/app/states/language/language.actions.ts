/* eslint-disable @typescript-eslint/no-namespace */
export namespace LanguageActions {

    export class Add {
        static readonly type = '[Langague] Add';
        constructor(public payload: any) {
        }
    }
    export class Get {
        static readonly type = '[Langague] Get';
    }
}
