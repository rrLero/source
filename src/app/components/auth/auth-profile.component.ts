import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AuthService } from '../../services/index';
import { UserService } from '../../services/index';

@Component({
    selector: 'auth-profile',
    templateUrl: 'auth-profile.component.html',
    styleUrls: ['auth-profile.component.scss']
})
export class AuthProfileComponent implements OnInit {
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}/`;
    login: string;
    canEdit: boolean = false;
    logged: boolean = false;
    profile: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        public authService: AuthService,
        private userService: UserService) { };
    ngOnInit() {
        if (this.authService.isLogged) {
            this.profile = this.userService.getUser();
            this.logged = true;
            this.login = this.profile.login;
            this.userService
                .getPermission(this.name, this.repo, this.login)
                .then(({ access }) => this.canEdit = access);
        }
    }

    logout() {
        this.logged = false;
        this.authService.logout();
        this.router.navigate(['/welcome']);

    }
    savePath() {
        localStorage.setItem('path', this.location.path());
    }
}
