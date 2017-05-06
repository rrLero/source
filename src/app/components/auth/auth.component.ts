import { Component, OnInit }         from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';

import { AuthService, ToastService } from '../../services';

@Component({
    // template: `<spinner></spinner>`,
    template: `<p>Authenticate</p>`,
    styles: [`
      p {
        font-size: 60px;
        color: #ccc;
        text-align: center;
        text-transform: uppercase;
        font-weight: 600;
      }

      @media (max-width: 676px) {
        p {
          font-size: 32px;
        }
      }
    `]
})
export class AuthComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private router: Router,
                private toastService: ToastService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
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
                            this.router.navigate(['/', 'welcome']);
                        }
                    })
                    .catch(error => this.toastService.showError(error));
            });
    }
}
