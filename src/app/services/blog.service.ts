import { Injectable }                    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { UserService } from './user.service';
import { api }         from '../shared';

@Injectable()
export class BlogService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = api;
    private url: string;

    constructor(private http: Http,
                private userService: UserService) { }

    getUrl(name: string, repo: string): void {
        this.url = `${this.host}/${name}/${repo}/api`;
    }

    getBlogs(): Promise<any> {
        const url = `${this.host}/api/blog_list`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    subscribeBlog(name: string, id: number): Promise<any> {
        const token = this.userService.getUser().access_token;
        const url = `${this.host}/${name}/api/add_subscribe?access_token=${token}`;
        return this.http
            .post(url, [id], { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    unsubscribeBlog(name: string, id: number): Promise<any> {
        const token = this.userService.getUser().access_token;
        const options = new RequestOptions({ headers: this.headers, body: [id] });
        const url = `${this.host}/${name}/api/add_subscribe?access_token=${token}`;
        return this.http
            .delete(url, options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getSubscribe(name: string): Promise<any> {
        const token = this.userService.getUser().access_token;
        const url = `${this.host}/${name}/api/get_subscribe?access_token=${token}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    updateBlog(name: string, repo: string): Promise<void> {
        this.getUrl(name, repo);
        const token = this.userService.getUser().access_token;
        const url = `${this.url}/update?access_token=${token}`;
        return this.http
            .get(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    createBlog(name: string, repo: string): Promise<any> {
        this.getUrl(name, repo);
        const token = this.userService.getUser().access_token;
        const url = `${this.url}/get?access_token=${token}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    deleteBlog(name: string, repo: string): Promise<void> {
        this.getUrl(name, repo);
        const token = this.userService.getUser().access_token;
        const url = `${this.url}/del_repo?access_token=${token}`;
        return this.http
            .delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
