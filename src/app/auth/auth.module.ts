import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent },
            { path: '**', redirectTo: '' }
        ]),
    ],
    declarations: [
        AuthComponent
    ]
})
export class AuthModule { }
