import { IUser } from './iuser';

export interface IText {
    id?: number;
    fk_user?: number;
    text?: string;
    title?: string;
    date_start?: Date;
    date_finish?: Date;
    lat?: number;
    lon?: number;
}
