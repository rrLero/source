import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title }                               from '@angular/platform-browser';
import { Location }                            from '@angular/common';
import { ToastsManager }                       from 'ng2-toastr/ng2-toastr';
import { AuthService, RouterService }          from './services/index';

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
    // githubUrl = 'https://github.com/login/oauth/authorize?client_id=caf9e03a36ecdaadcfb1&scope=repo&redirect_uri=http://localhost:8080/auth';
    githubUrl = 'https://github.com/login/oauth/authorize?client_id=48f5b894f42ae1f869d2&scope=repo&redirect_uri=http://acid.zzz.com.ua/auth';

    constructor(private routerService: RouterService,
                private location: Location,
                private titleService: Title,
                public authService: AuthService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
                toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.getParams();
        this.getUrl();
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
                event.forEach(item => {
                    if (item.path === 'drafts') {
                        this.drafts = true;
                    }
                });
            });
    }
    savePath() {
        localStorage.setItem('path', this.location.path());
    }
}
