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

}
