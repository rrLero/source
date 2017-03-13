import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Post }          from '../shared/post.model';

@Injectable()
export class HttpService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = 'http://gitblog.pythonanywhere.com';
    private url: string;
    constructor(private http: Http) { }

    getUrl(name: string, repo: string) {
        this.url = `${this.host}/${name}/${repo}/api`;
    }
    updateBlogs(name: string, repo: string) {
        this.getUrl(name, repo);
        const url = `${this.url}/update`;
        return this.http.get(url).catch(this.handleError);
    }
    getBlogs(): Promise<any> {
        const url = `${this.host}/api/blog_list`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
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
        const token = localStorage.getItem('access_token');
        const url = `${this.url}/put/${id}/${sha}?access_token=${token}`;
        return this.http
            .post(url, JSON.stringify(post), { headers: this.headers })
            .toPromise()
            .then(() => post)
            .catch(this.handleError);
    }
    create(name: string, repo: string, post: Post): Promise<Post> {
        this.getUrl(name, repo);
        const token = localStorage.getItem('access_token');
        const url = `${this.url}/put/test/test?access_token=${token}`;
        return this.http
            .put(url, JSON.stringify(post), { headers: this.headers })
            .toPromise()
            .then(() => post)
            .catch(this.handleError);
    }
    delete(name: string, repo: string, id: string, sha: string): Promise<void> {
        this.getUrl(name, repo);
        const token = localStorage.getItem('access_token');
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
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
