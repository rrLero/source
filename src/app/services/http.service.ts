import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Post } from '../shared/post.model';

@Injectable()
export class HttpService {
    // private headers = new Headers({ 'Content-Type': 'application/json' });
    private postsUrl = 'http://localhost:5000/alextriam/git-blog/api/get';
    private postUrl = `${this.postsUrl}/post`;
    // private postsUrl = 'http://gitblog.pythonanywhere.com/alextriam/git-blog/api/get';
    // private postUrl = `${this.postsUrl}/post`;

    constructor(private http: Http) { }

    getPosts(): Promise<Post[]> {
        return this.http.get(this.postsUrl)
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError);
    }
    getPost(id: number): Promise<Post> {
        return this.http.get(`${this.postUrl}/${id}`)
            .toPromise()
            .then(response => response.json() as Post)
            .catch(this.handleError);
    }
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
