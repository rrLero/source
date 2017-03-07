import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { HttpService }            from '../../services/index';
import { Post }                   from '../../shared/post.model';

@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
    post: Post;
    hidden = true;
    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit(): void {
        this.route.params
        .switchMap(({ name, repo, title }) => this.httpService.getPost(name, repo, title))
            .subscribe(post => {
                this.post = post;
            });
    }
    goBack(): void {
        this.location.back();
    }
}
