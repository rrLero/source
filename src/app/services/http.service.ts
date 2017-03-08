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
        this.url = `${this.host}/${name}/${repo}/api/get`;
    }
    getPosts(name: string, repo: string): Promise<Post[]> {
        this.getUrl(name, repo);
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError);
    }
    getPost(name: string, repo: string, title: string): Promise<Post> {
        this.getUrl(name, repo);
        return this.http.get(`${this.url}/${title}`)
            .toPromise()
            .then(response => response.json() as Post)
            .catch(this.handleError);
    }
    // create(post: Post): Promise<Post> {
    //     return this.http
    //         .post(this.postsUrl, JSON.stringify(post), { headers: this.headers })
    //         .toPromise()
    //         .then(res => res.json())
    //         .catch(this.handleError);
    // }
    // delete(id: number): Promise<void> {
    //     const url = `${this.postUrl}/${id}`;
    //     return this.http.delete(url, { headers: this.headers })
    //         .toPromise()
    //         .then(() => null)
    //         .catch(this.handleError);
    // }
    // update(post: Post): Promise<Post> {
    //     console.log(post);
    //     const url = `${this.postsUrl}/${post.id}`;
    //     return this.http
    //         .put(url, JSON.stringify(post), { headers: this.headers })
    //         .toPromise()
    //         .then(() => post)
    //         .catch(this.handleError);
    // }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
