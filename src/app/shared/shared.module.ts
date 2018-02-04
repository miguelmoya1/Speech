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
    MatSelectModule,
    MatTabsModule,
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
        MatSelectModule,
        MatTabsModule,
    ],
    exports: [
        TooltipComponent,
        MatButtonModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
    ],
    declarations: [
        // TooltipComponent,
    ],
})
export class SharedModule { }
