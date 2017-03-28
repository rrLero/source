import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, ToastService }            from '../../services/index';

@Component({
    template: `<p>Authenticate</p>`,
})
export class AuthComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                public toastService: ToastService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (param: any) => {
                let code = param['code'];
                this.authService.getToken(code)
                    .then((data) => {
                        const user = {
                            access_token: data.token,
                            login: data.login,
                            name: data.name,
                            avatar_url: data.avatar_url,
                        };
                        localStorage.setItem('user', JSON.stringify(user));

                        let path = localStorage.getItem('path');
                        if (path) {
                            this.router.navigate([path]);
                            localStorage.removeItem('path');
                        } else {
                            this.router.navigate(['/']);
                        }
                    })
                    .catch(error => this.toastService.showError(error));
            });
    }

}
