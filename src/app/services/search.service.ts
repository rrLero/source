import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import { Post } from '../models';
import { api }  from '../shared';

@Injectable()
export class SearchService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = api;
    private url: string;

    constructor(private http: Http) { }

    getUrl(name: string, repo: string): void {
        this.url = `${this.host}/${name}/${repo}/api`;
    }

    search(name: string, repo: string, term: string): Observable<Post[]> {
        this.getUrl(name, repo);
        return this.http
            .get(`${this.url}/get?title=${term}`)
            .map(response => response.json() as Post[]);
    }

    advancedSearch(name: string, repo: string, data: any): Promise<any> {
        this.getUrl(name, repo);
        const url = `${this.url}/search`;
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
