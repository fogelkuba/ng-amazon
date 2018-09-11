import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    constructor(private http: HttpClient) {
    }

    get(url: string) {
        return this.http.get(url);
    }

    post(link: string, body: any) {
        return this.http.post(link, body);
    }
}
