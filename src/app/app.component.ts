import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title }                               from '@angular/platform-browser';
import { Location }                            from '@angular/common';
import { ToastsManager }                       from 'ng2-toastr/ng2-toastr';
import { TranslateService }                    from '@ngx-translate/core';
import { LocalizeRouterService }               from 'localize-router';
import * as moment                             from 'moment';

import { AuthService, RouterService }          from './services';
import { auth }                                from './shared';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

import 'public/css/styles.css';
import 'public/i18n/config.json';
import 'public/i18n/en.json';
import 'public/i18n/ru.json';
import 'public/i18n/uk.json';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Blog platform';
    name: string;
    repo: string;
    subTitle: boolean;
    subTitleText: string;
    lang: string;
    langs: boolean;
    activeLang: string;
    redirectUri: string;
    githubUrl: string;

    constructor(private routerService: RouterService,
                private location: Location,
                private titleService: Title,
                private translate: TranslateService,
                private localize: LocalizeRouterService,
                private authService: AuthService,
                private toastr: ToastsManager, vcr: ViewContainerRef) {
        toastr.setRootViewContainerRef(vcr);
        translate.addLangs(['en', 'ru', 'uk']);
    }

    ngOnInit(): void {
        this.getParams();
        this.getData();
        this.getAuthUrl();
        this.translate.use(this.lang);
        this.activeLang = this.lang;
        moment.locale(this.lang);
    }

    getAuthUrl(): void {
        this.lang = localStorage.getItem('LOCALIZE_LOCAL_STORAGE') || 'en';
        this.redirectUri = `${auth.redirectUri}/${this.lang}/auth`;
        this.githubUrl = `https://github.com/login/oauth/authorize?client_id=${auth.clientId}&scope=repo&redirect_uri=${this.redirectUri}`;
    }

    getParams(): void {
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

    getData(): void {
        this.routerService
            .getRoute()
            .mergeMap(route => route.data)
            .subscribe(event => {
                this.subTitle = false;
                this.title = 'Blog platform';
                if (event.drafts) {
                    this.subTitle = true;
                    this.translate
                        .get('APP.drafts')
                        .subscribe((res: string) => this.subTitleText = res);
                } else if (event.search) {
                    this.subTitle = true;
                    this.translate
                        .get('APP.search')
                        .subscribe((res: string) => this.subTitleText = res);
                } else if (event.about) {
                    this.title = 'Blog platform / about';
                }
            });
    }

    changeLang(lang: string): void {
        moment.locale(lang);
        this.translate.use(lang);
        this.localize.changeLanguage(lang);
        this.activeLang = lang;
        this.getAuthUrl();
    }

    toggleLangs(): void {
        this.langs = !this.langs;
    }

    savePath(): void {
        localStorage.setItem('path', this.location.path());
    }

    get isLogged(): boolean {
        return this.authService.isLogged;
    }

}
