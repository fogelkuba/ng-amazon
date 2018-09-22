import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from './home/home.component';
import {RestApiService} from "./rest-api.service";
import { MessageComponent } from './message/message.component';
import {DataService} from "./data.service";
import { RegistrationComponent } from './registration/registration.component';
import {RegistrationService} from "./registration/registration.service";
import { LoginComponent } from './login/login.component';
import {LoginService} from "./login/login.service";
import {AuthGuardService} from "./auth-guard.service";
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MessageComponent,
        RegistrationComponent,
        LoginComponent,
        ProfileComponent,
        SettingsComponent,
        AddressComponent,
        CategoriesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule.forRoot()
    ],
    providers: [RestApiService,
                DataService,
                RegistrationService,
                LoginService,
                AuthGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
