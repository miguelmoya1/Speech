import { Injectable } from '@angular/core';
import { IText } from '../interfaces/itext';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import { SERVER_URL } from '../../app.constants';

@Injectable()
export class TextService {

    SERVER_URL = SERVER_URL + '/text/';

    constructor(
        private authHttp: AuthHttp
    ) { }

    add(text: IText): Observable<any> {
        return this.authHttp.post(this.SERVER_URL, text)
            .catch(error => Observable.throw(error));
    }

    getAll(): Observable<IText[]> {
        return this.authHttp.get(this.SERVER_URL)
            .map(response => response.json().text)
            .catch(error => Observable.throw(error));
    }

    get(id: number): Observable<IText> {
        return this.authHttp.get(this.SERVER_URL + id)
            .map(response => response.json().text)
            .catch(error => Observable.throw(error));
    }
}
