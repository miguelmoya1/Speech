import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTooltipModule,
    ],
    declarations: [],
})
export class SharedModule { }
