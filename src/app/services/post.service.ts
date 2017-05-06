import { Injectable }                    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { UserService } from './user.service';
import { Post }        from '../models';
import { api }         from '../shared';

@Injectable()
export class PostService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = api;
    private url: string;

    constructor(private http: Http,
                private userService: UserService) { }

    getUrl(name: string, repo: string): void {
        this.url = `${this.host}/${name}/${repo}/api`;
    }

    getPosts(name: string, repo: string): Promise<Post[]> {
        this.getUrl(name, repo);
        const url = `${this.url}/get`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError);
    }

    getPage(name: string, repo: string, page: number, size: number): Promise<any> {
        this.getUrl(name, repo);
        const url = `${this.url}/get?page=${page}&per_page=${size}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getPostsByTag(name: string, repo: string, page: number, size: number, tag: string): Promise<any> {
        this.getUrl(name, repo);
        const url = `${this.url}/get/tags/${tag}?page=${page}&per_page=${size}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getPost(name: string, repo: string, id: string): Promise<Post> {
        this.getUrl(name, repo);
        const url = `${this.url}/get/id/${id}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json() as Post)
            .catch(this.handleError);
    }

    update(name: string, repo: string, id: string, sha: string, post: Post): Promise<Post> {
        this.getUrl(name, repo);
        const token = this.userService.getUser().access_token;
        const url = `${this.url}/put/${id}/${sha}?access_token=${token}`;
        return this.http
            .post(url, JSON.stringify(post), { headers: this.headers })
            .toPromise()
            .then(() => post)
            .catch(this.handleError);
    }

    create(name: string, repo: string, post: Post): Promise<Post> {
        this.getUrl(name, repo);
        const token = this.userService.getUser().access_token;
        const url = `${this.url}/put/master?access_token=${token}`;
        return this.http
            .put(url, JSON.stringify(post), { headers: this.headers })
            .toPromise()
            .then(() => post)
            .catch(this.handleError);
    }

    delete(name: string, repo: string, id: string, sha: string): Promise<void> {
        this.getUrl(name, repo);
        const token = this.userService.getUser().access_token;
        const headers = new Headers({ 'Authorization': 'token ' + token });
        const options = new RequestOptions({ headers: headers });
        const url = `${this.url}/put/${id}/${sha}?access_token=${token}`;
        return this.http
            .delete(url, options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
