import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces';
import { AuthService } from '../../shared/services';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    email = '';
    password = '';
    logged = false;
    user: IUser;
    userRegister: IUser;
    password2: IUser['password'];
    emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(
        private authService: AuthService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.userRegister = {};
    }

    getDisableLogin(): boolean {
        return this.email === '' || this.password === '' || this.password.length < 6;
    }

    login(): void {
        this.authService.login(this.email, this.password).subscribe(
            () => {
                this.email = '';
                this.password = '';
            }, // TODO: Mostrar cosas
            error => this.notificationService.generateError(error)
        );
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
                    this.email = this.userRegister.nick;
                    this.password = this.userRegister.password;
                    this.login();
                    for (const i in this.userRegister) this.userRegister[i] = '';
                    this.password2 = '';
                },
                error => this.notificationService.generateError(error)
            );
        }
    }
}
