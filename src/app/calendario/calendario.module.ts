import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario/calendario.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: CalendarioComponent },
            { path: '**', redirectTo: '' },
        ]),
    ],
    declarations: [
        CalendarioComponent
    ]
})
export class CalendarioModule { }
