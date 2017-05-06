import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import {
    BlogService,
    UserService,
    ToastService,
    AuthService
}                 from '../../services';
import { fadeIn } from '../../animations';
import { Blog }   from '../../models';

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.scss'],
    animations: [fadeIn]
})
export class WelcomeComponent implements OnInit {
    blogs: Blog[] = [];
    favorites: Blog[] = [];
    login: string;

    constructor(private router: Router,
                private toastService: ToastService,
                private blogService: BlogService,
                private userService: UserService,
                private authService: AuthService) { }

    ngOnInit(): void {
        this.getBlogs();
    }

    getBlogs(): void {
        this.blogService
            .getBlogs()
            .then(blogs => {
                this.blogs = blogs;
                this.getSubscribe();
            })
            .catch(error => this.toastService.showError(error));
    }

    getSubscribe(): void {
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

    subscribe(blog: Blog): void {
        this.toastService.showInfo('TOAST.WELCOME.process');
        this.blogService.subscribeBlog(this.login, blog.id)
            .then(() => {
                blog.subscribed = true;
                this.favorites.push(blog);
                this.toastService.showSuccess('TOAST.WELCOME.subscribe');
            })
            .catch(error => this.toastService.showError(error));
    }

    unsubscribe(blog: Blog): void {
        this.toastService.showInfo('TOAST.WELCOME.process');
        this.blogService.unsubscribeBlog(this.login, blog.id)
            .then(() => {
                blog.subscribed = false;
                this.favorites = this.favorites.filter(item => item.id !== blog.id);
                this.toastService.showSuccess('TOAST.WELCOME.unsubscribe');
            })
            .catch(error => this.toastService.showError(error));
    }

    get isLogged(): boolean {
        return this.authService.isLogged;
    }
}
