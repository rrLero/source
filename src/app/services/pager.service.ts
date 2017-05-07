import { Injectable } from '@angular/core';
import * as _         from 'underscore';
import { Pager }      from 'models';

@Injectable()
export class PagerService {
    getPager(totalItems: number, currentPage: number, pageSize: number): Pager {
        let totalPages = Math.ceil(totalItems / pageSize);
        let startPage: number, endPage: number;

        if (totalPages <= 7) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 4) {
                startPage = 1;
                endPage = 7;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 6;
                endPage = totalPages;
            } else {
                startPage = currentPage - 3;
                endPage = currentPage + 3;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let pages = _.range(startPage, endPage + 1);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
