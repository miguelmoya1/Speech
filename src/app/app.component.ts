import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { IError } from './shared/interfaces/error';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ErrorService } from './shared/services/error.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('modal-bottom', [
            transition('* => void', [
                style({ height: '*' }),
                animate(250, style({ height: 0 }))
            ]),
            transition('void => *', [
                style({ height: 0 }),
                animate(250, style({ height: '*' }))
            ])
        ])
    ]
})
export class AppComponent implements OnInit {
    error: IError;

    constructor(
        private errorService: ErrorService
    ) { }

    ngOnInit() {
        this.errorService.error.subscribe(error => {
            this.error = error;
            setTimeout(() => delete this.error, 10000);
        });
    }

}
