import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute }                         from '@angular/router';
import { trigger, state, style, transition, animate }     from '@angular/animations';

import {
    HttpService,
    DraftService,
    CommentsService,
    ToastService
}               from '../../services';
import { Post } from '../../shared/post.model';

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
                private draftService: DraftService,
                private httpService: HttpService,
                public toastService: ToastService) { }

    ngOnInit(): void { }

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
            .then(() => this.callback('drafts'))
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
    popupHandler(confirm: boolean): void {
        if (confirm) {
            this.hidden = true;
            this.draft ? this.deleteDraft() : this.delete();
        } else {
            this.hidden = true;
        }
    }
}
