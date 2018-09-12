import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {LoginService} from "./login.service";

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

  validate() {
    if (this.email) {
      if (this.password) {
        return true
      } else {
        this.data.error('Password is not provided')
      }
    } else {
      this.data.error('Email is nto entered')
    }
  }

}
