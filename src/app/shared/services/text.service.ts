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
        return this.authHttp.post(SERVER_URL, text);
    }

    getAll(): Observable<IText[]> {
        return this.authHttp.get(SERVER_URL)
            .map(response => response.json().text);
    }

    get(id: number): Observable<IText> {
        return this.authHttp.get(SERVER_URL + id)
            .map(response => response.json().text);
    }
}
