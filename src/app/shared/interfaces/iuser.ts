export interface IUser {
    _id?: number;
    name?: string;
    surname?: string;
    nick?: string;
    email?: string;
    password?: string;
    date_create?: Date;
    iat?: number;
    exp?: number;
    iss?: number;
}
