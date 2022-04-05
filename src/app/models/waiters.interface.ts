import { IPoint } from './point.interface';


export interface IWaiter {
    id?: number;
    name?: string;
    totalPoints?: number;
    pointsList?: IPoint[];
    tipsShare?: number;
    hours?: number;
    avatar?: string;
}
