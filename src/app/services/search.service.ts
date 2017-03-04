import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http }       from '@angular/http';

import { Post } from '../shared/post.model';

@Injectable()
export class SearchService {
    private url = 'http://localhost:5000/alextriam/git-blog/api/get?title=';
    // private url = 'http://gitblog.pythonanywhere.com/alextriam/git-blog/api/get?title=';
    constructor(private http: Http) { }
    search(term: string): Observable<Post[]> {
        return this.http
            .get(`${this.url}${term}`)
            .map(response => response.json() as Post[]);
    }
}
