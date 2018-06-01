import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule, RequestOptions } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { ListenerComponent } from './listener/listener.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from './shared/shared.module';
import { CanActivateGuard } from './shared/guards/can-activate.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService, TextService, AuthService, NotificationService } from './shared/services';
import { CantActivateLoggedGuard } from './shared/guards/cant-activate-logged.guard';
import { BacklightComponent } from './backlight/backlight.component';
import { HttpAuth } from './shared/services/HttpAuth.service';
import { HttpClientModule } from '@angular/common/http';
import { IfVideoComponent } from './if-video/if-video.component';
import { FooterModule } from './footer/footer.module';

@NgModule({
    declarations: [
        AppComponent,
        ListenerComponent,
        MainComponent,
        MenuComponent,
        BacklightComponent,
        IfVideoComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        SharedModule,
        FooterModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([{
            path: 'calendario',
            canActivate: [CanActivateGuard],
            loadChildren: './calendario/calendario.module#CalendarioModule'
        }, {
            path: 'auth',
            canActivate: [CantActivateLoggedGuard],
            loadChildren: './auth/auth.module#AuthModule'
        }, {
            path: '',
            component: MainComponent
        }, {
            path: '**',
            redirectTo: ''
        }]),
    ],
    providers: [
        UserService,
        TextService,
        AuthService,
        HttpAuth,
        NotificationService,
        CanActivateGuard,
        CantActivateLoggedGuard
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
