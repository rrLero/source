import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute }   from "@angular/router";

import { Comment }         from '../../shared/comment.model'
import { CommentsService } from "../../services/index";

@Component({
    selector: 'comments',
    templateUrl: 'comments.component.html',
    styleUrls: ['comments.component.scss']
})
export class CommentsComponent implements OnInit {
    @Input() id: string;
    comments: Comment[];
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private commentsService: CommentsService) { }

    ngOnInit() {
        // get comments for API
        console.log(this.id);
        this.commentsService.getComments(this.name, this.repo, this.id)
            .then((data) => {
                if (data instanceof Array) {
                    this.comments = data;
                }
            })
    }

}