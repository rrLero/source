import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Location }      from '@angular/common';

import { Post } from '../shared/post.model';

@Injectable()
export class HttpService {
    // private headers = new Headers({ 'Content-Type': 'application/json' });
    private path;
    private postsUrl;
    constructor(
        private location: Location,
        private http: Http) { }

    getPosts(): Promise<Post[]> {
        this.path = this.location.path().split('/');
        this.postsUrl = `http://localhost:5000/${this.path[1]}/${this.path[2]}/api/get`;
        // this.postsUrl = `http://gitblog.pythonanywhere.com/${this.path[1]}/${this.path[2]}/api/get`;
        return this.http.get(this.postsUrl)
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError);
    }
    getPost(id: number): Promise<Post> {
        this.path = this.location.path().split('/');
        this.postsUrl = `http://localhost:5000/${this.path[1]}/${this.path[2]}/api/get`;
        return this.http.get(`${this.postsUrl}/post/${id}`)
            .toPromise()
            .then(response => response.json() as Post)
            .catch(this.handleError);
    }
    // getCategory(category: string): Promise<Post[]> {
    //     return this.http.get(`${this.categoryUrl}${category}`)
    //         .toPromise()
    //         .then(response => response.json() as Post[])
    //         .catch(this.handleError);
    // }
    // getPostByTitle(title: string): Promise<Post[]> {
    //     return this.http.get(`${this.postUrl}${title}`)
    //         .toPromise()
    //         .then(response => response.json() as Post[])
    //         .catch(this.handleError);
    // }
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
