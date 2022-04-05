/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Entry } from 'src/app/models';
import { IonStorageService } from 'src/app/services';
import { EntryActions } from 'src/app/states/entries/entries.actions';
import { EntryState } from 'src/app/states/entries/entries.state';
import { EntriesListFacade, IEntriesListModel } from './entries-list.facade';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss'],
})
export class EntriesListComponent implements OnInit {
  viewState$: Observable<IEntriesListModel>;
  entriesListState;
  showAddMessage = null;
  constructor(
    private readonly entriesListFacade: EntriesListFacade,
    private store: Store,
    public ionStorage: IonStorageService,
  ) { }

  ngOnInit() {
    this.store.dispatch(new EntryActions.GetEntries()).subscribe((res) => {
      console.log(res.entries);
      if (res.entries.length > 0) {
        this.showAddMessage = false;
      }
    });
    this.viewState$ = this.entriesListFacade.viewState$;
    this.viewState$.subscribe((vs: IEntriesListModel) => {
      vs.entriesList.forEach(element => this.entriesListState = element);
    });
  }
}

