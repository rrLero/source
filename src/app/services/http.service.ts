import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Post } from '../shared/post.model';

@Injectable()
export class HttpService {
    private postsPreviewUrl = 'https://jsonplaceholder.typicode.com/albums/';
    private postsUrl = 'https://jsonplaceholder.typicode.com/posts/';
    // private postsUrl = 'api/posts';
    // private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getPosts(): Promise<Post[]> {
        return this.http.get(this.postsPreviewUrl)
            .toPromise()
            .then(response => response.json() as Post[])
            .catch(this.handleError);
    }
    getPost(id: number): Promise<Post> {
        return this.http.get(this.postsUrl + id)
            .toPromise()
            .then(response => response.json() as Post)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
