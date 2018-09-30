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
  content: any;

  constructor(private rest: RestApiService,
              private data: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.query= res['query'];
      this.page = 1;
      this.getProducts();
    })
  }

  get lower() {
    return 1 + this.content.hitsPerPAge * this.content.page;
  }

  get upper() {
    return Math.min(
        this.content.hitsPerPage * (this.content.page + 1),
        this.content.nbHits
    )
  }

  getProducts() {
    this.rest.get(`/api/search?query=${this.query}&page=${this.page - 1}`).subscribe(
        (response) => {
          response['success'] ? this.content = response['content'] : this.data.error(response['message']);
        },
        (err) => {
          this.data.error(err['message'])
        }
    )
  }

}
