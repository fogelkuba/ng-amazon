import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    searchTerm: string = '';
    isCollapsed: boolean = true;

    get token() {
        return localStorage.getItem('token');
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }

    collapse() {
        this.isCollapsed = true;
    }

    closeDropdown(dropdown) {
        dropdown.close();
    }

    logout() {

    }

    search() {

    }
}
