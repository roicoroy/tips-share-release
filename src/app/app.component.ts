import { Component } from '@angular/core';
import { LanguageService } from './services';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public language: LanguageService,
  ) {
    this.initializeApp();
  }
  async initializeApp() {
    try {
      this.language.initTranslate();
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }
}
