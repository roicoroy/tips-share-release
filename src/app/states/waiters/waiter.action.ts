/* eslint-disable @typescript-eslint/no-namespace */
import { Waiter } from 'src/app/models';

export namespace WaiterActions {

    export class Add {
        static readonly type = '[Waiter] Add';
        constructor(public payload: Waiter) {
        }
    }
    export class GetWaitersList {
        static readonly type = '[Waiter] GetWaitersList';
    }
    export class Get {
        static readonly type = '[Waiter] Get';
    }
    export class Update {
        static readonly type = '[Waiter] Update';
        constructor(public payload: Waiter, public id?: number) {
        }
    }
    export class UpdateWaiterPoints {
        static readonly type = '[Waiter] Update Waiter Points';
        constructor(public payload: Waiter, public id?: number) {
        }
    }
    export class Delete {
        static readonly type = '[Waiter] Delete';
        constructor(public id: number) {
        }
    }
    export class SetSelected {
        static readonly type = '[Waiter] Set';
        constructor(public payload: Waiter) {
        }
    }
}
