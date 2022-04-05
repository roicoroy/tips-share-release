import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { IonSelect, ModalController } from '@ionic/angular';
import { Point } from 'src/app/models/point.type';

@Component({
  selector: 'app-points-modal',
  templateUrl: './points-modal.component.html',
  styleUrls: ['./points-modal.component.scss'],
})
export class PointsModalComponent implements OnInit {
  @ViewChild('createPointFormRef', { static: false }) createPointFormRef: NgForm;
  @ViewChild('selectRef', { static: false }) selectRef: IonSelect;
  @Input() point;
  values = [
    {
      value: 0.5,
    },
    {
      value: 1,
    },
    {
      value: 1.5,
    },
    {
      value: 2.0,
    },
  ];
  createPointsForm: FormGroup;
  labelField: FormControl;
  valueField: FormControl;
  pointData: Point;
  pointId: number;
  isEdit = null;
  constructor(
    public modalController: ModalController,
  ) {
  }
  get labelFormControl() {
    return this.createPointsForm.get('points').value as FormControl;
  }
  get valueFormControl() {
    return this.createPointsForm.get('value').value as FormControl;
  }
  ngOnInit() {
    this.setupForm();
    if (this.point === null || this.point === undefined) {
      this.isEdit = false;
      this.labelField.setValue('');
      this.valueField.setValue('');
    } else {
      this.isEdit = true;
      this.pointId = this.point.id;
      this.labelField.setValue(this.point.label);
      this.valueField.setValue(this.point.value);
    }
  }
  setupForm() {
    this.labelField = new FormControl('', Validators.required);
    this.valueField = new FormControl('', Validators.required);
    return this.createPointsForm = new FormGroup({
      label: this.labelField,
      value: this.valueField,
    });
  }
  dismiss() {
    this.modalController.dismiss();
  }
  addNewPoint() {
    const newPoint = {
      label: this.titleCaseWord(this.createPointsForm.value.label),
      value: this.numberize(this.valueField.value),
      type: 'checkbox'
    };
    if (this.createPointsForm.valid) {
      this.modalController.dismiss(newPoint);
    }
  }
  saveEditedPoint() {
    const editPoint = {
      id: this.pointId,
      label: this.titleCaseWord(this.createPointsForm.value.label),
      value: this.numberize(this.valueField.value),
      type: 'checkbox'
    };
    if (this.createPointsForm.valid) {
      this.modalController.dismiss(editPoint);
    }
  }
  numberize(x) {
    return Number(x);
  }
  titleCaseWord(word: string) {
    if (!word) {
      return word;
    };
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
