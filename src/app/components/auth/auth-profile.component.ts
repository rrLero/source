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
    githubUrl = 'https://github.com/login/oauth/authorize?client_id=caf9e03a36ecdaadcfb1&scope=repo&redirect_uri=http://localhost:8080/auth';
    // githubUrl = 'https://github.com/login/oauth/authorize?client_id=48f5b894f42ae1f869d2&scope=repo&redirect_uri=http://acid.zzz.com.ua/auth';
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        public authService: AuthService,
        private userService: UserService) { };
    ngOnInit() {
        if (this.authService.isLogged) {
            // TODO: console.log print 'null' after login user
            console.log(this.profile);
            this.logged = true;
            this.login = this.profile.login;
            this.userService
                .getPermission(this.name, this.repo, this.login)
                .then(({ access }) => this.canEdit = access);
        }
    }

    get profile() {
        return this.userService.getUser();
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
