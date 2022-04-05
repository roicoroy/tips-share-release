import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Point } from '../models/point.type';
import * as nanoid from 'nanoid';
export const POINTS_LIST_KEY = 'pointsList';

@Injectable({
    providedIn: 'root'
})
export class PointsService {
    constructor(
        private storage: Storage,
    ) { }

    // Read
    getItems(): Promise<Point[]> {
        return this.storage.get(POINTS_LIST_KEY);
    }
    // Create
    addItem(item: Point): Promise<Point[]> {
        item.id = nanoid(12);
        console.log(item);
        return this.storage.get(POINTS_LIST_KEY)
            .then((formItems: Point[]) => {
                console.log(formItems);
                if (formItems) {
                    formItems.push(item);
                    return this.storage.set(POINTS_LIST_KEY, formItems);
                } else {
                    return this.storage.set(POINTS_LIST_KEY, [item]);
                }
            });
    }
    // Update
    updateItem(item: Point): Promise<any> {
        return this.storage.get(POINTS_LIST_KEY)
            .then((formItems: Point[]) => {
                if (!formItems || formItems.length === 0) {
                    return null;
                }
                const newFormItem: Point[] = [];
                for (const form of formItems) {
                    if (form.id === item.id) {
                        newFormItem.push(item);
                    } else {
                        newFormItem.push(form);
                    }
                }
                return this.storage.set(POINTS_LIST_KEY, newFormItem);
            });
    }
    // Delete
    deleteItem(id: number): Promise<any> {
        return this.storage.get(POINTS_LIST_KEY)
            .then((formItems: Point[]) => {
                if (!formItems || formItems.length === 0) {
                    return null;
                }
                const formsToKeep: Point[] = [];
                for (const form of formItems) {
                    if (form.id !== id) {
                        formsToKeep.push(form);
                    }
                }
                return this.storage.set(POINTS_LIST_KEY, formsToKeep);
            });
    }
}
