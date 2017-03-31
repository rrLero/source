import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute }                         from '@angular/router';
import { trigger, state, style, transition, animate }     from '@angular/animations';

import {
    HttpService,
    DraftService,
    CommentsService,
    ToastService
}               from '../../services/index';
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
    @Input() status: boolean;
    @Input() draft: boolean;
    @Output() comments = new EventEmitter();
    user: any;
    hidden = true;
    confirm = true;
    popupText = 'Remove post?';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    create = `/${this.name}/${this.repo}/create`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                public toastService: ToastService,
                private commentsService: CommentsService,
                private draftService: DraftService,
                private httpService: HttpService) {
    }

    ngOnInit() { }

    unLockComments() {
        this.toastService.showInfo('Enabling...');
        this.commentsService
            .unLockComments(this.name, this.repo, this.post.id)
            .then(() =>
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .subscribe(
                        () => {
                            this.toastService.showSuccess('Done!');
                            setTimeout(() => this.comments.emit(true), 1800);
                        },
                        error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));

    }
    lockComments() {
        this.toastService.showInfo('Disabling...');
        this.commentsService
            .lockComments(this.name, this.repo, this.post.id)
            .then(() =>
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .subscribe(
                        () => {
                            this.toastService.showSuccess('Done!');
                            setTimeout(() => this.comments.emit(false), 1800);
                        },
                        error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }
    delete() {
        this.toastService.showInfo('Deleting...');
        this.httpService
            .delete(this.name, this.repo, this.post.id, this.post.sha)
            .then(() =>
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .subscribe(
                        () => {
                            this.toastService.showSuccess('Done!');
                            setTimeout(() => this.router.navigate([`/${this.name}/${this.repo}`]), 1800);
                        },
                        error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }
    deleteDraft() {
        this.toastService.showInfo('Deleting...');
        this.draftService
            .delete(this.name, this.repo, this.post.id)
            .then(() => {
                this.toastService.showSuccess('Done!');
                setTimeout(() => this.router.navigate([`/${this.name}/${this.repo}/drafts`]), 1800);
            })
            .catch(error => this.toastService.showError(error));
    }
    publish() {
        this.toastService.showInfo('Publishing...');
        this.draftService
            .publish(this.name, this.repo, this.title)
            .then(() => {
                this.toastService.showSuccess('Done!');
                setTimeout(() => this.router.navigate([`/${this.name}/${this.repo}`]), 3000);
            })
        .catch(error => this.toastService.showError(error));
    }
    popupHandler(confirm) {
        if (confirm) {
            this.hidden = true;
            this.draft ? this.deleteDraft() : this.delete();
        } else {
            this.hidden = true;
        }
    }
}
