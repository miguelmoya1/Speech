import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { SpeechRecognition } from '../shared/interfaces/ISpeechRecognition';
declare let speechSynthesis: any;
declare let webkitSpeechRecognition: any; // FIXME: A implementar la interfaz

@Component({
    selector: 'app-listener',
    templateUrl: './listener.component.html',
    styleUrls: ['./listener.component.css']
})
export class ListenerComponent implements OnInit {
    actualText = '';
    textRrecognizing = '';
    recognition: SpeechRecognition; // TODO: Crear interfaz y ponerlo
    recognizing = false;

    @ViewChild('textareaToWrite') textareaToWrite;

    constructor(
        private ngZone: NgZone
    ) { }

    ngOnInit() {
        if (!('webkitSpeechRecognition' in window)) {
            // TODO: Mostrar error de que no se reconoce.
        } else {
            this.recognition = new webkitSpeechRecognition();

            this.recognition.lang = 'es-ES';
            this.recognition.continuous = true;
            this.recognition.interimResults = true;

            this.recognition.onstart = (e, a) => {
                this.ngZone.run(() => {
                    this.recognizing = true;
                });
            };

            this.recognition.onerror = event => { };

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
                }
            };

            this.listen();
        }
    }

    listen() {
        if (!this.recognizing) {
            this.recognition.start();
            this.recognizing = true;
        } else {
            this.recognition.stop();
            this.recognizing = false;
        }
    }

}
