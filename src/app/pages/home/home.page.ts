/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController, } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { IonStorageService, LanguageService } from 'src/app/services';
import { EntryActions } from 'src/app/states/entries/entries.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  constructor(
    public translate: TranslateService,
    public languageService: LanguageService,
    public alertController: AlertController,
    private navCtrl: NavController,
    public ionStorage: IonStorageService,
    public actionSheetController: ActionSheetController,
  ) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  onIonInput($event) {
    console.log($event);
  }
  settings() {
    this.navCtrl.navigateBack('settings/tabs/waiters');
  }
  calculator() {
    this.navCtrl.navigateForward('entry-form');
  }
  entryList() {
  }
}
