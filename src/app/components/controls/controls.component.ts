import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute }                         from '@angular/router';
import { trigger, state, style, transition, animate }     from '@angular/animations';

import {
    HttpService,
    DraftService,
    CommentsService,
    UserService,
    ToastService
}                               from '../../services';
import { Post, FullMd, fullMd } from '../../shared/post.model';

@Component({
    selector: 'controls',
    templateUrl: 'controls.component.html',
    styleUrls: ['controls.component.scss'],
    animations: [
        trigger('controls', [
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
export class ControlsComponent implements OnInit {
    @Input() post: Post;
    @Input() draft: boolean;
    @Input() drafts: boolean;
    @Input() status: boolean;
    @Output() comments = new EventEmitter();
    user: any;
    savedSession: string;
    hidden = true;
    confirm = true;
    popupText = 'Remove post?';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    url = `/${this.name}/${this.repo}`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private commentsService: CommentsService,
                private userService: UserService,
                private draftService: DraftService,
                private httpService: HttpService,
                public toastService: ToastService) { }

    ngOnInit(): void {
        this.user = this.userService.getUser();
    }

    unLockComments(): void {
        this.toastService.showInfo('Enabling...');
        this.commentsService
            .unLockComments(this.name, this.repo, this.post.id)
            .then(() => this.updateComments(true))
            .catch(error => this.toastService.showError(error));

    }

    lockComments(): void {
        this.toastService.showInfo('Disabling...');
        this.commentsService
            .lockComments(this.name, this.repo, this.post.id)
            .then(() => this.updateComments(false))
            .catch(error => this.toastService.showError(error));
    }

    updateComments(status: boolean): void {
        this.httpService
            .updateBlog(this.name, this.repo)
            .subscribe(
                () => {
                    this.toastService.showSuccess('Done!');
                    setTimeout(() => this.comments.emit(status), this.toastService.life());
                },
                error => this.toastService.showError(error));
    }

    delete(): void {
        this.toastService.showInfo('Deleting...');
        this.httpService
            .delete(this.name, this.repo, this.post.id, this.post.sha)
            .then(() =>
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .subscribe(() =>
                        this.callback(),
                        error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }

    deleteDraft(): void {
        this.toastService.showInfo('Deleting...');
        this.draftService
            .delete(this.name, this.repo, this.post.id)
            .then(() =>
                this.draftService
                    .updateBlog(this.name, this.repo)
                    .subscribe(() =>
                        this.callback(),
                        error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }

    publish(): void {
        this.toastService.showInfo('Publishing...');
        this.draftService
            .publish(this.name, this.repo, this.title)
            .then(() => this.callback())
            .catch(error => this.toastService.showError(error));
    }

    callback(path = ''): void {
        this.toastService.showSuccess('Done!');
        setTimeout(() => this.router.navigate([`/${this.name}/${this.repo}/${path}`]), this.toastService.life());
    }

    getPostStatus(): void {
        this.toastService.showInfo('Check status...');
        if (this.draft) {
            this.draftService
                .getDraft(this.name, this.repo, this.title)
                .then(post => this.checkStatus(post))
                .catch(error => this.toastService.showError(error));
        } else {
            this.httpService
                .getPost(this.name, this.repo, this.title)
                .then(post => this.checkStatus(post))
                .catch(error => this.toastService.showError(error));
        }
    }

    checkStatus(post: Post): void {
        let lastInx = post.tags.length - 1;
        let lockInfo = post.tags[lastInx].split(':');
        let onEdit = lockInfo[0] === '-----post-locked-by';
        let author = lockInfo[1];
        let canEdit = this.user.login === author;

        if (onEdit && !canEdit) {
            this.toastService.showWarning('Post locked!');
        } else if (onEdit && canEdit) {
            this.loadSession();
        } else {
            this.toastService.showInfo('Session opening...');
            this.lock(post);
        }
    }

    loadSession(): void {
        let url: string;
        if (this.draft) {
            url = `${this.url}/drafts/post/${this.title}/edit`;
        } else {
            url = `${this.url}/post/${this.title}/edit`;
        }
        this.toastService.showSuccess('Session loaded!');
        setTimeout(() => this.router.navigate([url]), this.toastService.life());
    }

    lock(post: Post): void {
        post.tags.push(`-----post-locked-by:${this.user.login}`);
        this.buildFullMd(post);
        this.draft ? this.lockDraft(post) : this.lockPost(post);
    }

    lockPost(post: Post): void {
        this.httpService
            .update(this.name, this.repo, post.id, post.sha, post)
            .then(() => {
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .subscribe(
                        () => {
                            this.toastService.showSuccess('Session opened!');
                            setTimeout(() =>
                                this.router.navigate([this.url, 'post', this.title, 'edit']),
                                this.toastService.life());
                        },
                        error => this.toastService.showError(error));
            })
            .catch(error => this.toastService.showError(error));
    }

    lockDraft(post: Post): void {
        this.draftService
            .update(this.name, this.repo, post.id, post)
            .then(() => {
                this.draftService
                    .updateBlog(this.name, this.repo)
                    .subscribe(
                        () => {
                            this.toastService.showSuccess('Session opened!');
                            setTimeout(() =>
                                this.router.navigate([this.url, 'drafts', 'post', this.title, 'edit']),
                                this.toastService.life());
                        },
                        error => this.toastService.showError(error));
            })
            .catch(error => this.toastService.showError(error));
    }

    buildFullMd(post: Post): void {
        new FullMd(
            post.title,
            post.tags.join(', '),
            post.author,
            post.date,
            post.preview,
            post.text_full_strings
        );
        post.text_full_md = fullMd.trim();
    }

    popupHandler(confirm: boolean): void {
        if (confirm) {
            this.hidden = true;
            this.draft ? this.deleteDraft() : this.delete();
        } else {
            this.hidden = true;
        }
    }
}
