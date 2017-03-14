import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { HttpService }       from '../../services/index';

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.scss']
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
                // console.log(this.blogs);
            });
    }
    go(name, repo) {
        this.router.navigate([`${name}/${repo.value}`]);
    }
}
