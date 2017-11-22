import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
declare let $: any;

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit, AfterViewInit {
    fullCalendar;

    constructor() { }

    ngOnInit() {
        this.fullCalendar = $('#fullCalendar');
    }

    ngAfterViewInit() {
        this.fullCalendar.fullCalendar({
            timeFormat: 'H:mm',
            locale: 'es'
        });
    }
}
