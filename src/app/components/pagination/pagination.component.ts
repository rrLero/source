import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit
}                                 from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { HttpService, PagerService } from '../../services/index';
import { Post }                      from '../../shared/post.model';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() total: number;
    @Input() perPage: number;
    @Input() currentPage: number;
    @Output() pageChange = new EventEmitter();
    pager: any;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}/page/`;
    constructor(private route: ActivatedRoute,
                private location: Location,
                private pagerService: PagerService) {
                location.subscribe(() => this.onPageChange());
    }

    ngOnInit() {
        this.getPager(this.currentPage);
    }

    onPageChange(page?: number) {
        if (!page) {
            let path = this.location.path().split('/');
            page = +path[4] || 1;
        }
        this.getPager(page);
        this.pageChange.emit(page);
    }

    getPager(page) {
        this.pager = this.pagerService.getPager(this.total, page, this.perPage);
    }

    // getPosts(): void {
    //     this.httpService.getPosts(this.name, this.repo)
    //         .then(posts => {
    //             if (posts instanceof Array) {
    //                 this.posts = posts;
    //                 this.setPage();
    //             } else {
    //                 this.empty = true;
    //             }
    //         });
    // }
    // setPage(page?): void {
    //     if (!page) {
    //         let path = this.location.path().split('/');
    //         page = parseFloat(path[4]) || 1;
    //     }
    //     if (this.posts) {
    //         this.pager = this.pagerService.getPager(this.posts.length, page);
    //         if (page < 1 || page > this.pager.totalPages) {
    //             // this.router.navigate(['not-found']);
    //         }
    //         this.pagedItems = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //         window.scrollTo(0, 0);
    //     }
    // }
}
