import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpAuth {

    constructor(
        private httpClient: HttpClient
    ) { }

    setHeaders() {
        const header = {};
        if (localStorage.getItem('id_token')) header['Authorization'] = localStorage.getItem('id_token');
        return header;
    }

    get<T>(url: string) {
        return this.httpClient.get<T>(url, { headers: this.setHeaders() });
    }

    post<T>(url: string, data: T) {
        return this.httpClient.post<T>(url, data, { headers: this.setHeaders() });
    }

    put<T>(url: string, data: T) {
        return this.httpClient.put<T>(url, data, { headers: this.setHeaders() });
    }

    delete<T>(url: string) {
        return this.httpClient.delete<T>(url, { headers: this.setHeaders() });
    }
}
