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
  }

}
