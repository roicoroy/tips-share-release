import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Waiter } from 'src/app/models';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-waiter-modal',
  templateUrl: './waiter-modal.component.html',
  styleUrls: ['./waiter-modal.component.scss'],
  providers: [TitleCasePipe]
})
export class WaiterModalComponent implements OnInit {
  @ViewChild('createPointFormRef', { static: false }) createWaiterFormRef: NgForm;

  @Input() waiter: Waiter;
  createWaiterForm: FormGroup;
  nameField: FormControl;
  avatarField: FormControl;
  waiterData: Waiter;
  waiterId: number;
  isEdit = null;
  // avatar = 'assets/shapes.svg';
  avatar = null;
  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    private titleCasePipe: TitleCasePipe
  ) { }

  async ngOnInit() {
    this.setupForm();
    if (this.waiter === null || this.waiter === undefined) {
      this.isEdit = false;
      this.nameField.setValue(null);
      this.avatarField.setValue(null);
    } else {
      this.isEdit = true;
      this.waiterId = this.waiter.id;
      this.nameField.setValue(this.waiter.name);
      this.avatarField.setValue(this.waiter.avatar);
      this.avatar = this.waiter.avatar;
    }
  }
  setupForm() {
    this.nameField = new FormControl(null, Validators.required);
    this.avatarField = new FormControl(null);
    return this.createWaiterForm = new FormGroup({
      name: this.nameField,
      avatar: this.avatarField,
    });
  }
  addNewWaiter() {
    const newWaiter = {
      name: this.titleCasePipe.transform(this.createWaiterForm.value.name),
      avatar: this.createWaiterForm.value.avatar === null ? 'assets/shapes.svg' : this.createWaiterForm.value.avatar,
    };
    if (this.createWaiterForm.valid) {
      this.modalController.dismiss(newWaiter);
    }
  }
  saveEWaiter() {
    const editWaiter = {
      id: this.waiterId,
      name: this.titleCasePipe.transform(this.createWaiterForm.value.name),
      avatar: this.createWaiterForm.value.avatar === null ? 'assets/shapes.svg' : this.createWaiterForm.value.avatar,
    };
    if (this.createWaiterForm.valid) {
      this.modalController.dismiss(editWaiter);
    }
  }
  async onImagePicked(imageData: string | File) {
    this.avatarField.patchValue({ imageData });
    this.avatar = imageData;
  }
  dismiss() {
    this.modalController.dismiss();
  }
  numberize(x) {
    return Number(x);
  }
  capitalize(value) {
    const first = value.substr(0, 1).toUpperCase();
    return first + value.substr(1);
  }
}
