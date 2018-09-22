import {Injectable} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {RestApiService} from "./rest-api.service";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    message: string = '';
    messageType: string = 'danger';

    user: any;

    constructor(private router: Router, private rest: RestApiService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.message = '';
            }
        });
    }

    error(message: string) {
        this.messageType = 'danger';
        this.message = message;
    }

    success(message: string) {
        this.messageType = 'success';
        this.message = message;
    }

    warning(message: string) {
        this.messageType = 'warning';
        this.message = message;
    }

    async getProfile() {
        if (localStorage.getItem('token')) {
            this.rest.get('/api/accounts/profile')
                .subscribe(
                    (response) => {
                        console.log(response);
                        this.user = response['user'];
                    },
                    (error) => {
                        const err = error['message'];
                        this.error(err);
                    });

        }
    }
}
