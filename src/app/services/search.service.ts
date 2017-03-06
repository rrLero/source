import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http }       from '@angular/http';
import { Location }      from '@angular/common';

import { Post } from '../shared/post.model';

@Injectable()
export class SearchService {
    private path;
    private url;
    constructor(
        private location: Location,
        private http: Http) { }
    search(term: string): Observable<Post[]> {
        this.path = this.location.path().split('/');
        this.url = `http://localhost:5000/${this.path[1]}/${this.path[2]}/api/get?title=`;
        return this.http
            .get(`${this.url}${term}`)
            .map(response => response.json() as Post[]);
    }
}
