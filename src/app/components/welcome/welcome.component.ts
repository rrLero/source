// import { Component, OnInit } from '@angular/core';
import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
}                            from '@angular/core';
import { Router }            from '@angular/router';

import { HttpService }       from '../../services/index';

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
    blogs: string[];
    constructor(
        private router: Router,
        private httpService: HttpService) { }

    ngOnInit() {
        this.getBlogs();
    }
    getBlogs() {
        this.httpService.getBlogs()
            .then(blogs => {
                this.blogs = blogs;
            });
    }
    go(name, repo) {
        this.router.navigate([`${name}/${repo.value}`]);
    }
}
