import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    email = '';
    password = '';
    loggged = false;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.logged$.subscribe(logged => this.loggged = logged);
    }

    getDisableLogin(): boolean {
        return this.email === '' || this.password === '';
        // TODO: comprobar email valido y contraseña.length poniendo el error en el string
    }

    login() {
        this.authService.login(this.email, this.password).subscribe();
    }
}
