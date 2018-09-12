import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private http: HttpClient,  public data: DataService) {}

    private url = 'http://localhost:3030/api/accounts/signup';

    post(userCredentials) {
        return this.http.post(this.url, userCredentials)
            .subscribe(
                (response) => {
                    if (response['success']) {
                        localStorage.setItem('token', response['token']);
                        this.data.success('Registration successful');
                        console.log(response['message']);
                    } else {
                        const err = response['message'];
                        console.log(err);
                        this.data.error(err);
                    }
                },
                (error) => {
                    const err = error['message'];
                    this.data.error(err);
                }
            );
    }
}