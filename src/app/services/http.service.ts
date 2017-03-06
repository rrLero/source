import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Location }      from '@angular/common';

import { Post }          from '../shared/post.model';

@Injectable()
export class HttpService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = 'http://gitblog.pythonanywhere.com/';
    private path: string[];
    private url: string;
    constructor(
        private http: Http,
        private location: Location ) { }

    getUrl() {
        this.path = this.location.path().split('/');
        this.url = `${this.host}${this.path[1]}/${this.path[2]}/api/get`;
    }
    getPosts(): Promise<Post[]> {
        this.getUrl();
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError);
    }
    getPost(title: string): Promise<Post> {
        this.getUrl();
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
