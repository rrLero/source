import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { Location }                                   from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateService }                           from '@ngx-translate/core';
import { LocalizeRouterService }                      from 'localize-router';

import {
    HttpService,
    DraftService,
    AuthService,
    ToastService,
    UserService
}                                     from '../../services';
import { Post, post, FullMd, fullMd } from '../../shared/post.model';

@Component({
    templateUrl: 'create-post.component.html',
    styleUrls: ['create-post.component.scss'],
    animations: [
        trigger('create', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(300, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class CreatePostComponent implements OnInit {
    date = new Date();
    author: string;
    datetime: string;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}`;

    constructor(private router: Router,
                private location: Location,
                private route: ActivatedRoute,
                private translate: TranslateService,
                private localize: LocalizeRouterService,
                private authService: AuthService,
                private userService: UserService,
                private httpService: HttpService,
                private draftService: DraftService,
                public toastService: ToastService) { }

    ngOnInit() {
        let date = `${this.date.toISOString()}`.slice(2).slice(0, 8);
        let time = `${this.date.toString()}`.slice(15).slice(0, 6);
        this.datetime = date + time;
        if (this.authService.isLogged) {
            const profile = this.userService.getUser();
            this.author = profile.login;
            // this.author = profile.name || profile.login;
        }
    }

    repalceSpace(filenameEl) {
        if (filenameEl.value) {
            filenameEl.value = filenameEl.value.replace(/\s+/g, '-');
        }
    }

    create(filenameEl, titleEl, tagsEl, prevEl, textEl) {
        new FullMd(
            titleEl.value,
            tagsEl.value,
            this.author,
            this.datetime,
            prevEl.value,
            textEl.value
        );
        new Post(
            filenameEl.value,
            fullMd.trim()
        );
    }

    save(filenameEl, titleEl, tagsEl, prevEl, textEl) {
        this.create(filenameEl, titleEl, tagsEl, prevEl, textEl);
        this.translate
            .get('TOAST.CREATEPOST.creating')
            .subscribe((res: string) =>
                this.toastService.showInfo(res));
        this.draftService
            .create(this.name, this.repo, post)
            .then(() =>
                this.draftService
                    .updateBlog(this.name, this.repo)
                    .subscribe(
                        () => {
                            this.translate
                                .get('TOAST.CREATEPOST.done')
                                .subscribe((res: string) =>
                                    this.toastService.showSuccess(res));
                            setTimeout(() => {
                                let localUrl = this.localize.translateRoute(this.url);
                                this.router.navigate([localUrl, 'drafts']);
                            }, this.toastService.life());
                        },
                        error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }

    publish(filenameEl, titleEl, tagsEl, prevEl, textEl) {
        this.create(filenameEl, titleEl, tagsEl, prevEl, textEl);
        this.translate
            .get('TOAST.CREATEPOST.creating')
            .subscribe((res: string) =>
                this.toastService.showInfo(res));
        this.httpService
            .create(this.name, this.repo, post)
            .then(() =>
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .subscribe(
                        () => {
                            this.translate
                                .get('TOAST.CREATEPOST.done')
                                .subscribe((res: string) =>
                                    this.toastService.showSuccess(res));
                            setTimeout(() => {
                                let localUrl = this.localize.translateRoute(this.url);
                                this.router.navigate([localUrl]);
                            }, this.toastService.life());
                        },
                        error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }

    goBack() {
        this.location.back();
    }
}
