import { Component, OnInit }                          from '@angular/core';
import { Router }                                     from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HttpService, BlogService, UserService, ToastService, AuthService } from '../../services';
import { Blog } from '../../shared/blog.model';

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.scss'],
    animations: [
        trigger('welcome', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(100, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class WelcomeComponent implements OnInit {
    blogs: Blog[] = [];
    favorites: Blog[] = [];
    login: string;

    constructor(private router: Router,
                public toastService: ToastService,
                private blogService: BlogService,
                private httpService: HttpService,
                private userService: UserService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.getBlogs();
    }

    getBlogs() {
        this.httpService
            .getBlogs()
            .then(blogs => {
                this.blogs = blogs;
                this.getSubscribe();
            })
            .catch(error => this.toastService.showError(error));
    }

    getSubscribe() {
        if (!this.isLogged) return;

        this.login = this.userService.getUser().login;

        this.blogService
            .getSubscribe(this.login)
            .then(res => {
                this.blogs.forEach(item => {
                    if (res.indexOf(item.id) !== -1) {
                        item.subscribed = true;
                    }
                });
                this.favorites = this.blogs.filter(item => res.indexOf(item.id) !== -1);
            })
            .catch(error => this.toastService.showError(error));
    }

    subscribe(blog: Blog) {
        this.blogService.subscribeBlog(this.login, blog.id)
            .then(() => {
                blog.subscribed = true;
                this.favorites.push(blog);
                this.toastService.showSuccess('Subscribed');
            })
            .catch(error => this.toastService.showError(error));
    }

    unsubscribe(blog: Blog) {
        this.blogService.unsubscribeBlog(this.login, blog.id)
            .then(() => {
                blog.subscribed = false;
                this.favorites = this.favorites.filter(item => item.id !== blog.id);
                this.toastService.showSuccess('Unsubscribed');
            })
            .catch(error => this.toastService.showError(error));
    }

    get isLogged() {
        return this.authService.isLogged;
    }
}
