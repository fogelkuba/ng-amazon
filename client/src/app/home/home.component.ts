import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    products: any;

    constructor(
        private data: DataService,
        private rest: RestApiService
    ) {
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.rest.get('/api/products')
            .subscribe(
                (response) => {
                    response['success']
                        ? this.products = response['products']
                        : this.data.error('Could not fetch products');
                },
                (err) => {
                    this.data.error(err['message']);
                }
            )

    }

}
