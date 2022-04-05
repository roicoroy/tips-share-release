/* eslint-disable @typescript-eslint/no-namespace */
import { Point } from 'src/app/models';

export namespace PointActions {

    export class Add {
        static readonly type = '[Point] Add';
        constructor(public payload: Point) {
        }
    }
    export class Get {
        static readonly type = '[Point] Get';
    }
    export class Update {
        static readonly type = '[Point] Update';
        constructor(public payload: Point, public id: number) {
        }
    }
    export class Delete {
        static readonly type = '[Point] Delete';
        constructor(public id: number) {
        }
    }
    export class SetSelected {
        static readonly type = '[Point] Set';
        constructor(public payload: Point[]) {
        }
    }
}
