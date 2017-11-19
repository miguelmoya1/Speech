import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListenerComponent } from './listener/listener.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from './shared/shared.module';
import { MenuComponent } from './menu/menu.component';


@NgModule({
    declarations: [
        AppComponent,
        ListenerComponent,
        MainComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        SharedModule,
        RouterModule.forRoot([
            { path: '', component: MainComponent },
            { path: '**', redirectTo: '' },
        ]),
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
