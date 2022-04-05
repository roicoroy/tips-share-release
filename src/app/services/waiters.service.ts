import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as nanoid from 'nanoid';
import { Point } from '../models';
import { Waiter } from '../models/waiters.type';

export const WAITERS_LIST_KEY = 'waitersList';
@Injectable({
  providedIn: 'root'
})
export class WaitersService {
  private waitersList: Waiter[] = [
    new Waiter({
      id: 0,
      name: 'Jose',
      tipsShare: null,
      hours: null,
      totalPoints: null,
      avatar:null,
      // pointsList: null,
      // pointsList: [
      //   new Point({ id: 0, label: 'Speak English', value: 0.5, type: 'checkbox' }),
      //   new Point({ id: 1, label: 'Answer Phone', value: 0.5, type: 'checkbox' }),
      // ],
    }),
    new Waiter({
      id: 1,
      name: 'Mary',
      tipsShare: null,
      hours: null,
      totalPoints: null,
      avatar:null,
      // pointsList: [
      //   new Point({ id: 0, label: 'Speak English', value: 0.5, type: 'checkbox' }),
      //   new Point({ id: 1, label: 'Answer Phone', value: 0.5, type: 'checkbox' }),
      // ],
    }),
    new Waiter({
      id: 2,
      name: 'Joe',
      tipsShare: null,
      hours: null,
      totalPoints: null,
      avatar:null,
      // pointsList: [
      //   new Point({ id: 0, label: 'Speak English', value: 0.5, type: 'checkbox' }),
      //   new Point({ id: 1, label: 'Answer Phone', value: 0.5, type: 'checkbox' }),
      // ],
    }),
  ];
  constructor(
    private storage: Storage,
  ) { }
  // Read
  // async geWaitersList(): Promise<Waiter[]> {
  //   return this.storage.get(WAITERS_LIST_KEY).then((storedList) => {
  //     if (!storedList) {
  //       return this.storage.set(WAITERS_LIST_KEY, this.waitersList);
  //     } else {
  //       return new Promise(resolve => {
  //         resolve(storedList);
  //       });
  //     }
  //   });
  // }
  geWaitersList(): Promise<any[]> {
    return this.storage.get(WAITERS_LIST_KEY);
  }
  // Create
  addItem(item: Waiter): Promise<Waiter> {
    item.id = nanoid(12);
    return this.storage.get(WAITERS_LIST_KEY)
      .then((formItems: Waiter[]) => {
        if (formItems) {
          formItems.push(item);
          return this.storage.set(WAITERS_LIST_KEY, formItems);
        } else {
          return this.storage.set(WAITERS_LIST_KEY, [item]);
        }
      });
  }
  // Update
  updateItem(item: Waiter): Promise<Waiter> {
    return this.storage.get(WAITERS_LIST_KEY)
      .then((formItems: Waiter[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const newFormItem: Waiter[] = [];
        for (const form of formItems) {
          if (form.id === item.id) {
            newFormItem.push(item);
          } else {
            newFormItem.push(form);
          }
        }
        return this.storage.set(WAITERS_LIST_KEY, newFormItem);
      });
  }
  // Update
  updateWaiterPoint(item: Waiter): Promise<Waiter> {
    console.log(item);

    return this.storage.get(WAITERS_LIST_KEY);
  }
  // Delete
  deleteItem(id: number): Promise<any> {
    return this.storage.get(WAITERS_LIST_KEY)
      .then((formItems: Waiter[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const formsToKeep: Waiter[] = [];
        for (const form of formItems) {
          if (form.id !== id) {
            formsToKeep.push(form);
          }
        }
        return this.storage.set(WAITERS_LIST_KEY, formsToKeep);
      });
  }
}
