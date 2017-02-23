import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
        private httpService: HttpService,
        private pagerService: PagerService,
        private router: Router) { }

    ngOnInit() {
        this.getPosts();
        this.listenEvents();
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
        if (localStorage.getItem('page')) {
            this.currentPage = parseFloat(localStorage.getItem('page'));
        }
        if (window.location.pathname.indexOf('page')) {
            let userPage = parseFloat(window.location.pathname.slice(6));
            this.pager = this.pagerService.getPager(this.posts.length, userPage);
            if (userPage < 1 || userPage > this.pager.totalPages) {
                this.router.navigate(['not-found']);
            }
            this.currentPage = userPage;
        }
    }
    setPage(page = 1): void {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.posts.length, page);
        this.pagedItems = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
        localStorage.setItem('page', JSON.stringify(page));
    }
    listenEvents() {
        window.addEventListener('popstate', () => {
            this.loadPage();
            this.setPage(this.currentPage);
        });
    }
}
