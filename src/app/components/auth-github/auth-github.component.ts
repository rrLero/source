import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, Response }         from "@angular/http";
import { Observable }             from "rxjs";

import { DEV } from '../../github.config';

@Component({
    template: `<p>Authenticate</p>`,
})

export class AuthGithubComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private http: Http) {
    }

    accessToken: any;

    public getToken(code) {
        this.accessToken = this.http.post('https://github.com/login/oauth/access_token', {
            client_id: DEV.client_id,
            client_secret: DEV.client_secret,
            code,
        })
            .map((res: Response) => {
                let json = res.json();
                console.log(res);
                if (json && json.token) {
                    this.accessToken = json;
                    localStorage.setItem("access_token", this.accessToken.token);
                    return {"authenticated": true};
                } else {
                    localStorage.removeItem("access_token");
                    return {"authenticated": false};
                }
            })
            .catch(this.handleError);
        console.log(this.accessToken);
        return this.accessToken;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (param: any) => {
                let code = param['code'];
                this.getToken(code)
                    .subscribe(() => {
                    return this.router.navigate(['/']);
                });
            })
    }

}