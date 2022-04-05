import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'waiters',
        loadChildren: () => import('./waiters/waiters.module').then( m => m.WaitersPageModule)
      },
      {
        path: 'points',
        loadChildren: () => import('./points/points.module').then( m => m.PointsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/waiters',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/waiters',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
