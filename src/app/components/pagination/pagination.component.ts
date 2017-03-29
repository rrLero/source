import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit
}                         from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }       from '@angular/common';

import { PagerService }   from '../../services/index';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() url: string;
    @Input() total: number;
    @Input() perPage: number;
    @Input() currentPage: number;
    @Output() pageChange = new EventEmitter();
    pager: any;
    constructor(private route: ActivatedRoute,
                private location: Location,
                private pagerService: PagerService) {
                location.subscribe(() => this.onPageChange());
    }

    ngOnInit(): void {
        this.getPager(this.currentPage);
    }
    onPageChange(page?: number): void {
        if (!page) {
            this.route.params.forEach(param => page = +param.id || 1);
        }
        setTimeout(() => this.setPage(page), 0);
    }
    getPager(page: number): void {
        this.pager = this.pagerService.getPager(this.total, page, this.perPage);
    }
    setPage(page: number): void {
        this.getPager(page);
        this.pageChange.emit(page);
    }
}
