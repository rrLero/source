import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute }                         from '@angular/router';
import { trigger, state, style, transition, animate }     from '@angular/animations';
import { LocalizeRouterService }                          from 'localize-router';

import {
    HttpService,
    DraftService,
    CommentsService,
    UserService,
    ToastService
}                               from '../../services';
import { Post, FullMd, fullMd } from '../../shared/post.model';
import { User }                 from '../../shared/user.model';

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
    user: User;
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
                private localize: LocalizeRouterService,
                private userService: UserService,
                private draftService: DraftService,
                private httpService: HttpService,
                public toastService: ToastService) { }

    ngOnInit(): void {
        this.user = this.userService.getUser();
    }

    unLockComments(): void {
        this.toastService.showInfo('TOAST.CONTROLS.enabling');
        this.commentsService
            .unLockComments(this.name, this.repo, this.post.id)
            .then(() => this.updateComments(true))
            .catch(error => this.toastService.showError(error));

    }

    lockComments(): void {
        this.toastService.showInfo('TOAST.CONTROLS.disabling');
        this.commentsService
            .lockComments(this.name, this.repo, this.post.id)
            .then(() => this.updateComments(false))
            .catch(error => this.toastService.showError(error));
    }

    publish(): void {
        this.toastService.showInfo('TOAST.CONTROLS.publishing');
        this.draftService
            .publish(this.name, this.repo, this.title)
            .then(() =>
                this.draftService
                    .updateBlog(this.name, this.repo)
                    .then(() =>
                        this.httpService
                            .updateBlog(this.name, this.repo)
                            .then(() => this.callback())
                            .catch(error => this.toastService.showError(error))
                    .catch(error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error)));
    }

    getPostStatus(): void {
        this.toastService.showInfo('TOAST.CONTROLS.checkStatus');
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

    popupHandler(confirm: boolean): void {
        if (confirm) {
            this.hidden = true;
            this.draft ? this.deleteDraft() : this.deletePost();
        } else {
            this.hidden = true;
        }
    }

    private deletePost(): void {
        this.toastService.showInfo('TOAST.CONTROLS.deleting');
        this.httpService
            .delete(this.name, this.repo, this.post.id, this.post.sha)
            .then(() =>
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .then(() => this.callback())
                    .catch(error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }

    private deleteDraft(): void {
        this.toastService.showInfo('TOAST.CONTROLS.deleting');
        this.draftService
            .delete(this.name, this.repo, this.post.id)
            .then(() =>
                this.draftService
                    .updateBlog(this.name, this.repo)
                    .then(() => this.callback('drafts'))
                    .catch(error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }

    private checkStatus(post: Post): void {
        let lastInx = post.tags.length - 1;
        let lockInfo = post.tags[lastInx].split(':');
        let onEdit = lockInfo[0] === '-----post-locked-by';
        let author = lockInfo[1];
        let canEdit = this.user.login === author;

        if (onEdit && !canEdit) {
            this.toastService.showWarning('TOAST.CONTROLS.postLocked');
        } else if (onEdit && canEdit) {
            this.loadSession();
        } else {
            this.toastService.showInfo('TOAST.CONTROLS.sessionOpening');
            this.lock(post);
        }
    }

    private updateComments(status: boolean): void {
        this.httpService
            .updateBlog(this.name, this.repo)
            .then(() => {
                this.toastService.showSuccess('TOAST.CONTROLS.done');
                setTimeout(() => this.comments.emit(status), this.toastService.life());
            })
            .catch(error => this.toastService.showError(error));
    }

    private lock(post: Post): void {
        post.tags.push(`-----post-locked-by:${this.user.login}`);
        this.buildFullMd(post);
        this.draft ? this.lockDraft(post) : this.lockPost(post);
    }

    private lockPost(post: Post): void {
        this.httpService
            .update(this.name, this.repo, post.id, post.sha, post)
            .then(() => {
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .then(() => {
                        this.toastService.showSuccess('TOAST.CONTROLS.sessionOpened');
                        setTimeout(() => {
                            let localUrl = this.localize.translateRoute(this.url)
                            this.router.navigate([localUrl, 'post', this.title, 'edit']);
                        }, this.toastService.life());
                    })
                    .catch(error => this.toastService.showError(error));
            })
            .catch(error => this.toastService.showError(error));
    }

    private lockDraft(post: Post): void {
        this.draftService
            .update(this.name, this.repo, post.id, post)
            .then(() => {
                this.draftService
                    .updateBlog(this.name, this.repo)
                    .then(() => {
                        this.toastService.showSuccess('TOAST.CONTROLS.sessionOpened');
                        setTimeout(() => {
                            let localUrl = this.localize.translateRoute(this.url);
                            this.router.navigate([localUrl, 'drafts', 'post', this.title, 'edit']);
                        }, this.toastService.life());
                    })
                    .catch(error => this.toastService.showError(error));
            })
            .catch(error => this.toastService.showError(error));
    }

    private buildFullMd(post: Post): void {
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

    private loadSession(): void {
        let url: string | any[];
        if (this.draft) {
            url = this.localize.translateRoute(`${this.url}/drafts/post/${this.title}/edit`);
        } else {
            url = this.localize.translateRoute(`${this.url}/post/${this.title}/edit`);
        }
        this.toastService.showSuccess('TOAST.CONTROLS.sessionLoaded');
        setTimeout(() => this.router.navigate([url]), this.toastService.life());
    }

    private callback(path = ''): void {
        this.toastService.showSuccess('TOAST.CONTROLS.done');
        setTimeout(() => {
            let localUrl = this.localize.translateRoute(`/${this.name}/${this.repo}/${path}`)
            this.router.navigate([localUrl])
        }, this.toastService.life());
    }

}
