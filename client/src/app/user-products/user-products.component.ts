import { Component, OnInit } from '@angular/core';

import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit {

  products: any;

  constructor(private data: DataService, private rest:RestApiService) { }

  ngOnInit() {
  }

  fetchProducts() {
    this.rest.get('/api/seller/products')
        .subscribe(
            (response) => {
                if (response['success']) {
                    // const msg = response['message'];
                    // this.data.success(msg)
                    this.products = response['products']
                }
                else {
                    const msg = response['message'];
                    this.data.error(msg)
                }
            },
            (error) => {
                this.data.error(error['message'])
            }
        )
  }

}
