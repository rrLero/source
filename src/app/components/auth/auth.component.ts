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