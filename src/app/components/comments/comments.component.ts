import { Component, OnInit, Input, Output, EventEmitter }                   from '@angular/core';
import { ActivatedRoute }                             from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { AuthService, UserService, CommentsService, ToastService }  from '../../services/index';
import { Comment }                                    from '../../shared/comment.model';

@Component({
    selector: 'comments',
    templateUrl: 'comments.component.html',
    styleUrls: ['comments.component.scss'],
    animations: [
        trigger('comment', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(300)
            ]),
            transition('* => void', [
                animate(300, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class CommentsComponent implements OnInit {
    @Input() postId: string;
    @Output() commentsAmount = new EventEmitter();
    onEdit = false;
    commentId: number;
    comments: Comment[] = [];
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = 'https://github.com/';
    user: any;
    // access;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private userService: UserService,
                public toastService: ToastService,
                private commentsService: CommentsService) { }

    ngOnInit() {
        this.commentsService.get(this.name, this.repo, this.postId)
            .then(data => {
                if (data.length > 0) {
                    this.comments = data;
                }
            })
            .catch(error => this.toastService.showError(error));
        this.user = this.userService.getUser();
        // if (this.authService.isLogged) {
        //     this.authService.getProfile().subscribe(() => {
        //         const login = this.authService.loggedUser.login;
        //         this.authService
        //             .getPermission(this.name, this.repo, login)
        //             .then(({ access }) => this.access = access);
        //     });
        // }
    }

    remove(comment) {
        const id = comment.id;
        this.commentsService.remove(this.name, this.repo, id)
            .then(() => {
                const index = this.comments.indexOf(comment);
                this.comments.splice(index, 1);
                this.commentsAmount.emit(this.comments.length);
            })
            .catch(error => this.toastService.showError(error));
    }
    edit(comment) {
        this.commentId = comment.id;
        this.onEdit = !this.onEdit;
    }
    addCommentHandler(data) {
        this.comments.push(data);
        this.commentsAmount.emit(this.comments.length);
    }
    editCommentHandler(data, comment) {
        this.onEdit = !this.onEdit;
        comment.body = data;
    }
}
