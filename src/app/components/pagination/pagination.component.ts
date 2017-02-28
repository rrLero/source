import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';

import { HttpService, PagerService } from '../../services/index';
import { Post }                      from '../../shared/post.model';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    posts: Post[];
    pager: any = {};
    pagedItems: any[];
    currentPage: number;
    constructor(
        private location: Location,
        private httpService: HttpService,
        private pagerService: PagerService) {
        location.subscribe(() => this.loadPage());
    }
    ngOnInit() {
        this.getPosts();
    }
    getPosts(): void {
        this.httpService.getPosts()
            .then(posts => {
                this.posts = posts.reverse();
                this.loadPage();
                this.setPage(this.currentPage);
            });
    }
    loadPage(): void {
        let path = this.location.path();
        if (path.indexOf('page')) {
            this.currentPage = parseFloat(path.slice(6));
            this.setPage(this.currentPage);
        }
    }
    setPage(page = 1): void {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.posts.length, page);
        this.pagedItems = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
