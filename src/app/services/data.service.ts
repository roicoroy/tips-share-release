import { Injectable } from '@angular/core';
import { IonStorageService } from './ionstorage.service';
export const POINTS_LIST_KEY = 'pointsList';
export const WAITERS_LIST_KEY = 'waitersList';
export const TEAM_ENTRY = 'teamEntry';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private storageService: IonStorageService
  ) { }

}
