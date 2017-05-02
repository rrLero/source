import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { Location }                                   from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LocalizeRouterService }                      from 'localize-router';

import {
    HttpService,
    DraftService,
    UserService,
    ToastService
}                                     from '../../../../services';
import { Post, post, FullMd, fullMd } from '../../../../shared/post.model';

@Component({
    templateUrl: 'edit-post.component.html',
    styleUrls: ['edit-post.component.scss'],
    animations: [
        trigger('edit', [
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
export class EditPostComponent implements OnInit {
    post: Post;
    user: any;
    confirm: boolean;
    sessionId: string;
    onEdit: boolean;
    canEdit = false;
    draft = false;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    url = `/${this.name}/${this.repo}/post/${this.title}`;

    constructor(private router: Router,
                private location: Location,
                private route: ActivatedRoute,
                private localize: LocalizeRouterService,
                private userService: UserService,
                private draftService: DraftService,
                private httpService: HttpService,
                public toastService: ToastService) { }

    ngOnInit(): void {
        this.checkPath();
        this.user = this.userService.getUser();
        this.draft ? this.getDraft() : this.getPost();
    }

    checkPath(): void {
        let path = this.location.path().split('/');
        path.forEach(item => {
            if (item === 'drafts') {
                this.draft = true;
            }
        });
    }

    isOnEdit(): void {
        if (this.user) {
            let lastInx = this.post.tags.length - 1;
            let lockInfo = this.post.tags[lastInx].split(':');
            let author = lockInfo[1];
            this.canEdit = author === this.user.login;
        }
        if (!this.canEdit) {
            this.onEdit = true;
            this.toastService.showWarning('TOAST.EDITPOST.postLocked');
        } else {
            this.post.tags.pop();
        }
    }

    getPost(): void {
        this.route.params
            .switchMap(({ name, repo, title }) =>
                this.httpService
                    .getPost(name, repo, title))
                    .subscribe(
                        post => {
                            this.post = post;
                            this.isOnEdit();
                        },
                        error => this.toastService.showError(error));
    }

    getDraft(): void {
        this.route.params
            .switchMap(({ name, repo, title }) =>
                this.draftService
                    .getDraft(name, repo, title))
                    .subscribe(
                        post => {
                            this.post = post;
                            this.isOnEdit();
                        },
                        error => this.toastService.showError(error));
    }

    save(titleEl, tagsEl, previewEl, textEl): void {
        this.post.title = titleEl.value;
        this.post.tags = tagsEl.value.split(',');
        this.post.preview = previewEl.value;
        this.post.text_full_strings = textEl.value;
        this.toastService.showInfo('TOAST.EDITPOST.inProcess');
        this.buildFullMd();
        this.draft ? this.updateDraft() : this.update();
    }

    buildFullMd(): void {
        this.addAuthors();
        new FullMd(
            this.post.title,
            this.post.tags.join(', '),
            this.post.author,
            this.post.date,
            this.post.preview,
            this.post.text_full_strings
        );
        this.post.text_full_md = fullMd.trim();
    }

    update(): void {
        this.httpService
            .update(this.name, this.repo, this.post.id, this.post.sha, this.post)
            .then(() =>
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .then(() => {
                        this.toastService.showSuccess('TOAST.EDITPOST.done');
                        setTimeout(() => this.goBack(), this.toastService.life());
                    })
                    .catch(error => this.toastService.showError(error))
            .catch(error => this.toastService.showError(error)));
    }

    updateDraft(): void {
        this.draftService
            .update(this.name, this.repo, this.post.id, this.post)
            .then(() =>
                this.draftService
                    .updateBlog(this.name, this.repo)
                    .then(() => {
                        this.toastService.showSuccess('TOAST.EDITPOST.done');
                        setTimeout(() => this.goBack(), this.toastService.life());
                    })
                    .catch(error => this.toastService.showError(error))
            .catch(error => this.toastService.showError(error)));
    }

    addAuthors(): void {
        let coAuthor: boolean;
        this.post.author
            .split(',')
            .forEach(item => {
                if (this.user.login.toLowerCase() === item.trim().toLowerCase()) {
                    coAuthor = true;
                }
            });
        if (!coAuthor) {
            this.post.author = `${this.post.author}, ${this.user.login}`;
        }
    }

    create(titleEl, tagsEl, prevEl, textEl): void {
        this.addAuthors();
        new FullMd(
            titleEl.value,
            tagsEl.value,
            this.post.author,
            this.post.date,
            prevEl.value,
            textEl.value
        );
        new Post(
            this.post.id.slice(20),
            fullMd.trim()
        );
    }

    moveToDrafts(titleEl, tagsEl, prevEl, textEl): void {
        this.create(titleEl, tagsEl, prevEl, textEl);
        this.toastService.showInfo('TOAST.EDITPOST.moving');
        this.draftService
            .create(this.name, this.repo, post)
            .then(() => {
                this.httpService
                    .delete(this.name, this.repo, this.post.id, this.post.sha)
                    .then(() =>
                        this.httpService
                            .updateBlog(this.name, this.repo)
                            .then(() => {
                                this.draftService
                                    .updateBlog(this.name, this.repo)
                                    .then(() => {
                                        this.toastService.showSuccess('TOAST.EDITPOST.done');
                                        setTimeout(() => {
                                            let localUrl = this.localize.translateRoute(`/${this.name}`);
                                            this.router.navigate([localUrl, this.repo, 'drafts']);
                                        }, this.toastService.life());
                                    })
                                    .catch(error => this.toastService.showError(error))
                            })
                            .catch(error => this.toastService.showError(error)))
                    .catch(error => this.toastService.showError(error));
            })
            .catch(error => this.toastService.showError(error));
    }

    cancel(titleEl, tagsEl, textEl, previewEl): void {
        titleEl.value = this.post.title;
        tagsEl.value = this.post.tags;
        previewEl.setValue(this.post.preview);
        textEl.setValue(this.post.text_full_strings.trim());
    }

    goBack(): void {
        this.location.back();
    }
}
