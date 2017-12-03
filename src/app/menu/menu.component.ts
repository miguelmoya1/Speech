import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { IUser } from '../shared/interfaces/iuser';
import { Router } from '@angular/router';
import { ErrorService } from '../shared/services/error.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    email = '';
    password = '';
    logged = false;
    user: IUser;
    userRegister: IUser;
    password2: IUser['password'];
    emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
        private errorService: ErrorService
    ) { }

    ngOnInit() {
        this.userRegister = {};
        this.authService.logged$.subscribe(logged => this.setLoggedAndUser(logged));
    }

    getDisableLogin(): boolean {
        return this.email === '' || this.password === '' || this.password.length < 6; // TODO: contraseña.length poniendo el error en el string
    }

    login(): void {
        this.authService.login(this.email, this.password).subscribe(
            () => { }, // TODO: Mostrar cosas
            error => this.errorService.generateError(error)
        );
    }

    private setLoggedAndUser(logged: boolean): void {
        this.logged = logged;
        if (logged)
            this.userService.getUser().subscribe(
                user => this.user = user,
                error => this.errorService.generateError(error)
            );
        else this.user = null;
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    cantRegister(): boolean | string {
        if (this.userRegister.name && this.userRegister.name.trim() !== '')
            if (this.userRegister.surname && this.userRegister.surname.trim() !== '')
                if (this.userRegister.email && this.emailExp.test(this.userRegister.email))
                    if (this.userRegister.password && this.userRegister.password.length >= 6)
                        if (this.password2 && this.password2 === this.userRegister.password)
                            if (this.userRegister.nick && this.userRegister.nick.trim() !== '')
                                return false;
                            else return 'El nick es necesario'; // TODO: Comprobar en la base de datos que no exista
                        else return 'Las contraseñas tienen que coincidir';
                    else return 'La contrasña tiene que ser de 6 caracteres mínimos';
                else return 'El correo no es válido';
            else return 'El apellido es necesario';
        else return 'El nombre es necesario';
    }

    register(): void {
        if (!this.cantRegister()) {
            this.authService.register(this.userRegister).subscribe(
                () => {
                    this.authService.login(this.userRegister.email, this.userRegister.password).subscribe(
                        () => { }, // TODO: Mostrar cosas
                        error => this.errorService.generateError(error)
                    );
                    for (const i in this.userRegister) this.userRegister[i] = '';
                    this.password2 = '';
                },
                error => this.errorService.generateError(error)
            );
        }
    }
}
