import { Component, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { INotification } from './shared/interfaces/inotification';
import { NotificationService } from './shared/services/notification.service';

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
    // title = 'app';
    notification: INotification;

    constructor(
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.notificationService.notification$.subscribe(
            notification => {
                this.notification = notification;
                setTimeout(() => delete this.notification, 7500);
            }
        );
    }

}
