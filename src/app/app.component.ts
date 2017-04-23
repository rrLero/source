import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title }                               from '@angular/platform-browser';
import { Location }                            from '@angular/common';
import { ToastsManager }                       from 'ng2-toastr/ng2-toastr';
import { TranslateService }                    from '@ngx-translate/core';
import { LocalizeRouterService }               from 'localize-router';
import { AuthService, RouterService }          from './services';
import { auth }                                from './shared/auth';

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
    drafts: boolean;
    lang: string;
    redirectUri: string;
    githubUrl: string;
    constructor(private routerService: RouterService,
                private location: Location,
                private titleService: Title,
                private translate: TranslateService,
                private localize: LocalizeRouterService,
                public authService: AuthService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        toastr.setRootViewContainerRef(vcr);
        translate.addLangs(['en', 'ru']);
        // translate.setDefaultLang('en');
    }

    ngOnInit() {
        this.getParams();
        this.getUrl();
        this.getAuthUrl();
        this.translate.use(this.lang);
    }

    getAuthUrl() {
        this.lang = localStorage.getItem('LOCALIZE_LOCAL_STORAGE') || 'en';
        this.redirectUri = `${auth.redirectUri}/${this.lang}/auth`;
        this.githubUrl = `https://github.com/login/oauth/authorize?client_id=${auth.clientId}&scope=repo&redirect_uri=${this.redirectUri}`;
    }

    getParams() {
        this.routerService
            .getRoute()
            .mergeMap(route => route.params)
            .subscribe(event => {
                this.name = event['name'];
                this.repo = event['repo'];
                this.titleService.setTitle(
                    this.repo && `${this.name} :: ${this.repo}`
                    || this.name
                    || 'Blog Platform'
                );
            });
    }

    getUrl() {
        this.routerService
            .getRoute()
            .mergeMap(route => route.url)
            .subscribe(event => {
                this.drafts = false;
                this.title = 'Blog platform';
                event.forEach(item => {
                    if (item.path === 'drafts') {
                        this.drafts = true;
                    }
                });
                if (event[0].path === 'about') {
                    this.title = 'Blog platform / about';
                }
            });
    }

    changeLang(lang: string) {
        this.translate.use(lang);
        this.localize.changeLanguage(lang);
        this.getAuthUrl();
    }

    savePath() {
        localStorage.setItem('path', this.location.path());
    }
}
