import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ListenerComponent } from './listener/listener.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatButtonToggleModule, MatIconModule, MatTooltipModule, MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService, TextService, AuthService, NotificationService } from './shared/services';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from './app.module';
import { CanActivateGuard } from './shared/guards/can-activate.guard';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ListenerComponent,
                MainComponent,
                MenuComponent,
            ], imports: [
                RouterModule,
                CommonModule,
                MatButtonModule,
                MatCheckboxModule,
                MatButtonToggleModule,
                MatIconModule,
                MatTooltipModule,
                MatDialogModule,
                MatInputModule,
                MatSelectModule,
                BrowserModule,
                SharedModule,
                FormsModule,
                HttpModule,
                BrowserAnimationsModule,
                BrowserDynamicTestingModule,
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
                NotificationService,
            {
                provide: APP_BASE_HREF,
                useValue: '/'
            }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));
    // it('should create the app', async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app).toBeTruthy();
    // }));
    // it(`should have as title 'app'`, async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app.title).toEqual('app');
    // }));
    // it('should render title in a h1 tag', async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
    // }));
});
