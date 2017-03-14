import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { AuthService, HttpService }            from '../../services/index';

@Component({
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss']
})
export class PostsComponent implements OnInit {
    date = new Date();
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    id = this.route.snapshot.params['id'];
    url = `/${this.name}/${this.repo}/`;
    canEdit = false;
    // githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=caf9e03a36ecdaadcfb1&scope=repo&redirect_uri=http://localhost:8080/auth';
    githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=48f5b894f42ae1f869d2&scope=repo&redirect_uri=http://acid.zzz.com.ua/auth';
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private httpService: HttpService,
        private authService: AuthService) { };
    ngOnInit() {
        this.router.navigate([`${this.name}/${this.repo}/page/${this.id || 1}`]);
        if (this.authService.isLogged) {
            this.authService.getProfile().subscribe(() => {
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
        this.authService.logout();
        this.router.navigate(['/welcome']);
    }
    savePage() {
        let page = this.location.path().split('/')[4];
        localStorage.setItem('page', page);
    }
}
