import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, NgForm, AbstractControl } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { IonDatetime, ModalController, NavController, PickerController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as nanoid from 'nanoid';
import { Keyboard } from '@capacitor/keyboard';
import { format, parseISO } from 'date-fns';
import { Waiter, Entry } from 'src/app/models';
import { EntriesService } from 'src/app/services';
import { EntryActions } from 'src/app/states/entries/entries.actions';
import { WaiterActions } from 'src/app/states/waiters/waiter.action';
import { WaitersState } from 'src/app/states/waiters/waiter.state';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.page.html',
  styleUrls: ['./entry-form.page.scss'],
  animations: [
    trigger('fade', [
      transition('void => active', [
        style({
          opacity: 0
        }),
        animate(1000, style({
          opacity: 1
        }))
      ]),
      transition('* => void', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ])
  ],
})
export class EntryFormPage implements OnInit {
  @Select(WaitersState.getWaiterList) waitersListState: Observable<Waiter[]>;
  @ViewChild('waitersFormRef', { static: false }) waitersFormRef: NgForm;
  @ViewChild('entryFormRef', { static: false }) entryFormRef: NgForm;
  // dateValue = '';
  // dateValue2 = '';
  waitersListForm: FormGroup;
  entryForm: FormGroup;
  date: FormControl;
  validationMessages = {
    tipsAmount: [
      { type: 'required', message: 'tipsAmount is required' }
    ],
    date: [
      { type: 'required', message: 'Date is required' }
    ],
  };
  dateToday = new FormControl(new Date());
  selectedHours = null;
  isEntryValidFormSubmitted = true;
  isKeyboardHide = null;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private navCtrl: NavController,
    private pickerController: PickerController,
    private entries: EntriesService,
    public modal: ModalController,
    readonly sanitizer: DomSanitizer
  ) { }
  get waitersListArray() {
    return this.waitersListForm.get('waitersList') as FormArray;
  }
  get dateControl(): AbstractControl {
    return this.entryForm.get('date');
  }
  waitersListArrayControl(i) {
    return this.waitersListArray.controls[i].get('waiter') as FormControl;
  }
  // confirm() {
  //   // this.datetime.confirm(); //nativeEl.confirm();
  //   console.log(this.datetime);
  // }
  // dismissModal() {
  //   this.modal.dismiss();
  // }
  // onDateTimeChange() {
  //   // this.dateValue2 = this.formatDate(this.datetime.value);
  //   // console.log(this.datetime.value);
  //   // console.log(this.dateValue2);
  //   console.log('fefefefefe');
  // }
  // reset() {
  //   console.log(this.datetime.value);
  //   this.datetime.nativeEl.reset();
  // }


  ngOnInit() {
    this.store.dispatch(new WaiterActions.Get());
    this.waitersListState.subscribe((waitersList) => {
      this.setupForm(waitersList);
    });
  }
  setupForm(waitersListData) {
    this.waitersListForm = this.formBuilder.group({
      waitersList: this.formBuilder.array([
        ...this.createFormArray(waitersListData)
      ])
    });
    this.entryForm = this.formBuilder.group({
      date: new FormControl(new Date()),
      tipsAmount: ['', Validators.required],
    });
  }
  createField(name, totalPoints, pointsList, hours?, avatar?): FormGroup {
    return this.formBuilder.group({
      name: [name, Validators.required],
      totalPoints: [totalPoints],
      pointsList: [pointsList, Validators.required],
      hours: [hours, Validators.required],
      avatar: [avatar],
    });
  }
  createFormArray(waitersListData: Waiter[]): FormGroup[] {
    const count = waitersListData.length;
    const arr = [];
    for (let i = 0; i < count; i++) {
      const totalPoints = [];
      if (waitersListData[i].pointsList != null || waitersListData[i].pointsList !== undefined) {
        waitersListData[i].pointsList.forEach((point, ind) => {
          totalPoints.push(point.value);
        });
      }
      const hours = waitersListData[i].hours;
      const avatar = waitersListData[i]?.avatar;
      arr.push(this.createField(waitersListData[i].name, this.sumPointsArray(totalPoints), waitersListData[i].pointsList, hours, avatar));
    }
    return arr;
  }
  updateFormDate(value: any) {
    this.entryForm.get('date').setValue(value);
  }
  sumPointsArray(array) {
    const sum = array.reduce((a, b) => a + b, 0);
    return sum;
  }
  testPage() {
    this.navCtrl.navigateForward('test-page');
  }
  homePage() {
    this.navCtrl.navigateBack('home');
  }
  buildSubmitForm() {
    console.log(this.waitersListForm, this.entryForm);
    if (this.entryForm.invalid) {
      console.log('entryForm invalid', this.entryForm.invalid);
    }
    if (this.waitersListForm.invalid) {
      console.log('waitersListForm invalid', this.waitersListForm.invalid);
    }
    if (this.entryForm.valid) {
      console.log('entryForm valid', this.entryForm.valid);
    }
    if (this.waitersListForm.valid) {
      console.log('waitersListForm valid', this.waitersListForm.valid);
    }
    // console.log(this.waitersListForm.value.waitersList, this.entryForm.value.date, this.entryForm.value.tipsAmount);
    this.buildWaiterEntryObject(this.waitersListForm.value.waitersList, this.entryForm.value.date, this.entryForm.value.tipsAmount);
  }

  buildWaiterEntryObject(waitersList, date, tips) {
    const entryid = nanoid(12);
    const sumXValueArray = [];
    waitersList.forEach((waiter) => {
      waiter.xValue = waiter.totalPoints + waiter.hours;
      sumXValueArray.push(waiter.xValue);
    });
    const aValue = this.sumPointsArray(sumXValueArray);
    waitersList.forEach((waiter) => {
      waiter.yValue = tips / aValue;
      waiter.tipsShare = waiter.xValue * waiter.yValue;
    });
    const teamEntry: Entry = {
      id: entryid,
      tipsMade: tips,
      date,
      waiters: waitersList,
    };
    this.submitForm(teamEntry);
  }
  submitForm(teamEntry: Entry) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        teamEntry: JSON.stringify(teamEntry),
        details: false
      }
    };
    this.store.dispatch(new EntryActions.AddEntry(teamEntry));
    this.navCtrl.navigateForward(['/result'], navigationExtras);
  }
  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
  async showPicker(i) {
    const settings = {
      cssClass: 'pickerClassName',
      buttons: [
        {
          text: 'Reset',
          role: 'cancel',
          handler: (e) => {
            this.selectedHours = null;
            const hoursFormArray: any = this.waitersListArray.controls[i];
            hoursFormArray.controls.hours.setValue(null);
            hoursFormArray.updateValueAndValidity();
          }
        },
        {
          text: 'Ok',
          handler: (e) => {
            const hours = e.hours.value;
            const quarters = e.quarters.value;
            const hoursString: any = [`${hours}.${quarters}`];
            const hoursNumber: number = parseFloat(hoursString);
            const hoursFormArray: any = this.waitersListArray.controls[i];
            const waiter = new Waiter({});
            this.waitersListState.subscribe((response: any) => {
              waiter.id = response[i].id;
              waiter.name = response[i].name;
              waiter.pointsList = response[i].pointsList;
              waiter.hours = hoursNumber;
              waiter.avatar = response[i].avatar;
            });
            this.store.dispatch(new WaiterActions.Update(waiter, waiter.id));
            this.waitersListState.subscribe((response: any) => {
              this.createFormArray(response);
            });
            hoursFormArray.controls.hours.setValue(hoursNumber);
            hoursFormArray.updateValueAndValidity();
          },
        }
      ],
      columns: [
        {
          name: 'hours',
          options: [
            {
              text: '1',
              value: 1
            },
            {
              text: '2',
              value: 2
            },
            {
              text: '3',
              value: 3
            },
            {
              text: '4',
              value: 4
            },
            {
              text: '5',
              value: 5
            },
            {
              text: '6',
              value: 6
            },
            {
              text: '7',
              value: 7
            },
            {
              text: '8',
              value: 8
            },
            {
              text: '9',
              value: 9
            },
            {
              text: '10',
              value: 10
            },
            {
              text: '11',
              value: 11
            },
            {
              text: '12',
              value: 12
            },
            {
              text: '13',
              value: 13
            },
          ]
        },
        {
          name: 'quarters',
          options: [
            {
              text: '00',
              value: 0
            },
            {
              text: '25',
              value: 25
            },
            {
              text: '50',
              value: 50
            },
            {
              text: '75',
              value: 75
            },
          ]
        }
      ],
    };
    const picker = await this.pickerController.create(settings);
    picker.present();
  }
}
