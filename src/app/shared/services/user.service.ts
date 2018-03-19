import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from '../../app.constants';
import { IUser } from '../interfaces/iuser';
import { HttpAuth } from './HttpAuth.service';


@Injectable()
export class UserService {
    SERVER_URL = SERVER_URL + '/user/';

    constructor(
        private http: HttpAuth
    ) { }

    get(id?: number) {
        return this.http.get<IUser>(this.SERVER_URL + (id ? id : ''));
    }

    put(user: IUser) {
        return this.http.put(this.SERVER_URL, user);
    }
}
