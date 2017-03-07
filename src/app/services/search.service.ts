import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location }   from '@angular/common';
import { Http }       from '@angular/http';

import { Post }       from '../shared/post.model';

@Injectable()
export class SearchService {
    private host = 'http://gitblog.pythonanywhere.com';
    private path: string[];
    private url: string;
    constructor(
        private location: Location,
        private http: Http) { }

    getUrl() {
        this.path = this.location.path().split('/');
        this.url = `${this.host}/${this.path[1]}/${this.path[2]}/api/get?title=`;
    }
    search(term: string): Observable<Post[]> {
        this.getUrl();
        return this.http
            .get(`${this.url}${term}`)
            .map(response => response.json() as Post[]);
    }
}
