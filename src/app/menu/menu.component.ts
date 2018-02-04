import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../shared/interfaces';
import { NotificationService, AuthService, UserService } from '../shared/services';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    animations: [
        trigger('leftNav', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.1s ease-in')
            ]),
            transition('* => void', [
                animate('0.1s 0.1s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }))
            ])
        ])
    ]
})

export class MenuComponent implements OnInit {
    email = '';
    password = '';
    logged = false;
    user: IUser;
    userRegister: IUser;
    password2: IUser['password'];
    menuOpen = !false;
    emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(
        private notificationService: NotificationService,
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
        private zone: NgZone
    ) { }

    ngOnInit() {
        this.userRegister = {};
        this.authService.logged$.subscribe(logged => this.setLoggedAndUser(logged));
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

    private setLoggedAndUser(logged: boolean): void {
        this.logged = logged;
        if (logged) {
            this.userService.getUser().subscribe(
                user => this.user = user,
                error => this.notificationService.generateError(error)
            );
        } else this.user = null;
    }

    logout(): void {
        this.user = null;
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

    setName(name: string): string {
        let nameToReturn = '';
        name.split(' ').forEach(n => {
            if (nameToReturn.length < 2) nameToReturn += n[0];
        });
        return nameToReturn.toLocaleUpperCase();
    }
}
