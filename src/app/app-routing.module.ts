import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [TutorialGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'entry-form',
    loadChildren: () => import('./pages/entry-form/entry-form.module').then(m => m.EntryFormPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then(m => m.ResultPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings-tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [TutorialGuard]
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'waiters-details',
    loadChildren: () => import('./components/waiters-list/waiters-details/waiters-details.module').then( m => m.WaitersDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
