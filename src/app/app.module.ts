import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListenerComponent } from './listener/listener.component';
import { MainComponent } from './main/main.component';


@NgModule({
    declarations: [
        AppComponent,
        ListenerComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', component: MainComponent },
            { path: '**', redirectTo: '' },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
