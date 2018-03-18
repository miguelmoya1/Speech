import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from '../../app.constants';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { HttpAuth } from './HttpAuth.service';

@Injectable()
export class AuthService {
    logged = false;
    logged$: EventEmitter<boolean> = new EventEmitter<boolean>();
    SERVER_URL = SERVER_URL + '/auth/';

    constructor(
        private http: HttpAuth
    ) { }

    private setLogged(logged: boolean, token = ''): boolean {
        this.logged = logged;
        if (logged && token) localStorage.setItem('id_token', token);
        else if (!logged) localStorage.removeItem('id_token');
        this.logged$.emit(logged);
        return logged;
    }

    login(email: string, password: string): Observable<boolean> {
        return this.anyLogin(this.SERVER_URL + 'login', { email, password });
    }

    private anyLogin(url: string, data: any): Observable<boolean> {
        return this.http
            .post(url, data)
            .map((response: any) => this.setLogged(true, response.token))
            .catch(error => Observable.throw(error.error));
    }

    isLogged(): Observable<boolean> {
        if (!this.logged && localStorage.getItem('id_token')) {
            return this.http
                .get(this.SERVER_URL + 'token')
                .map(response => this.setLogged(true))
                .catch(error => Observable.of(false))
                .do(logged => this.setLogged(logged));
        }
        return Observable.of(this.logged);
    }

    register(user: IUser): Observable<boolean> {
        return this.http
            .post(this.SERVER_URL + 'register', user)
            .map((response: any) => this.setLogged(true, response.token))
            .catch(error => Observable.throw(error));
    }

    logout(): void {
        this.setLogged(false);
    }
}
