import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post }       from '../shared/post.model';

@Injectable()
export class SearchService {
    private host = 'http://gitblog.pythonanywhere.com';
    private url: string;

    constructor(private http: Http) { }

    getUrl(name: string, repo: string) {
        this.url = `${this.host}/${name}/${repo}/api/get?title=`;
    }

    search(name: string, repo: string, term: string): Observable<Post[]> {
        this.getUrl(name, repo);
        return this.http
            .get(`${this.url}${term}`)
            .map(response => response.json() as Post[]);
    }
}
