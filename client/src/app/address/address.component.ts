import {Component, OnInit} from '@angular/core';

import {DataService} from '../data.service';
import {RestApiService} from '../rest-api.service';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
    btnDisabled = false;

    currentAddress: any;

    constructor(private data: DataService, private rest: RestApiService) {
    }

    ngOnInit() {
        this.rest.get('http://localhost:3030/api/accounts/address')
            .subscribe(
                (response) => {
                    if (JSON.stringify(response['address']) === '{}' && this.data.message === '') {
                        this.data.warning('You have not entered your shipping address. Please enter your shipping address.');
                    }
                    this.currentAddress = response['addressMsg'];
                },
                (error) => {
                    this.data.error(error['message']);
                }
            );
    }

    updateAddress() {
        this.btnDisabled = true;
        this.rest.post(
            'http://localhost:3030/api/accounts/address', this.currentAddress)
            .subscribe(
                (response) => {
                    response['success']
                        ? (this.data.success(response['message']), this.data.getProfile())
                        : this.data.error(response['message']);
                },
                (error) => {
                    this.data.error(error['message']);
                }
            );
        this.btnDisabled = false;
    }

}
