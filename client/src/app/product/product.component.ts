import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    product: any;

    constructor(
        private route: ActivatedRoute,
        private data: DataService,
        private rest: RestApiService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(res => {
            this.rest.get(`/api/product/${res['id']}`)
                .subscribe(
                    (response) => {
                        response['success']
                            ? this.product = response['product']
                            : this.router.navigate(['/']);
                    },
                    (err) => {
                        this.data.error(err['message'])
                    }
                )
        })

    }
}