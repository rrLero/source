import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute }                                 from "@angular/router";

import { AuthService }     from '../../services/index';
import { CommentsService } from '../../services/index';

@Component({
    selector: 'comment-from',
    templateUrl: 'comment-form.component.html',
    styleUrls: ['comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
    @Input() postId: string;
    @Output() addComment = new EventEmitter();
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    loading: boolean = false;
    error: string = '';

    constructor(private route: ActivatedRoute,
                public authService: AuthService,
                private commentsService: CommentsService) { }

    ngOnInit() { }

    submit(input) {
        this.loading = true;
        this.error = '';
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
            });
    }

}