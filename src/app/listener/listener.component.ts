import { Component, OnInit, NgZone } from '@angular/core';
import { SpeechRecognition } from '../shared/interfaces/ISpeechRecognition';
import { IText } from '../shared/interfaces/itext';
import { TextService } from '../shared/services/text.service';
declare let $: any;
declare let speechSynthesis: any;
declare let webkitSpeechRecognition: any; // FIXME: A implementar la interfaz

@Component({
    selector: 'app-listener',
    templateUrl: './listener.component.html',
    styleUrls: ['./listener.component.scss']
})
export class ListenerComponent implements OnInit {
    actualText = '';
    textRrecognizing = '';
    recognition: SpeechRecognition; // TODO: Crear interfaz y ponerlo
    recognizing = false;
    title = '';
    firstTime = true;
    dateStart: Date;

    constructor(
        private ngZone: NgZone,
        private textService: TextService
    ) { }

    ngOnInit() {
        if (!('webkitSpeechRecognition' in window)) {
            // TODO: Mostrar error de que no se reconoce.
        } else {
            this.recognition = new webkitSpeechRecognition();

            this.recognition.lang = 'es-ES';
            this.recognition.continuous = true;
            this.recognition.interimResults = true;

            this.recognition.onstart = (e) => {
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
                // TODO: Comprobar si ha pasado mas de X tiempo y si es así añadirlo, para que no se quede bloqueado.
                if (event.results[event.results.length - 1] && event.results[event.results.length - 1].isFinal) {
                    this.ngZone.run(() => {
                        this.actualText += this.textRrecognizing.charAt(0).toLocaleUpperCase() + this.textRrecognizing.slice(1);
                        this.textRrecognizing = '';
                    });
                }
            };
        }
    }

    listen() {
        if (this.firstTime) {
            this.firstTime = !this.firstTime;
            this.dateStart = new Date();
        }
        if (!this.recognizing) {
            this.recognition.start();
            this.recognizing = true;
        } else {
            this.recognition.stop();
            this.recognizing = false;
        }
    }

    download(type: string) {
        if (type === 'copy') {
            const aux = document.createElement('input');
            aux.setAttribute('value', this.actualText);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand('copy');
            document.body.removeChild(aux);
        } else {
            const link = document.createElement('a'),
                fileName = 'text.' + type,
                mimeType = 'text/plain';

            link.setAttribute('download', fileName);
            link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(this.actualText));
            link.click();
        }
    }

    saveTitle() {
        const text: IText = {
            title: this.title,
            text: this.actualText,
            date_start: this.dateStart
        };
        // TODO: Enviar datos al servidor
        this.textService.add(text).subscribe(); // FIXME: Ya sabes lo que hay que hacer
        $('#saveTitle').modal('hide');
        this.title = '';
        this.firstTime = true;
    }
}
