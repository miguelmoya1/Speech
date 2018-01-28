import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IText } from '../../shared/interfaces';
import { TextService, NotificationService } from '../../shared/services';
declare let $: any;

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit, AfterViewInit {
    fullCalendar;
    events: IText[];
    texts: IText[] = [];
    textEdit: IText;
    @ViewChild('pText') pText;

    constructor(
        private textService: TextService,
        private notificationService: NotificationService
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
            error => this.notificationService.generateError(error),
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
                this.textEdit = this.texts.find(e => e.id === event.id);
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
            id: text.id,
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
                    if (e.id === this.textEdit.id) e = this.textEdit;
                    return e;
                });
                this.fullCalendar.fullCalendar('removeEvents', this.textEdit.id);
                this.renderEvent(this.textEdit);
                this.closeModal();
            },
            error => {
                this.notificationService.generateError(error);
                this.closeModal();
            }
        );
    }

    closeModal() {
        $('#editModal').modal('hide');
    }
}
