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
        this.email = 'abc@abc5.com';
        this.password = 'abc123';
        this.name = 'John Abc';
        this.isSeller = false;
    }

    validate() {
        // TODO ngForm validation
        let validation = true;
        if (this.name == '' || this.email == '' || this.password == '' || this.passwordConfirm == '') {
            validation = false;
        }
        return validation;
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
                        localStorage.setItem('token', response['token']);
                        this.data.success('Registration successful');
                        console.log(response['message']);
                    } else {
                        const err = response['message'];
                        console.log(err);
                        this.data.error(err);
                    }
                }
            );

        this.btnDisabled = false;
    }
}
