import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    PostService,
    UserService,
    ToastService
}               from '../../../../services';
import { Post } from '../../../../models';

@Component({
    templateUrl: 'posts-by-author.component.html',
    styleUrls: ['posts-by-author.component.scss']
})
export class PostsByAuthorComponent implements OnInit {
    posts: Post[];
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private postService: PostService,
                private userService: UserService,
                private toastService: ToastService) { };

    ngOnInit(): void { }

    handleSearch(posts: Post[]): void {
        this.posts = null;
        setTimeout(() => this.posts = posts, 200);
    }
}
