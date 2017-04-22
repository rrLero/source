import { Injectable }   from '@angular/core';
import {
    Router,
    CanActivate,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
}                       from '@angular/router';
import { AuthService }  from './auth.service';
import { ToastService } from './toast.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private authService: AuthService,
                public toastService: ToastService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLogged) {
            return true;
        }
        this.toastService.showWarning('You must be logged in');
        this.router.navigate(['/']);
        return false;
    }
}
