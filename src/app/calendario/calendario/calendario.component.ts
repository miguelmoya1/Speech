import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TextService } from '../../shared/services/text.service';
import { IText } from '../../shared/interfaces/itext';
declare let $: any;

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit, AfterViewInit {
    fullCalendar;
    events;
    texts: IText[] = [];

    constructor(
        private textService: TextService
    ) { }

    ngOnInit() {
        this.fullCalendar = $('#fullCalendar');

        this.textService.newText$.subscribe(
            text => {
                this.texts.push(text);
                this.renderEvent(text);
            }
        );

    }

    ngAfterViewInit() {
        this.textService.getAll().subscribe(
            text => {
                this.texts = text;
                this.generateEvent(text);
            },
            error => console.log(error),
            () => this.createCalendar()
        );
    }

    createCalendar() {
        this.fullCalendar.fullCalendar({
            timeFormat: 'H:mm',
            locale: 'es',
            eventSources: [this.events],
        });
    }

    generateEvent(texts: IText[]) {
        this.events = [];
        texts.forEach(text => {
            this.events.push({
                id: text.id,
                title: text.title,
                start: text.date_start,
                end: text.date_finish,
                text: text.text
            });
        });
    }

    renderEvent(text: IText) {
        this.fullCalendar.fullCalendar('renderEvent', {
            id: text.id,
            title: text.title,
            start: text.date_start,
            end: text.date_finish,
            text: text.text
        }, true);
    }
}
