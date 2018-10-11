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
    myReview = {
        title: '',
        description: '',
        rating: 0,
    };
    product: any;
    btnDisabled = false;

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

    async postReview() {
        this.btnDisabled = true;
        this.rest.post('/api/review', {
            productId: this.product._id,
            title: this.myReview.title,
            description: this.myReview.description,
            rating: this.myReview.rating,
        }).subscribe(
            (response) => {
                response['success']
                    ? this.data.success(response['message'])
                    : this.data.error(response['message']);
                this.btnDisabled = false;
            },
            (error) => {
                this.data.error(error['message']);
            }
        )
    }

    addToCart() {
        this.data.addToCart(this.product)
        ? this.data.success('Product succesfully added to cart.')
        : this.data.success('Product has already benn added to cart.')
    }
}