import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    categories: any;

    newCategory = '';

    btnDisabled = false;

    constructor(private data: DataService, private rest: RestApiService) {
    }

    ngOnInit() {
        this.fetchCategories();
    }

    fetchCategories() {
        this.rest.get('/api/categories')
            .subscribe(
                (response) => {
                    if (response['success']) {
                        this.categories = response['categories'];
                    }
                    else {
                        const msg = response['message'];
                        this.data.error(msg)
                    }
                },
                (error) => {
                    const err = error['message'];
                    this.data.error(err);
                }
            )
    }

    addCategory(){
        this.btnDisabled = true;
        const body = {
            category: this.newCategory
        };
        this.rest.post('/api/categories', body)
            .subscribe(
                (response) => {
                    if (response['success']) {
                        const msg = response['message'];
                        this.data.success(msg);
                    }
                    else {
                        const msg = response['message'];
                        this.data.error(msg);
                    }
                }
            );
        this.btnDisabled = false;
    }

}
