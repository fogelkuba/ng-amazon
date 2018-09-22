import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    baseUlr = 'http://localhost:3030';

    constructor(private http: HttpClient) {
    }

    getHeaders() {
        const token = localStorage.getItem('token');
        return token ? new HttpHeaders().set('Authorization', token) : null;
    }

    get(link: string) {
        return this.http.get(this.baseUlr + link, { headers: this.getHeaders() });
    }

    post(link: string, body: any) {
        return this.http.post(this.baseUlr + link, body, { headers: this.getHeaders() });
    }
}
