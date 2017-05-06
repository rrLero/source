import { Injectable }   from '@angular/core';
import {
    Router,
    CanActivate,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
}                           from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService }      from './auth.service';
import { ToastService }     from './toast.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private authService: AuthService,
                private translate: TranslateService,
                private toastService: ToastService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLogged) {
            return true;
        }
        this.translate
            .get('TOAST.GUARD.youMust')
            .subscribe((res: string) =>
                this.toastService.showWarning(res));
        this.router.navigate(['/']);
        return false;
    }
}
