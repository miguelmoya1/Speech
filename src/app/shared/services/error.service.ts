import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IError } from '../interfaces/error';

@Injectable()
export class ErrorService {

    error: EventEmitter<IError> = new EventEmitter<IError>();

    constructor() { }

    generateError(message: string): void {
        this.error.emit({ message: message });
    }

}
