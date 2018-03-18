import { Injectable, EventEmitter } from '@angular/core';
import { IText } from '../interfaces/itext';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from '../../app.constants';
import { HttpAuth } from './HttpAuth.service';

@Injectable()
export class TextService {

    SERVER_URL = SERVER_URL + '/text/';
    newText$: EventEmitter<IText> = new EventEmitter<IText>();

    constructor(
        private httpAuth: HttpAuth
    ) { }

    add(text: IText): Observable<any> {
        return this.httpAuth.post(this.SERVER_URL, text)
            .map(insertText => this.newText$.emit(insertText))
            .catch(error => Observable.throw(error));
    }

    getAll(): Observable<IText[]> {
        return this.httpAuth.get(this.SERVER_URL)
            .map(response => response)
            .catch(error => Observable.throw(error));
    }

    get(id: number): Observable<IText> {
        return this.httpAuth.get(this.SERVER_URL + id)
            .map(response => response)
            .catch(error => Observable.throw(error));
    }

    update(text: IText): Observable<any> {
        return this.httpAuth.put(this.SERVER_URL, text)
            .map(response => response)
            .catch(error => Observable.throw(error));
    }
}
