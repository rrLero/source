import { Injectable }                              from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    private _isLogged: boolean;

    constructor(private http: Http,
                private userService: UserService) {
        this._isLogged = !!localStorage.getItem('user');
    }

    getToken(code): Observable<string> {
        const url = `http://localhost:9999/authenticate/${code}`;
        // const url = `http://gitblog.pythonanywhere.com/rrlero/git-blog/api/oauth?code=${code}`;
        return this.http.get(url)
            .map(response => response.json())
            .do(response => {
                // if (response && response.access_token) {
                if (response && response.token) {
                    // localStorage.setItem('access_token', response.access_token);
                    // localStorage.setItem('access_token', response.token);
                    this.userService.getProfile(response.token).then(data => {
                        const user = {
                            access_token: response.token,
                            login: data.login,
                            name: data.name,
                            avatar_url: data.avatar_url,
                        };
                        localStorage.setItem('user', JSON.stringify(user));
                    });
                    this._isLogged = true;
                }
            })
            .catch(this.handleError);
    }

    // getProfile() {
    //     let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') });
    //     let options = new RequestOptions({ headers: headers });
    //
    //     return this.http.get('https://api.github.com/user', options)
    //         .map(response => response.json())
    //         .do(response => {
    //             this._loggedUser = response;
    //         })
    //         .catch(this.handleError);
    // }

    // getPermission(name: string, repo: string, login: string) {
    //     let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem("access_token") });
    //     headers.append('Accept', 'application/vnd.github.korra-preview');
    //     let options = new RequestOptions({ headers: headers });
    //
    //     return this.http.get(`https://api.github.com/repos/${name}/${repo}/collaborators/${login}/permission`, options)
    //         .toPromise()
    //         .then(response => response.json())
    //         .then(response => {
    //             this._access = response.permission !== 'none' && response.permission !== 'read';
    //         })
    //         .catch(() => {
    //             this._access = false;
    //         });
    // }

    getPermission(name: string, repo: string, login: string) {
        const token = localStorage.getItem("access_token");

        return this.http.get(`http://gitblog.pythonanywhere.com/api/repo_master/${name}/${repo}/${login}?access_token=${token}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    logout() {
        this._isLogged = false;
        localStorage.removeItem('user');
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

    get isLogged() {
        return this._isLogged;
    }

}
