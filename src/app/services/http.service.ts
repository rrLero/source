import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

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
    getPosts(name: string, repo: string): Promise<Post[]> {
        this.getUrl(name, repo);
        return this.http.get(`${this.url}/get`)
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError);
    }
    getPost(name: string, repo: string, id: string): Promise<Post> {
        this.getUrl(name, repo);
        return this.http.get(`${this.url}/get/id/${id}`)
            .toPromise()
            .then(response => response.json() as Post)
            .catch(this.handleError);
    }
    getPostByTitle(name: string, repo: string, title: string): Promise<Post> {
        this.getUrl(name, repo);
        return this.http.get(`${this.url}/get/${title}`)
            .toPromise()
            .then(response => response.json() as Post)
            .catch(this.handleError);
    }
    update(name: string, repo: string, id: string, sha: string, post: Post): Promise<Post> {
        this.getUrl(name, repo);
        const token = localStorage.getItem("access_token");
        const url = `${this.url}/put/${id}/${sha}?access_token=${token}`;
        return this.http
            .post(url, JSON.stringify(post), { headers: this.headers })
            .toPromise()
            .then(() => post)
            .catch(this.handleError);
    }
    create(name: string, repo: string, post: Post) {
        this.getUrl(name, repo);
        const url = `${this.host}/${name}/${repo}`;
        console.log(post);
        // return this.http
        //     .post(url, JSON.stringify(post), { headers: this.headers })
        //     .toPromise()
        //     .then(res => res.json())
        //     .catch(this.handleError);
    }
    // create(name: string, repo: string, post: Post): Promise<Post> {
        // this.getUrl(name, repo);
        // const url = `${this.host}/${name}/${repo}`;
        // return this.http
        //     .post(url, JSON.stringify(post), { headers: this.headers })
        //     .toPromise()
        //     .then(res => res.json())
        //     .catch(this.handleError);
    // }
    // delete(name: string, repo: string, title: string): Promise<void> {
        // this.getUrl(name, repo);
        // const url = `${this.host}/${name}/${repo}`;
        // return this.http.delete(url, { headers: this.headers })
        //     .toPromise()
        //     .then(() => null)
        //     .catch(this.handleError);
    // }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
