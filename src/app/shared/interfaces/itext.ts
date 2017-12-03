import { IUser } from './iuser';

export interface IText {
    _id?: number;
    fk_user?: number | IUser;
    text?: string;
    title?: string;
    date_start?: Date;
    date_finish?: Date;
    lat?: number;
    lon?: number;
}
