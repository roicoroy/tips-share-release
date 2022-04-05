import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as nanoid from 'nanoid';
import { Entry } from '../models';
export const TEAM_ENTRY = 'entriesList';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(
    private storage: Storage,
  ) { }
  deleteAll() {
    this.storage.remove(TEAM_ENTRY);
  }
  getEntries(): Promise<any[]> {
    return this.storage.get(TEAM_ENTRY);
  }
  addEntry(item: Entry): Promise<any[]> {
    item.id = nanoid(12);
    return this.storage.get(TEAM_ENTRY)
      .then((formItems: any[]) => {
        console.log(formItems);
        if (formItems) {
          formItems.push(item);
          return this.storage.set(TEAM_ENTRY, formItems);
        } else {
          return this.storage.set(TEAM_ENTRY, [item]);
        }
      });
  }
  updateItem(item: any): Promise<any> {
    return this.storage.get(TEAM_ENTRY)
      .then((formItems: any[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const newFormItem: any[] = [];
        for (const form of formItems) {
          if (form.id === item.id) {
            newFormItem.push(item);
          } else {
            newFormItem.push(form);
          }
        }
        return this.storage.set(TEAM_ENTRY, newFormItem);
      });
  }
  deleteEntry(id: number): Promise<any> {
    return this.storage.get(TEAM_ENTRY)
      .then((formItems: any[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const formsToKeep: any[] = [];
        for (const form of formItems) {
          if (form.id !== id) {
            formsToKeep.push(form);
          }
        }
        return this.storage.set(TEAM_ENTRY, formsToKeep);
      });
  }
}
