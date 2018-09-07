import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  message: string = '';
  messageType: string = 'danger';

  constructor( private router: Router) {
    this.router.events.subscribe();
  }
}
