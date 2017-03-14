import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AuthService } from '../../services/index';

@Component({
    selector: 'auth-profile',
    templateUrl: 'auth-profile.component.html',
    styleUrls: ['auth-profile.component.scss']
})
export class AuthProfileComponent implements OnInit {
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}/`;
    canEdit = false;
    logged = false;
    // githubUrl = 'https://github.com/login/oauth/authorize?client_id=caf9e03a36ecdaadcfb1&scope=repo&redirect_uri=http://localhost:8080/auth';
    githubUrl = 'https://github.com/login/oauth/authorize?client_id=48f5b894f42ae1f869d2&scope=repo&redirect_uri=http://acid.zzz.com.ua/auth';
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private authService: AuthService) { };
    ngOnInit() {
        if (this.authService.isLogged) {
            this.authService.getProfile().subscribe(() => {
                this.logged = true;
                let login = this.authService.loggedUser.login;
                this.authService
                    .getPermission(this.name, this.repo, login)
                    .then(({ access }) => this.canEdit = access);
            });
        }
    }

    get service() {
        return this.authService;
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
