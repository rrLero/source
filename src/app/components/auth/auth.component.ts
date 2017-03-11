import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, Response }         from "@angular/http";
import { Observable }             from "rxjs";

@Component({
    template: `<p>Authenticate</p>`,
})

export class AuthComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private http: Http) {
    }

    accessToken: any;

    public getToken(code) {
        const url = 'http://gitblog.pythonanywhere.com/rrlero/git-blog/api/oauth';
        // const url = `http://localhost:9999/authenticate/${code}`;
        this.accessToken = this.http.post(url, { code })
        // this.accessToken = this.http.get(url)
            .map((res: Response) => {
                let json = res.json();
                console.log(json);
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
            });
    }

}