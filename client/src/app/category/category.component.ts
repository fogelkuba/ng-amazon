import {Component, OnInit} from '@angular/core';

import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    categoryId: any;
    category: any;
    page = 1;

    public pageSize = 10;

    constructor(private data: DataService,
                private rest: RestApiService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(res => {
            this.categoryId = res['id'];
            this.getProducts();
        })
    }

    getProducts(event ?:any) {
        if (event) {
            this.category = null;
        }
        this.rest.get(`/api/categories/${this.categoryId}?page=${this.page}`)
            .subscribe(
                (response) => {
                    response['success'] ? this.category = response : this.data.error(response['message'])
                },
                (err) => {
                    this.data.error(err['message'])
                }
            )
    }

    get lower() {
        return this.pageSize * (this.page - 1) + 1;
    }

    get upper() {
        return Math.min(this.pageSize * this.page, this.category.totalProducts)
    }

}
