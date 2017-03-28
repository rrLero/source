import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AuthService, UserService, ToastService } from '../../services/index';

@Component({
    selector: 'auth-profile',
    templateUrl: 'auth-profile.component.html',
    styleUrls: ['auth-profile.component.scss']
})
export class AuthProfileComponent implements OnInit {
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}/`;
    canEdit: boolean = false;
    logged: boolean = false;
    dropdown = false;
    path: string;
    user: string;
    login: string;
    profile: any;

    constructor(private router: Router,
                private location: Location,
                private route: ActivatedRoute,
                public authService: AuthService,
                public toastService: ToastService,
                private userService: UserService) { };

    ngOnInit() {
        if (this.authService.isLogged) {
            this.profile = this.userService.getUser();
            this.logged = true;
            this.login = this.profile.login;
            this.userService
                .getPermission(this.name, this.repo, this.login)
                .then(({ access }) => this.canEdit = access)
                .catch(error => this.toastService.showError(error));
        }
    }
    logout() {
        this.logged = false;
        this.authService.logout();
        this.router.navigate(['/welcome']);

    }
    getPath() {
        this.path = this.location.path().split('/')[1];
        this.user = this.location.path().split('/')[2];
    }
}
