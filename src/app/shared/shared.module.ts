import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    TooltipComponent,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatInputModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatInputModule,
        TooltipComponent,
    ],
    declarations: [
        // TooltipComponent,
    ],
})
export class SharedModule { }
