import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { HttpService } from '../../services/index';
import { Post }        from '../../shared/post.model';

@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
    post: Post;
    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.httpService.getPost(+params['id']))
            .subscribe(post => {
                this.post = post;
            });
    }
    goBack(): void {
        this.location.back();
    }
}
