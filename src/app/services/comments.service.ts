import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class CommentsService {
    private host = 'http://gitblog.pythonanywhere.com';

    constructor(private http: Http) { }

    get(name: string, repo: string, postId: string) {
        return this.http
            .get(`${this.host}/${name}/${repo}/api/get_comments/${postId}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    add(name: string, repo: string, postId: string, body: string) {
        let token = localStorage.getItem('access_token');
        return this.http
            .post(`${this.host}/${name}/${repo}/api/get_comments/${postId}?access_token=${token}`, { body })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    remove(name: string, repo: string, id: number) {
        let token = localStorage.getItem('access_token');
        return this.http
            .delete(`${this.host}/${name}/${repo}/api/get_comments/${id}?access_token=${token}`,)
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