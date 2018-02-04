import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioComponent } from './calendario.component';
import { MatButtonModule, MatCheckboxModule, MatButtonToggleModule, MatIconModule, MatTooltipModule, MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, TextService, AuthService, NotificationService } from '../../shared/services';
import { AuthHttp } from 'angular2-jwt';
import { authHttpServiceFactory } from '../../app.module';
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CalendarioComponent', () => {
    let component: CalendarioComponent;
    let fixture: ComponentFixture<CalendarioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarioComponent],
            imports: [
                MatButtonModule,
                MatCheckboxModule,
                MatButtonToggleModule,
                MatIconModule,
                MatTooltipModule,
                MatDialogModule,
                MatInputModule,
                MatSelectModule,
                RouterModule,
                CommonModule,
                FormsModule,
                HttpModule
            ], providers: [{
                provide: AuthHttp,
                useFactory: authHttpServiceFactory,
                deps: [Http, RequestOptions]
            },
                UserService,
                TextService,
                AuthService,
                NotificationService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
