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
    menuOpen = false;
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

    setName(name: string): string {
        let nameToReturn = '';
        name.split(' ').forEach(n => {
            if (nameToReturn.length < 2) nameToReturn += n[0];
        });
        return nameToReturn.toLocaleUpperCase();
    }
}
