import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services';

@Injectable()
export class CantActivateLoggedGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
        return this.authService.isLogged().map(val => !val).do(
            val => {
                if (!val) this.router.navigate(['/']);
            }
        );
    }
}
