import { Waiter } from '.';

export interface IEntry {
    id: number;
    date: number;
    tipsMade: number;
    waiters: Waiter[];
}
