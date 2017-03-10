import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }            from '@angular/router';
import { AuthService }       from '../../services/index';

@Component({
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {
    credentials = { username: '', password: '' };
    errorMessage: string = '';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];

    client_id = '9ef82b07caf06c5561f5';
    client_secret = 'd96675528726a49606a950e5a022fd483a4207b7';

    githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + this.client_id + '&scope=user&redirect_uri=' + 'http://localhost:8080/';

    constructor(private service: AuthService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
    }

    /**
     * Login a user
     */
    login() {
        this.errorMessage = '';

        this.service.login(this.credentials.username, this.credentials.password)
            .subscribe(
                () => {
                    this.router.navigate([this.name, this.repo]);
                },
                err => {
                    this.errorMessage = err;
                }
            );
    }

}