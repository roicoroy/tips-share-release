import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WaiterActions } from 'src/app/states/waiters/waiter.action';
import { WaitersState } from 'src/app/states/waiters/waiter.state';
import { IWaitersListModel, WaitersListFacade } from './waiters-list.facade';

@Component({
  selector: 'app-waiters-list',
  templateUrl: './waiters-list.component.html',
  styleUrls: ['./waiters-list.component.scss'],
})
export class WaitersListComponent implements OnInit {
  viewState$: Observable<IWaitersListModel>;
  waitersListState ;
  constructor(
    private readonly waitersListFacade: WaitersListFacade,
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.dispatch(new WaiterActions.GetWaitersList()).subscribe((res)=>{
      console.log(res.waiters.waiters);
      this.waitersListState = res.waiters.waiters;
    });
    this.viewState$ = this.waitersListFacade.viewState$;
    // this.viewState$.subscribe((vs: IWaitersListModel) => {
    //   vs.waiterList.forEach(element => {
    //     console.log(element);
    //     this.waitersListState = element;
    //   });
    // });
  }
}

