import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute }                                 from '@angular/router';

import { AuthService, ToastService, CommentsService }     from '../../../../services';
import { fadeIn }                                         from '../../../../animations';

@Component({
    selector: 'comment-from',
    templateUrl: 'comment-form.component.html',
    styleUrls: ['comment-form.component.scss'],
    animations: [fadeIn]
})
export class CommentFormComponent implements OnInit {
    @Input() postId: string;
    @Input() onEdit: string;
    @Input() commentId: number;
    @Output() addComment = new EventEmitter();
    @Output() updatedComment = new EventEmitter();
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    loading = false;
    error = '';

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private toastService: ToastService,
                private commentsService: CommentsService) { }

    ngOnInit(): void { }

    submit(input): void {
        this.loading = true;
        this.error = '';
        if (this.onEdit) {
            this.commentsService
                .edit(this.name, this.repo, this.commentId, input.value)
                .then(() => {
                    this.updatedComment.emit(input.value);
                    this.loading = false;
                })
                .catch(error => this.toastService.showError(error));
        } else {
            this.commentsService.add(this.name, this.repo, this.postId, input.value)
                .then((data) => {
                    // if (Object.keys(data).length === 0) {
                    //     this.loading = false;
                    //     this.error = 'This repository does not allow you to add comments!';
                    //     return;
                    // }
                    // this.addComment.emit(data[0]);
                    // input.editor.value('');
                    // this.loading = false;
                    if (data === 200) {
                        input.editor.value('');
                        this.loading = false;
                        this.toastService.showSuccess('TOAST.COMMENTSFORM.wasAdded');
                    }
                })
                .catch(error => this.toastService.showError(error));
        }
    }

    get isLogged(): boolean {
        return this.authService.isLogged;
    }
}
