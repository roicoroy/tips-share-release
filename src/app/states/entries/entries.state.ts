import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Entry } from 'src/app/models';
import { EntriesService, TEAM_ENTRY } from 'src/app/services';
import { EntryActions } from './entries.actions';


export class EntryStateModel {
    entries: Entry[];
}
@State<EntryStateModel>({
    name: 'entries',
    defaults: {
        entries: []
    }
})
@Injectable()
export class EntryState {
    constructor(
        private entriesService: EntriesService,
    ) {
    }
    @Selector()
    static getEntryList(state: EntryStateModel) {
        // console.log(state.entries);

        return state.entries;
    }
    @Action(EntryActions.GetEntries)
    getEntries({ getState, setState }: StateContext<EntryStateModel>) {
        return this.entriesService.getEntries()
            .then((result: Entry[]) => {
                // console.log(result);
                if (result) {
                    const state = getState();
                    setState({
                        ...state,
                        entries: result,
                    });
                    // return this.storage.set(TEAM_ENTRY, result);
                }
            });
    }
    @Action(EntryActions.AddEntry)
    addEntry({ getState, patchState }: StateContext<EntryStateModel>, { payload }: EntryActions.AddEntry) {
        const updateState = payload;
        return this.entriesService.addEntry(payload).then(() => {
            const state = getState();
            patchState({
                entries: [...state.entries, updateState]
            });
        });
    }
    @Action(EntryActions.DeleteEntry)
    deleteWaiter({ getState, setState }: StateContext<EntryStateModel>, { id }: EntryActions.DeleteEntry) {
        return this.entriesService.deleteEntry(id).then(() => {
            const state = getState();
            const filteredArray = state.entries.filter((item) => item.id !== id);
            setState({
                ...state,
                entries: filteredArray,
            });
        });
    }
}

