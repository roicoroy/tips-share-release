import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LanguageService } from 'src/app/services';
import { LanguageActions } from './language.actions';

export class LanguageStateModel {
    language: string;
}
@State<LanguageStateModel>({
    name: 'languages',
    defaults: {
        language: null,
    }
})
@Injectable()
export class LanguageState {
    constructor(
        private languageService: LanguageService,
    ) {
    }
    @Action(LanguageActions.Get)
    getPoints({ getState, setState }: StateContext<LanguageStateModel>) {
        return this.languageService.getLanguages().subscribe((result) => {
            const state = getState();
            setState({
                ...state,
                language: result,
            });
            console.log(result);
        });
    }
}
