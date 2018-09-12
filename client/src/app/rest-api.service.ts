import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DataService} from "./data.service";

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    constructor(private http: HttpClient, public data: DataService) {
    }

    getHeaders() {
        const token = localStorage.getItem('token');
        return token ? new HttpHeaders().set('Authorization', token) : null;
    }

    get(url: string) {
        return this.http.get(url)
            .subscribe(
                (response) => {
                    if (response['success']) {
                        // localStorage.setItem('token', response['token']);
                        // this.data.success('Registration successful');
                        // console.log(response['message']);
                    } else {
                        // const err = response['message'];
                        // console.log(err);
                        // this.data.error(err);
                    }
                },
                (error) => {
                    const err = error['message'];
                    this.data.error(err);
                }
            )
    }

    post(link: string, body: any) {
        return this.http.post(link, body);
    }
}
