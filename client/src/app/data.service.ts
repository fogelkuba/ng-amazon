import {Injectable} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {RestApiService} from "./rest-api.service";
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    message: string = '';
    messageType: string = 'danger';

    user: any;
    cartItems = 0;

    constructor(private router: Router, private rest: RestApiService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.message = '';
            }
        });
    }

    error(message: string) {
        this.messageType = 'danger';
        this.message = message;
    }

    success(message: string) {
        this.messageType = 'success';
        this.message = message;
    }

    warning(message: string) {
        this.messageType = 'warning';
        this.message = message;
    }

    async getProfile() {
        if (localStorage.getItem('token')) {
            this.rest.get('/api/accounts/profile')
                .subscribe(
                    (response) => {
                        console.log(response);
                        this.user = response['user'];
                    },
                    (error) => {
                        const err = error['message'];
                        this.error(err);
                    });

        }
    }

    getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart): [];
    }

    addToCart(item: string) {
        const cart: any = this.getCart();
        if (cart.find(data => JSON.stringify(data) === JSON.stringify(item))) {
            return false;
        } else {
            cart.push(item);
            this.cartItems++;
            localStorage.setItem('cart', JSON.stringify(cart));
            return true;
        }
    }

    clearCart() {
        this.cartItems = 0;
        localStorage.setItem('cart', '[]')
    }

    removeFromCart(item: string) {
        let cart: any = this.getCart();
        if (cart.find(data => JSON.stringify(data) === JSON.stringify(item))) {
            cart = cart.filter(data => JSON.stringify(data) !== JSON.stringify(item));
            this.cartItems--;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    
}
