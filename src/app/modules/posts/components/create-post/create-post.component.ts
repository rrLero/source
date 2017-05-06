import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';
import { LocalizeRouterService }  from 'localize-router';

import {
    PostService,
    BlogService,
    DraftService,
    AuthService,
    ToastService,
    UserService
}                                     from '../../../../services';
import { Post, post, FullMd, fullMd } from '../../../../models';
import { fadeIn }                     from '../../../../animations';

@Component({
    templateUrl: 'create-post.component.html',
    styleUrls: ['create-post.component.scss'],
    animations: [fadeIn]
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
                private localize: LocalizeRouterService,
                private authService: AuthService,
                private userService: UserService,
                private postService: PostService,
                private blogService: BlogService,
                private draftService: DraftService,
                public toastService: ToastService) { }

    ngOnInit() {
        let date = `${this.date.toISOString()}`.slice(2).slice(0, 8);
        let time = `${this.date.toString()}`.slice(15).slice(0, 6);
        this.datetime = date + time;
        // if (this.authService.isLogged) {
        const profile = this.userService.getUser();
        this.author = profile.login;
            // this.author = profile.name || profile.login;
        // }
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
        this.toastService.showInfo('TOAST.CREATEPOST.creating');
        this.draftService
            .create(this.name, this.repo, post)
            .then(() =>
                this.draftService
                    .updateBlog(this.name, this.repo)
                    .then(() => {
                        this.toastService.showSuccess('TOAST.CREATEPOST.done');
                        setTimeout(() => {
                            let localUrl = this.localize.translateRoute(this.url);
                            this.router.navigate([localUrl, 'drafts']);
                        }, this.toastService.life());
                    })
                    .catch(error => this.toastService.showError(error))
            .catch(error => this.toastService.showError(error)));
    }

    publish(filenameEl, titleEl, tagsEl, prevEl, textEl) {
        this.create(filenameEl, titleEl, tagsEl, prevEl, textEl);
        this.toastService.showInfo('TOAST.CREATEPOST.creating');
        this.postService
            .create(this.name, this.repo, post)
            .then(() =>
                this.blogService
                    .updateBlog(this.name, this.repo)
                    .then(() => {
                        this.toastService.showSuccess('TOAST.CREATEPOST.done');
                        setTimeout(() => {
                            let localUrl = this.localize.translateRoute(this.url);
                            this.router.navigate([localUrl]);
                        }, this.toastService.life());
                    })
                    .catch(error => this.toastService.showError(error))
            .catch(error => this.toastService.showError(error)));
    }

    goBack() {
        this.location.back();
    }
}
