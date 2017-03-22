import { Component, OnInit }                     from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title }                                 from '@angular/platform-browser';
import { Location }                              from '@angular/common';
import { AuthService }                           from './services/index';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

import '../../public/css/styles.css';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Blog platform';
    name: string;
    repo: string;
    // githubUrl = 'https://github.com/login/oauth/authorize?client_id=caf9e03a36ecdaadcfb1&scope=repo&redirect_uri=http://localhost:8080/auth';
    githubUrl = 'https://github.com/login/oauth/authorize?client_id=48f5b894f42ae1f869d2&scope=repo&redirect_uri=http://acid.zzz.com.ua/auth';

    constructor(private router: Router,
                private location: Location,
                private titleService: Title,
                public authService: AuthService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.getParams();
    }
    getParams() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                };
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.params)
            .subscribe((event) => {
                this.name = event['name'];
                this.repo = event['repo'];
                this.titleService.setTitle(
                    this.repo && `${this.name} : ${this.repo}`
                    || this.name
                    || 'Blog Platform'
                );
            });
    }
    savePath() {
        localStorage.setItem('path', this.location.path());
    }
}
