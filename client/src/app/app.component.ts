import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchTerm:string = '';
  isCollapsed:boolean = true;

  get token() {
    return localStorage.getItem('token');
  }

  collapse() {
      this.isCollapsed = !this.isCollapsed;
  }
}
