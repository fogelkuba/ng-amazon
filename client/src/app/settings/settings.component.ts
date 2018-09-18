import { Component, OnInit } from '@angular/core';

import {DataService} from "../data.service";
import {RestApiService} from "../rest-api.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  btnDisabled = false;
  currentSettings: any;

  constructor(public data: DataService, private rest: RestApiService) { }

  ngOnInit() {
  }

}
