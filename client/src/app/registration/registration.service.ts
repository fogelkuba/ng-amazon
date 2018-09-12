import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private http: HttpClient) {}

    private url = 'http://localhost:3030/api/accounts/signup';

    post(credentials) {
        return this.http.post(this.url, credentials)
            .pipe(response => response)
    }
}