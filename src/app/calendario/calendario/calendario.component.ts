import { Component, OnInit, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TextService } from '../../shared/services/text.service';
import { IText } from '../../shared/interfaces/itext';
import { ErrorService } from '../../shared/services/error.service';
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
    textEdit: IText;
    @ViewChild('pText') pText;

    constructor(
        private textService: TextService,
        private errorService: ErrorService
    ) {
        this.textEdit = { title: '' };
    }

    ngOnInit(): void {
        this.fullCalendar = $('#fullCalendar');

        this.textService.newText$.subscribe(
            text => {
                this.texts.push(text);
                this.renderEvent(text);
            }
        );
    }

    ngAfterViewInit(): void {
        this.textService.getAll().subscribe(
            text => {
                this.texts = text;
                this.generateEvent(text);
            },
            error => this.errorService.generateError(error),
            () => this.createCalendar()
        );
    }

    createCalendar(): void {
        this.fullCalendar.fullCalendar({
            timeFormat: 'H:mm',
            locale: 'es',
            eventLimit: true,
            eventSources: [this.events],
            eventClick: (event, element) => {
                this.textEdit = this.texts.find(e => e._id === event.id);
                $('#editModal').modal();
            },
        });
    }

    generateEvent(texts: IText[]): void {
        this.events = [];
        texts.forEach(text => this.events.push(this.setEvent(text)));
    }

    renderEvent(text: IText): void {
        this.fullCalendar.fullCalendar('renderEvent', this.setEvent(text));
    }

    setEvent(text: IText): {} { // TODO: Interfaz de evento
        return {
            id: text._id,
            title: text.title,
            start: text.date_start,
            end: text.date_finish
        };
    }

    updateText(): void {
        this.textEdit.text = this.pText.nativeElement.innerText;
        this.textService.update(this.textEdit).subscribe(
            () => {
                this.texts = this.texts.filter(e => {
                    if (e._id === this.textEdit._id) e = this.textEdit;
                    return e;
                });
                this.fullCalendar.fullCalendar('removeEvents', this.textEdit._id);
                this.renderEvent(this.textEdit);
                $('#editModal').modal('hide');
            }
        ); // TODO: Mostrar algo :D
    }
}
