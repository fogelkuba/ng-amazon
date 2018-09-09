import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";

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
        private api: RestApiService
    ) {
    }

    ngOnInit() {
    }

    validate() {
        //TODO ngForm validation
        return true;
    }

    async registerUser() {
        this.btnDisabled = true;
        try {
            if (this.validate()) {
                const data = await this.api.post(
                    '',
                )
            }
        }
    }

}
