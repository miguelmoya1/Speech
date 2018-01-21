import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { INotification } from '../interfaces/inotification';

@Injectable()
export class NotificationService {

    notification$: EventEmitter<INotification> = new EventEmitter<INotification>();

    constructor() { }

    generateError(message: string): void {
        this.notification$.emit({ message: message, type: 1 });
    }

    generateSuccess(message: string): void {
        this.notification$.emit({ message: message, type: 2 });
    }
}
