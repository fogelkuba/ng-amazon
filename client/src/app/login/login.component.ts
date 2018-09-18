import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {LoginService} from "./login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email = '';
    password = '';

    btnDisabled = false;

    constructor(
        private router: Router,
        private data: DataService,
        private login: LoginService
    ) {
    }

    ngOnInit() {
        this.email = 'abc@abc.com';
        this.password = 'abc123';
    }

    validate() {
        if (this.email) {
            if (this.password) {
                return true
            } else {
                this.data.error('Password is not provided')
            }
        } else {
            this.data.error('Email is nto entered')
        }
    }

    async loginUser() {
        this.btnDisabled = true;

        let credentials = {
            email: this.email,
            password: this.password
        };

        if (this.validate()) {
            this.login.post(credentials);
        }

        this.btnDisabled = false;
    }

}
