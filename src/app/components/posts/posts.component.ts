import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { HttpService }            from '../../services/index';
import { AuthService }            from '../../services/index';
import { DEV }                    from '../../github.config';

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
    template: string;
    githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + DEV.client_id + '&scope=user&redirect_uri=' + DEV.redirect_uri;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private authService: AuthService,
        private httpService: HttpService) { };
    ngOnInit() {
        this.router.navigate([`${this.name}/${this.repo}/page/${this.id || 1}`]);
        this.authService.getProfile().subscribe();
    }

    logout() {
        this.authService.logout();
    }
    savePage() {
        let page = this.location.path().split('/')[4];
        localStorage.setItem('page', page);
    }
}
