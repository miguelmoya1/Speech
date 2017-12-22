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
        if (localStorage.getItem('user')) {
            console.log('aa');
            return new Observable(subscriber => {
                console.log(JSON.parse(localStorage.getItem('user')));
                subscriber.next(JSON.parse(localStorage.getItem('user')));
                subscriber.complete();
            });
        } else {
            return this.http.get(this.SERVER_URL)
                .map(response => {
                    const user = response.json().user;
                    localStorage.setItem('user', JSON.stringify(user));
                    return user;
                })
                .catch((error: Response) => Observable.throw(error));
        }

        // return this.http.get(this.SERVER_URL)
        //     .map(response => <IUser>response.json().user)
        //     .catch(error => error);
    }

    getUserId(id: string): Observable<IUser> {
        return this.http.get(this.SERVER_URL + id)
            .map(response => <IUser>response.json().user)
            .catch(error => error);
    }

    editUser(user: IUser): Observable<IUser> {
        return this.http.put(this.SERVER_URL, user)
            .map(response => <IUser>response.json().user)
            .catch(error => error);
    }
}
