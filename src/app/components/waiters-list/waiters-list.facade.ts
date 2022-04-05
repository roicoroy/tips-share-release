import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Waiter } from 'src/app/models';
import { WaitersState } from 'src/app/states/waiters/waiter.state';

export interface IWaitersListModel {
    waiterList: Waiter[];
}

@Injectable({
    providedIn: 'root'
})
export class WaitersListFacade {

    @Select(WaitersState.getWaiterList) waitersList$: Observable<any>;

    readonly viewState$: Observable<IWaitersListModel>;

    constructor() {
        this.viewState$ = combineLatest(
            [this.waitersList$]
        ).pipe(
            map((waiterList) => ({
                waiterList
            }))
        );
    }
}
