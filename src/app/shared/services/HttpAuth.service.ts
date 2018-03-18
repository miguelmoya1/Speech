import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpAuth {

    constructor(
        private httpClient: HttpClient
    ) { }

    setHeaders() {
        const headers = new HttpHeaders();
        const token = localStorage.getItem('id_token');
        if (token) headers.set('Authorization', token);
        return headers;
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
