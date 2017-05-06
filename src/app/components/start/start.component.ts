import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Location }          from '@angular/common';
import { TranslateService }  from '@ngx-translate/core';

import {
    UserService,
    BlogService,
    ToastService
}                 from '../../services';
import { fadeIn } from '../../animations';
import { auth }   from '../../shared';

const faq = {
    capabilities: false,
    friends: false,
    problems: false,
    github: false,
    comments: false
};

@Component({
    selector: 'start',
    templateUrl: 'start.component.html',
    styleUrls: ['start.component.scss'],
    animations: [fadeIn]
})
export class StartComponent implements OnInit {
    user: any;
    lang: string;
    redirectUri: string;
    githubUrl: string;
    faq: any = faq;

    constructor(private router: Router,
                private location: Location,
                private translate: TranslateService,
                private blogService: BlogService,
                private userService: UserService,
                private toastService: ToastService) {
        translate.onLangChange
            .subscribe(event => this.getAuthUrl());
    }

    ngOnInit(): void {
        this.user = this.userService.getUser();
        this.getAuthUrl();
    }

    createBlog(repo): void {
        let blog = repo.value.replace(/\s+/g, '-');
        this.toastService.showInfo('TOAST.START.activatingBlog');
        this.blogService
            .createBlog(this.user.login, blog)
            .then(() => {
                this.toastService.showSuccess('TOAST.START.done');
                setTimeout(() => this.router.navigate([`${this.user.login}`]), this.toastService.life());
            })
            .catch(error => this.toastService.showError(error));
    }

    getAuthUrl(): void {
        this.lang = localStorage.getItem('LOCALIZE_LOCAL_STORAGE') || 'en';
        this.redirectUri = `${auth.redirectUri}/${this.lang}/auth`;
        this.githubUrl = `https://github.com/login/oauth/authorize?client_id=${auth.clientId}&scope=repo&redirect_uri=${this.redirectUri}`;
    }

    savePath(): void {
        localStorage.setItem('path', this.location.path());
    }
}
