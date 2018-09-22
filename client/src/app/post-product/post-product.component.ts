import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-post-product',
    templateUrl: './post-product.component.html',
    styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

    product = {
        title: '',
        price: 0,
        categoryId: '',
        description: '',
        product_picture: null
    };

    categories: any;
    btnDisabled = false;

    constructor(private data: DataService,
                private  rest: RestApiService,
                private router: Router
    ) {
    }

    ngOnInit() {
    }

}
