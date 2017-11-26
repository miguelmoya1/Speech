import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { IUser } from '../shared/interfaces/iuser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    email = '';
    password = '';
    logged = false;
    user: IUser;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.logged$.subscribe(logged => this.setLoggedAndUser(logged));
        this.authService.isLogged().subscribe();
    }

    getDisableLogin(): boolean {
        return this.email === '' || this.password === ''; // TODO: Comprobar email valido y contraseña.length poniendo el error en el string
    }

    login() {
        this.authService.login(this.email, this.password).subscribe(); // TODO: Comprobar cosas.
    }

    private setLoggedAndUser(logged: boolean): void {
        this.logged = logged;
        if (logged)
            this.userService.getUser().subscribe(
                user => this.user = user,
                error => { } // TODO: Mostrar el error
            );
        else this.user = null;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
