import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { HttpService }       from '../../services/index';
import { Post }              from '../../shared/post.model';

@Component({
    selector: 'post-edit',
    templateUrl: 'post-edit.component.html'
})
export class PostEditComponent implements OnInit {
    post: Post;

    constructor(private httpService: HttpService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params
            .switchMap(({ name, repo, title }) => this.httpService.getPost(name, repo, title))
            .subscribe(post => {
                this.post = post;
            });
    }

}