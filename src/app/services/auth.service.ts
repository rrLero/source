import { Injectable }                              from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Router }                                  from "@angular/router";
import { Observable }                              from "rxjs";

@Injectable()
export class AuthService {
    private _loggedUser: any;
    private _isLogged: boolean;

    constructor(private http: Http,
                private router: Router) {
    }

    public getProfile() {
        let headers = new Headers({'Authorization': 'token ' + localStorage.getItem("access_token")});
        let options = new RequestOptions({headers: headers});

        return this.http.get("https://api.github.com/user", options)
            .map((res: Response) => {
                this._loggedUser = res.json();
                this._isLogged = true;
                return this._loggedUser;
            })
            .catch(this.handleError);
    }

    public logout() {
        this._isLogged = false;
        localStorage.removeItem('access_token');
        return this.router.navigate(['/login']);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    get loggedUser(): any {
        return this._loggedUser;
    }

    get isLogged() {
        return this._isLogged;
    }

}
