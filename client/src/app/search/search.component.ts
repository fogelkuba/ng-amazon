import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../rest-api.service";
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string;
  page = 1;

  constructor(private rest: RestApiService,
              private data: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
