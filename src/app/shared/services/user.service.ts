import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from '../../app.constants';
import { IUser } from '../interfaces/iuser';


@Injectable()
export class UserService {
    SERVER_URL = SERVER_URL + '/user/';

    constructor(
        private http: AuthHttp
    ) { }

    getUser(): Observable<IUser> {
        return this.http.get(SERVER_URL)
            .map(response => <IUser>response.json().user)
            .catch(error => error);
    }

    getUserId(id): Observable<IUser> {
        return this.http.get(SERVER_URL + id)
            .map(response => <IUser>response.json().user)
            .catch(error => error);
    }

    editUser(user: IUser): Observable<IUser> {
        return this.http.put(SERVER_URL, user)
            .map(response => <IUser>response.json().user)
            .catch(error => error);
    }
}
