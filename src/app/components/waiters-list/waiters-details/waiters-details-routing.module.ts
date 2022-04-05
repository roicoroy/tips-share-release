import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitersDetailsPage } from './waiters-details.page';

const routes: Routes = [
  {
    path: '',
    component: WaitersDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitersDetailsPageRoutingModule {}
