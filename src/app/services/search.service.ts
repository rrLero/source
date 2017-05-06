import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post }       from '../models';
import { api }        from '../shared';

@Injectable()
export class SearchService {
    private host = api;
    private url: string;

    constructor(private http: Http) { }

    getUrl(name: string, repo: string): void {
        this.url = `${this.host}/${name}/${repo}/api/get?title=`;
    }

    search(name: string, repo: string, term: string): Observable<Post[]> {
        this.getUrl(name, repo);
        return this.http
            .get(`${this.url}${term}`)
            .map(response => response.json() as Post[]);
    }
}
