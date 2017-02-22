import {
    Component,
    OnInit
}                 from '@angular/core';
// import { Router } from '@angular/router';

import { HttpService, PagerService } from '../../services/index';
import { Post }        from '../../shared/post.model';


@Component({
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss']
})
export class PostsComponent implements OnInit {
    posts: Post[];
    pager: any = {};
    pagedItems: any[];

    constructor(
        private httpService: HttpService,
        private pagerService: PagerService
    ) { };
    ngOnInit() {
        this.getPosts();
    }
    getPosts(): void {
        this.httpService.getPosts()
            .then(posts => {
                this.posts = posts.reverse();
                this.setPage(1);
            });
    }

    setPage(page: number) {
        if (!this.posts || page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.posts.length, page);
        this.pagedItems = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
