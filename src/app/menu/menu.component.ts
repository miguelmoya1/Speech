import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    email = '';
    password = '';

    constructor() { }

    ngOnInit() {
    }

    getDisableLogin(): boolean {
        return this.email === '' || this.password === '';
        // TODO: comprobar email valido y contraseña.length poniendo el error en el string
    }

    login() {
        console.log({ email: this.email, password: this.password })
    }
}
