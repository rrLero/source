import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class CommentsService {
    private host = 'http://gitblog.pythonanywhere.com';

    constructor(private http: Http) {
    }

    getComments(name: string, repo: string, id: string) {
        return this.http.get(`${this.host}/${name}/${repo}/api/get_comments/${id}`)
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