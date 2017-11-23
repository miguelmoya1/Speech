import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from '../../app.constants';
import { IUser } from '../interfaces/iuser';

@Injectable()
export class UserService {
    logged = false;
    logged$: EventEmitter<boolean> = new EventEmitter<boolean>();
    SERVER_URL = SERVER_URL + '/auth';

    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        private router: Router
    ) { }

    private setLogged(logged: boolean, token = ''): boolean {
        this.logged = logged;
        this.logged$.emit(logged);
        if (logged && token) {
            localStorage.setItem('id_token', token);
        } else if (!logged) {
            localStorage.removeItem('id_token');
        }
        return logged;
    }

    login(email: string, password: string): Observable<boolean> {
        return this.anyLogin(this.SERVER_URL + '/login', { email, password });
    }

    private anyLogin(url: string, data: any): Observable<boolean> {
        return this.http.post(url, data)
            .map(response => {
                const resp: any = response.json();
                if (resp.status === 200) return this.setLogged(true, resp.token);
                else throw resp.error;
            }).catch((error) => {
                if (error instanceof Response) return Observable.throw('Login error');
                return Observable.throw(error);
            });
    }

    isLogged(): Observable<boolean> {
        if (!this.logged && localStorage.getItem('id_token')) {
            return this.authHttp.get(this.SERVER_URL + '/token')
                .map(response => true)
                .catch(response => Observable.of(false))
                .do(logged => this.setLogged(<boolean>logged));
        }
        return Observable.of(this.logged);
    }

    register(user: IUser): Observable<boolean> {
        return this.http.post(this.SERVER_URL + '/register', user)
            .map(response => {
                const resp: any = response.json();
                if (resp.status === 200) {
                    this.setLogged(true, resp.token);
                    return true;
                }
                throw resp.error;
            }).catch((error) => {
                if (error instanceof Response) throw new Error('Email o nick ya están registrados');
                return Observable.throw(error);
            });
    }

    logout() {
        this.setLogged(false);
        this.router.navigate(['/login']);
    }
}
