/* eslint-disable @typescript-eslint/no-namespace */

import { Entry } from 'src/app/models';


export namespace EntryActions {

    export class AddEntry {
        static readonly type = '[Entry] Add';
        constructor(public payload: Entry) {
        }
    }
    export class GetEntries {
        static readonly type = '[Entry] Get';
    }
    export class UpdateEntry {
        static readonly type = '[Entry] Update';
        constructor(public payload: Entry, public id: number) {
        }
    }
    export class DeleteEntry {
        static readonly type = '[Entry] Delete';
        constructor(public id: number) {
        }
    }
}
