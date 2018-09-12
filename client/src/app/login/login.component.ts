import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  btnDisabled = false;

  constructor(
      private router: Router,
      private data: DataService,
      private login: LoginService

  ) { }

  ngOnInit() {
  }

}
