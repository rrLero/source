import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute }                                 from '@angular/router';
import { trigger, state, style, transition, animate }     from '@angular/animations';

import { AuthService, ToastService }     from '../../services/index';
import { CommentsService } from '../../services/index';

@Component({
    selector: 'comment-from',
    templateUrl: 'comment-form.component.html',
    styleUrls: ['comment-form.component.scss'],
    animations: [
        trigger('form', [
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
export class CommentFormComponent implements OnInit {
    @Input() postId: string;
    @Input() onEdit: string;
    @Input() commentId: number;
    @Output() addComment = new EventEmitter();
    @Output() updatedComment = new EventEmitter();
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    loading: boolean = false;
    error: string = '';

    constructor(private route: ActivatedRoute,
                public authService: AuthService,
                public toastService: ToastService,
                private commentsService: CommentsService) { }

    ngOnInit() { }

    submit(input) {
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
                    if (Object.keys(data).length === 0) {
                        this.loading = false;
                        this.error = 'This repository does not allow you to add comments!';
                        return;
                    }
                    this.addComment.emit(data[0]);
                    input.editor.value('');
                    this.loading = false;
                })
                .catch(error => this.toastService.showError(error));
        }
    }
}
