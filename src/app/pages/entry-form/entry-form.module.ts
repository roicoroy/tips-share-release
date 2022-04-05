import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryFormPageRoutingModule } from './entry-form-routing.module';
import { EntryFormPage } from './entry-form.page';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryFormPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [
    EntryFormPage,
  ],
  entryComponents: [

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EntryFormPageModule { }
