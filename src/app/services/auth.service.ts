import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { UserService }    from './user.service';

@Injectable()
export class AuthService {
    private _isLogged: boolean;

    constructor(private http: Http,
                private userService: UserService) {
        this._isLogged = !!localStorage.getItem('user');
    }

    getToken(code) {
        const url = `http://localhost:9999/authenticate/${code}`;
        // const url = `http://gitblog.pythonanywhere.com/rrlero/git-blog/api/oauth?code=${code}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .then(response => {
                // if (response && response.access_token) {
                if (response && response.token) {
                    // return this.userService.getProfile(response.access_token)
                    return this.userService.getProfile(response.token)
                        .then((data) => {
                            this._isLogged = true;
                            return {
                                ...data,
                                // token: response.access_token,
                                token: response.token,
                            }
                        });
                }
            })
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
