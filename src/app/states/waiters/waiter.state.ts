import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Storage } from '@ionic/storage-angular';
import { Waiter } from 'src/app/models';
import { IonStorageService } from 'src/app/services';
import { WaitersService } from 'src/app/services/waiters.service';
import { WaiterActions } from './waiter.action';

export const WAITERS_LIST_KEY = 'waitersList';
export class WaiterStateModel {
    waiters: Waiter[];
}
@State<WaiterStateModel>({
    name: 'waiters',
    defaults: {
        waiters: [],
    }
})
@Injectable()
export class WaitersState {
    static myService: any;
    constructor(
        private waiterService: WaitersService,
        // private storage: Storage,
        // private ionStorageService: IonStorageService,
    ) {
    }
    @Selector()
    static getWaiterList(state: WaiterStateModel) {
        return state.waiters;
    }
    @Action(WaiterActions.GetWaitersList)
    getWaitersList({ getState, setState }: StateContext<WaiterStateModel>) {
        return this.waiterService.geWaitersList()
            .then((result: Waiter[]) => {
                // console.log(result);
                if (result) {
                    const state = getState();
                    setState({
                        ...state,
                        waiters: result,
                    });
                    // return this.storage.set(TEAM_ENTRY, result);
                }
            });
    }
    @Action(WaiterActions.Add)
    addWaiter({ getState, patchState }: StateContext<WaiterStateModel>, { payload }: WaiterActions.Add) {
        const updateState = payload;
        return this.waiterService.addItem(payload).then(() => {
            const state = getState();
            patchState({
                waiters: [...state.waiters, updateState]
            });
        });
    }
    @Action(WaiterActions.Update)
    updateWaiter(ctx: StateContext<WaiterStateModel>, { payload, id }: WaiterActions.Update) {
        return this.waiterService.updateItem(payload).then(() => {
            const state = ctx.getState();
            const waiters = [...state.waiters];
            const todoIndex = waiters.findIndex((item) => item.id === id);
            waiters[todoIndex] = payload;
            ctx.setState({
                ...state,
                waiters,
            });
        });
    }
    @Action(WaiterActions.UpdateWaiterPoints)
    updateWaiterPoints(ctx: StateContext<WaiterStateModel>, { payload, id }: WaiterActions.Update) {
        return this.waiterService.updateWaiterPoint(payload).then(() => {

        });
    }
    @Action(WaiterActions.Delete)
    deleteWaiter({ getState, setState }: StateContext<WaiterStateModel>, { id }: WaiterActions.Delete) {
        return this.waiterService.deleteItem(id).then(() => {
            const state = getState();
            const filteredArray = state.waiters.filter((item) => item.id !== id);
            setState({
                ...state,
                waiters: filteredArray,
            });
        });
    }
}
