import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { ListenerComponent } from './listener/listener.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from './shared/shared.module';
import { MenuComponent } from './menu/menu.component';
import { UserService } from './shared/services/user.service';
import { TextService } from './shared/services/text.service';
import { AuthService } from './shared/services/auth.service';
import { CanActivateGuard } from './shared/guards/can-activate.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorService } from './shared/services/error.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        headerName: 'Authorization',
        tokenName: 'id_token',
        tokenGetter: (() => localStorage.getItem('id_token')),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}

@NgModule({
    declarations: [
        AppComponent,
        ListenerComponent,
        MainComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            {
                path: 'calendario',
                canActivate: [CanActivateGuard],
                loadChildren: './calendario/calendario.module#CalendarioModule'
            },
            {
                path: '',
                component: MainComponent
            },
            {
                path: '**',
                redirectTo: ''
            },
        ]),
    ],
    providers: [{
        provide: AuthHttp,
        useFactory: authHttpServiceFactory,
        deps: [Http, RequestOptions]
    },
        UserService,
        TextService,
        AuthService,
        ErrorService,
        CanActivateGuard
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
