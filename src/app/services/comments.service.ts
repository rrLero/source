import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { UserService }    from './user.service';

@Injectable()
export class CommentsService {
    private host = 'http://gitblog.pythonanywhere.com';
    private url: string;

    constructor(private http: Http,
        private userService: UserService) { }

    getUrl(name: string, repo: string) {
        this.url = `${this.host}/${name}/${repo}/api`;
    }

    get(name: string, repo: string, postId: string) {
        return this.http
            .get(`${this.host}/${name}/${repo}/api/get_comments/${postId}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    add(name: string, repo: string, postId: string, body: string) {
        let token = this.userService.getUser().access_token;
        return this.http
            .post(`${this.host}/${name}/${repo}/api/get_comments/${postId}?access_token=${token}`, { body })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    remove(name: string, repo: string, id: number) {
        let token = this.userService.getUser().access_token;
        return this.http
            .delete(`${this.host}/${name}/${repo}/api/get_comments/${id}?access_token=${token}`, )
            .toPromise()
            .then(response => response.status)
            .catch(this.handleError);
    }
    edit(name: string, repo: string, id: number, body: string) {
        this.getUrl(name, repo);
        const token = this.userService.getUser().access_token;
        const url = `${this.url}/get_comments/${id}?access_token=${token}`;
        return this.http
            .put(url, { body })
            .toPromise()
            .then(response => response.status)
            .catch(this.handleError);
    }
    // getCommentsStatus(name: string, repo: string, id: string) {
    //     this.getUrl(name, repo);
    //     const token = this.userService.getUser().access_token;
    //     const url = `${this.url}/lock_comments/${id}?access_token=${token}`;
    //     return this.http
    //         .get(url)
    //         .toPromise()
    //         .then(response => response.status)
    //         .catch(this.handleError);
    // }
    unLockComments(name: string, repo: string, id: string) {
        this.getUrl(name, repo);
        const token = this.userService.getUser().access_token;
        const url = `${this.url}/lock_comments/${id}?access_token=${token}`;
        return this.http
            .delete(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    lockComments(name: string, repo: string, id: string) {
        this.getUrl(name, repo);
        const token = this.userService.getUser().access_token;
        const url = `${this.url}/lock_comments/${id}?access_token=${token}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.status)
            .catch(this.handleError);
    }

    private handleError(err) {
        let errMessage: string;

        if (err instanceof Response) {
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
        } else {
            errMessage = err.message ? err.message : err.toString();
        }

        return Observable.throw(errMessage);
    }
}
