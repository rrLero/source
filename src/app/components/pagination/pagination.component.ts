import { Component, OnInit } from '@angular/core';

import { HttpService, PagerService } from '../../services/index';
import { Post } from '../../shared/post.model';

let currentPage: number;
if (localStorage.getItem('page')) {
    currentPage = parseFloat(localStorage.getItem('page'));
}

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    posts: Post[];
    pager: any = {};
    pagedItems: any[];
    constructor(
        private httpService: HttpService,
        private pagerService: PagerService) { }

    ngOnInit() {
        this.getPosts();
    }
    getPosts(): void {
        this.httpService.getPosts()
            .then(posts => {
                this.posts = posts.reverse();
                this.setPage(currentPage);
            });
    }
    setPage(page = 1): void {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.posts.length, page);
        this.pagedItems = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
        localStorage.setItem('page', JSON.stringify(page));
        currentPage = parseFloat(localStorage.getItem('page'));
    }
}
