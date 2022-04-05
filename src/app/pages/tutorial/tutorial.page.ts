/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';
import { IonStorageService } from 'src/app/services';
import { TUTORIAL_COMPLETED } from './utils';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit, AfterViewInit {
  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  @HostBinding('class.first-slide-active') isFirstSlide = true;

  @HostBinding('class.last-slide-active') isLastSlide = false;

  constructor(
    public menu: MenuController,
    private storageService: IonStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menu.enable(false);
  }

  ngAfterViewInit(): void {
    this.slides.isBeginning().then(isBeginning => {
      this.isFirstSlide = isBeginning;
    });
    this.slides.isEnd().then(isEnd => {
      this.isLastSlide = isEnd;
    });
    this.slides.ionSlideWillChange.subscribe(changes => {
      this.slides.isBeginning().then(isBeginning => {
        this.isFirstSlide = isBeginning;
      });
      this.slides.isEnd().then(isEnd => {
        this.isLastSlide = isEnd;
      });
    });
  }
  skipWalkthrough(): void {
    this.slides.length().then(length => {
      this.slides.slideTo(length);
    });
  }
  async finish() {
    await this.storageService.storageSet(TUTORIAL_COMPLETED, true);
    this.router.navigateByUrl('/');
  }

}
