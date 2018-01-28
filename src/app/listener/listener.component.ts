import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ISpeechRecognition, IUser, IText } from '../shared/interfaces';
import { TextService, AuthService, UserService } from '../shared/services';

declare let $: any;
declare let webkitSpeechRecognition: any; // FIXME: A implementar la interfaz

@Component({
    selector: 'app-listener',
    templateUrl: './listener.component.html',
    styleUrls: ['./listener.component.scss']
})
export class ListenerComponent implements OnInit {
    actualText = '';
    textRrecognizing = '';
    recognition: ISpeechRecognition;
    recognizing = false;
    title = '';
    firstTime = true;
    dateStart: Date;
    user: IUser;
    languages = [{
        name: 'Español',
        value: 'es-ES'
    }, {
        name: 'Francés',
        value: 'fr-FR'
    }, {
        name: 'English',
        value: 'en-US'
    }];
    selectedLanguage = 0;

    @ViewChild('pText') pText;

    constructor(
        private ngZone: NgZone,
        private textService: TextService,
        private authService: AuthService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.authService.logged$.subscribe(logged => this.setLoggedAndUser(logged));
        this.authService.isLogged().subscribe();

        if (!('webkitSpeechRecognition' in window)) {
            // TODO: Mostrar error de que no se reconoce.
        } else {
            this.recognition = new webkitSpeechRecognition();

            this.recognition.lang = this.languages[this.selectedLanguage].value;
            this.recognition.continuous = true;
            this.recognition.interimResults = true;

            this.recognition.onstart = (e) => {
                this.ngZone.run(() => {
                    this.recognizing = true;
                });
            };

            this.recognition.onerror = event => { };

            if (window.innerWidth <= 810) {
                this.recognition.onend = () => {
                    this.ngZone.run(() => this.actualText += this.textRrecognizing);
                    this.textRrecognizing = ' ';
                    this.ngZone.run(() => this.recognizing = false);
                };

                this.recognition.onresult = event => {
                    if (event.results[event.results.length - 1]) this.textRrecognizing = event.results[event.results.length - 1][0].transcript;
                };
            } else {
                this.recognition.onend = () => this.ngZone.run(() => this.recognizing = false);
                this.recognition.onresult = event => {
                    for (let i = event.resultIndex; i < event.results.length; i++) this.ngZone.run(() => this.textRrecognizing = event.results[i][0].transcript);

                    if (event.results[event.results.length - 1] && event.results[event.results.length - 1].isFinal) {
                        this.ngZone.run(() => {
                            this.actualText += this.textRrecognizing.charAt(0).toLocaleUpperCase() + this.textRrecognizing.slice(1);
                            this.textRrecognizing = ' ';
                        });
                    }
                };
            }
        }
    }

    private setLoggedAndUser(logged: boolean): void {
        if (logged)
            this.userService.getUser().subscribe(
                user => this.user = user,
                error => { } // TODO: Mostrar el error
            );
        else this.user = null;
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
            this.actualText += this.textRrecognizing.charAt(0).toLocaleUpperCase() + this.textRrecognizing.slice(1);
            this.textRrecognizing = '';
            this.recognizing = false;
        }
    }

    changeLanguage() {
        this.recognition.lang = this.languages[this.selectedLanguage].value;
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
            text: this.pText.nativeElement.innerText,
            date_start: this.dateStart,
            date_finish: new Date()
        };
        this.textService.add(text).subscribe(); // FIXME: Ya sabes lo que hay que hacer
        $('#saveTitle').modal('hide');
        this.title = '';
        this.actualText = '';
        this.firstTime = true;
    }
}
