import { Component, OnInit }                          from '@angular/core';
import { Router }                                     from '@angular/router';
import { Location }                                   from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateService }                           from '@ngx-translate/core';

import { UserService, HttpService, ToastService }     from '../../services';
import { auth }                                       from '../../shared/auth';

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
    animations: [
        trigger('start', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(100, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class StartComponent implements OnInit {
    user: any;
    lang: string;
    redirectUri: string;
    githubUrl: string;
    faq: any = faq;

    constructor(private router: Router,
                private location: Location,
                private httpService: HttpService,
                private userService: UserService,
                private translate: TranslateService,
                public toastService: ToastService) {
        translate.onLangChange
            .subscribe(event => this.getAuthUrl());
    }

    ngOnInit(): void {
        this.user = this.userService.getUser();
        this.getAuthUrl();
    }

    createBlog(repo): void {
        let blog = repo.value.replace(/\s+/g, '-');
        this.translate
            .get('TOAST.START.activatingBlog')
            .subscribe((res: string) =>
                this.toastService.showWarning(res));
        this.httpService
            .createBlog(this.user.login, blog)
            .then(() => {
                this.translate
                    .get('TOAST.START.done')
                    .subscribe((res: string) =>
                        this.toastService.showWarning(res));
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
