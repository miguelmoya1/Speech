import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { NgZone } from '@angular/core';

interface IWindow extends Window {
    webkitSpeechRecognition: any;
}
const { webkitSpeechRecognition }: IWindow = <IWindow>window;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    actualText = '';
    textRrecognizing = '';
    recognition; // TODO: Crear interfaz y ponerlo
    recognizing = false;

    constructor(private ngZone: NgZone) { }

    @ViewChild('textareaToWrite') textareaToWrite;

    ngOnInit() {
        // observe(this.textareaToWrite, 'change', resize);
        // observe(this.textareaToWrite, 'cut', delayedResize);
        // observe(this.textareaToWrite, 'paste', delayedResize);
        // observe(this.textareaToWrite, 'drop', delayedResize);
        // observe(this.textareaToWrite, 'keydown', delayedResize);

        this.recognition = new webkitSpeechRecognition();
        this.recognition.lang = 'es-ES';
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.onstart = () => {
            this.ngZone.run(() => {
                this.recognizing = true;
            });
        };

        this.recognition.onerror = event => {
            console.log(event);
        };

        this.recognition.onend = () => {
            this.ngZone.run(() => {
                this.recognizing = false;
            });
        };

        this.recognition.onresult = event => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                this.ngZone.run(() => {
                    this.textRrecognizing = event.results[i][0].transcript;
                });
            }
            if (event.results[event.results.length - 1] && event.results[event.results.length - 1].isFinal) {
                this.ngZone.run(() => {
                    this.actualText += this.textRrecognizing;
                    this.textRrecognizing = '';
                });
                this.resize();
            }
        };

        this.escuchar();
    }

    escuchar() {
        if (!this.recognizing) {
            this.recognition.start();
            this.recognizing = true;
        } else {
            this.recognition.stop();
            this.recognizing = false;
        }
    }

    resize() {
        this.ngZone.run(() => {
            this.textareaToWrite.nativeElement.style.height = 'auto';
            this.textareaToWrite.nativeElement.style.height = this.textareaToWrite.nativeElement.scrollHeight + 'px';
        });
    }
}
