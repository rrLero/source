import { Injectable }                     from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable }                     from 'rxjs/Observable';
import { UserService }                    from './user.service';

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
        this.getUrl(name, repo);
        return this.http
            .get(`${this.url}/get_comments/${postId}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    add(name: string, repo: string, postId: string, body: string) {
        this.getUrl(name, repo);
        let token = this.userService.getUser().access_token;
        return this.http
            .post(`${this.url}/get_comments/${postId}?access_token=${token}`, { body })
            .toPromise()
            .then(response => response.status)
            .catch(this.handleError);
    }

    remove(name: string, repo: string, id: number) {
        this.getUrl(name, repo);
        let token = this.userService.getUser().access_token;
        return this.http
            .delete(`${this.url}/get_comments/${id}?access_token=${token}`)
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

    getCommentsStatus(name: string, repo: string, id: string) {
        this.getUrl(name, repo);
        const url = `${this.url}/lock_status/${id}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

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
            .then(response => response.json())
            .catch(this.handleError);
    }

    getFromFile(name: string, repo: string) {
        this.getUrl(name, repo);
        return this.http
            .get(`${this.url}/get_comments_file`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    approve(name: string, repo: string, data) {
        this.getUrl(name, repo);
        let token = this.userService.getUser().access_token;
        return this.http
            .post(`${this.url}/get_comments_file?access_token=${token}`, data)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    removeFromFile(name: string, repo: string, data) {
        this.getUrl(name, repo);
        let token = this.userService.getUser().access_token;
        let options = new RequestOptions({ body: data });
        return this.http
            .delete(`${this.url}/get_comments_file?access_token=${token}`, options)
            .toPromise()
            .then(response => response.json())
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
