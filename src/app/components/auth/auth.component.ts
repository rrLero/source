import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, Response }         from "@angular/http";
import { Observable }             from "rxjs";

@Component({
    template: `<p>Authenticate</p>`,
})

export class AuthComponent implements OnInit {
    accessToken: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private http: Http) {
    }

    public getToken(code) {
        const url = `http://gitblog.pythonanywhere.com/rrlero/git-blog/api/oauth?code=${code}`;
        this.accessToken = this.http.get(url)
            .map((res: Response) => {
                let json = res.json();
                if (json && json.access_token) {
                    this.accessToken = json;
                    localStorage.setItem("access_token", this.accessToken.access_token);
                    // return { "authenticated": true };
                } else {
                    localStorage.removeItem("access_token");
                    // return { "authenticated": false };
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