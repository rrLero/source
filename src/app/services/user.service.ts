import { Injectable }                              from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getProfile(token) {
        let headers = new Headers({ 'Authorization': `Bearer ${token}` });
        let options = new RequestOptions({ headers: headers });

        return this.http.get('https://api.github.com/user', options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getUser() {
        const user = localStorage.getItem('user');
        return JSON.parse(user);
    }

    getPermission(name: string, repo: string, login: string) {
        const token = this.getUser().access_token;

        return this.http.get(`http://gitblog.pythonanywhere.com/api/repo_master/${name}/${repo}/${login}?access_token=${token}`)
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