import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShellModule } from './shell/shell.module';
import { TranslateComponent } from './translate/translate.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { WaitersListComponent } from './waiters-list/waiters-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { EntriesListComponent } from './entries-list/entries-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShellModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [
    TranslateComponent,
    ImagePickerComponent,
    WaitersListComponent,
    EntriesListComponent,
  ],
  exports: [
    ShellModule,
    TranslateComponent,
    ImagePickerComponent,
    WaitersListComponent,
    EntriesListComponent,
    TranslateModule,
  ]
})
export class ComponentsModule { }
