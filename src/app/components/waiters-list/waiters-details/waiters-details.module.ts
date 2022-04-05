import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitersDetailsPageRoutingModule } from './waiters-details-routing.module';

import { WaitersDetailsPage } from './waiters-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitersDetailsPageRoutingModule
  ],
  declarations: [WaitersDetailsPage]
})
export class WaitersDetailsPageModule {}
