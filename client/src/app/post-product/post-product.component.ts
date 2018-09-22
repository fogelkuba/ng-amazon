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

    validate(product) {
        let validation = false;
        !product.title ? this.data.error('Please enter title') : '';
        !product.price ? this.data.error('Please enter price') : '';
        !product.categoryId ? this.data.error('Please select category') : '';
        !product.description ? this.data.error('Please enter description') : '';
        !product.product_picture ? this.data.error('Please select product image') : '';
        if (product.title && product.price && product.categoryId && product.description && product.product_picture) {
            validation = true;
        }
        return validation;
    }

    fileChange(event: any) {
        this.product.product_picture = event.target.files[0];
    }

    postProduct() {
        this.btnDisabled = true;

        if (this.validate(this.product)) {
            const form = new FormData();
            for (const key in this.product) {
                if (this.product.hasOwnProperty(key)) {
                    if (key === 'product_picture') {
                        form.append(
                            'product_picture',
                            this.product.product_picture,
                            this.product.product_picture.name,
                        );
                    } else {
                        form.append(key, this.product[key]);
                    }
                }
            }
            this.rest.post('/api/seller/products', form)
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

        this.btnDisabled = false;
    }

}
