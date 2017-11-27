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
    userRegister: IUser;
    password2: IUser['password'];

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.userRegister = {};
        this.authService.logged$.subscribe(logged => this.setLoggedAndUser(logged));
        this.authService.isLogged().subscribe();
    }

    getDisableLogin(): boolean {
        return this.email === '' || this.password === ''; // TODO: Comprobar email valido y contraseña.length poniendo el error en el string
    }

    login(): void {
        this.authService.login(this.email, this.password).subscribe(); // TODO: Comprobar cosas.
    }

    private setLoggedAndUser(logged: boolean): void {
        this.logged = logged;
        if (logged)
            this.userService.getUser().subscribe(
                user => this.user = user,
                error => { } // TODO: Mostrar error
            );
        else this.user = null;
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    showError(): void {
        // TODO: mostrar error
    }

    canRegister(): boolean | string {
        const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.userRegister.name && this.userRegister.name.trim() !== '') {
            if (this.userRegister.surname && this.userRegister.surname.trim() !== '') {
                if (this.userRegister.email && email.test(this.userRegister.email)) {
                    if (this.userRegister.password && this.userRegister.password.length >= 6) {
                        if (this.password2 && this.password2 === this.userRegister.password) {
                            if (this.userRegister.nick && this.userRegister.nick.trim() !== '') {
                                return false;
                            } else return 'El nick es necesario'; // TODO: Comprobar en la base de datos que no exista
                        } else return 'Las contraseñas tienen que coincidir';
                    } else return 'La contrasña tiene que ser de 6 caracteres mínimos';
                } else return 'El correo no es válido';
            } else return 'El apellido es necesario';
        } else return 'El nombre es necesario';
    }

    register(): void {
        if (!this.canRegister())
            this.authService.register(this.userRegister).subscribe(
                () => {
                    this.authService.login(this.userRegister.email, this.userRegister.password).subscribe();
                    for (const i in this.userRegister) this.userRegister[i] = '';
                }, // TODO: Mostrar que se ha registrado con exito.
                error => this.showError() // TODO: Mostrar error de por que no se ha podido registrar.
            );
    }
}
