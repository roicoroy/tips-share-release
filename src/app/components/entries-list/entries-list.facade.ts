import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entry, Waiter } from 'src/app/models';
import { EntryState } from 'src/app/states/entries/entries.state';
import { WaitersState } from 'src/app/states/waiters/waiter.state';
import { IWaitersListModel } from '../waiters-list/waiters-list.facade';

export interface IEntriesListModel {
    entriesList: Entry[];
}

@Injectable({
    providedIn: 'root'
})
export class EntriesListFacade {

    @Select(EntryState.getEntryList) entriesList$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.entriesList$
            ]
        ).pipe(
            map((entriesList) => ({
                entriesList
            }))
        );
    }
}
