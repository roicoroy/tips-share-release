import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Point } from 'src/app/models';
import { PointActions } from 'src/app/states/points/point.action';
import { PointsState } from 'src/app/states/points/point.state';
import { PointsModalComponent } from './points-modal/points-modal.component';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {

  @Select(PointsState.getPointsList) pointsList: Observable<Point[]>;

  constructor(
    public modalController: ModalController,
    private store: Store,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.store.dispatch(new PointActions.Get());

  }
  ionViewWillEnter() {
  }
  async addPoint() {
    const modal = await this.modalController.create({
      component: PointsModalComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.store.dispatch(new PointActions.Add(data));
    }
  }
  async editPoint(point) {
    const modal = await this.modalController.create({
      component: PointsModalComponent,
      cssClass: 'modal-class',
      componentProps: {
        point,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      const editedPoint: Point = {
        id: data.id,
        label: data.label,
        type: data.type,
        value: data.value,
      };
      this.store.dispatch(new PointActions.Update(editedPoint, editedPoint.id));
    }
  }
  delete(id: number) {
    this.store.dispatch(new PointActions.Delete(id));
  }
  homePage() {
    this.navCtrl.navigateForward('home');
  }
}
