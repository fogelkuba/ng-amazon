import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";
import {RegistrationService} from "./registration.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    name: string = '';
    email: string = '';
    password: string = '';
    passwordConfirm: string = '';
    isSeller: boolean = false;

    btnDisabled: boolean = false;

    constructor(
        private router: Router,
        private data: DataService,
        private api: RestApiService,
        private registration: RegistrationService
    ) {
    }

    ngOnInit() {
        this.email = 'abc@abc2.com';
        this.password = 'abc123';
        this.name = 'John Abc';
        this.isSeller = false;
    }

    validate() {
        //TODO ngForm validation
        return true;
    }

    async registerUser() {
        this.btnDisabled = true;

        let credentials = {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller
        };

        this.registration.post(credentials)
            .subscribe(
                (response) => {
                    if (response['success']) {
                        localStorage.setItem('token', response['token'])
                        this.data.success('Registration successful')
                    } else {
                        console.log(response['message']);
                    }
                }
            );

        this.btnDisabled = false;
    }

}
