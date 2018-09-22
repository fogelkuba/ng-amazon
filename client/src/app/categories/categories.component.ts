import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any;

  constructor(private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
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

}
