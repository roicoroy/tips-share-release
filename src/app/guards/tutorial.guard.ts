import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { TUTORIAL_COMPLETED } from '../pages/tutorial/utils';
import { IonStorageService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate {
  constructor(
    private storageService: IonStorageService,
    private router: Router
  ) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isComplete = await this.storageService.storageGet(TUTORIAL_COMPLETED);
    if (!isComplete) {
      this.router.navigateByUrl('/tutorial');
    }
    return isComplete;
  }
}

