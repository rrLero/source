import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';

import { Comment }         from '../../shared/comment.model'
import { CommentsService } from '../../services/index';
import { AuthService } from '../../services/index';

@Component({
    selector: 'comments',
    templateUrl: 'comments.component.html',
    styleUrls: ['comments.component.scss']
})
export class CommentsComponent implements OnInit {
    @Input() postId: string;
    comments: Comment[] = [];
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    // access;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private commentsService: CommentsService) { }

    ngOnInit() {
        this.commentsService.get(this.name, this.repo, this.postId)
            .then(data => {
                if (data.length > 0) {
                    this.comments = data;
                }
            });
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
            });
    }

    addCommentHandler(data) {
        this.comments.push(data)
    }

}