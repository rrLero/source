import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { HttpService }            from '../../services/index';

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html',
})
export class WelcomeComponent implements OnInit {
    // name = '';
    // repo = '';
    blogs: string[];
    constructor(
        private router: Router,
        private httpService: HttpService) { }

    ngOnInit() {
        // this.loadUser();
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
    // loadUser() {
    //     if (localStorage.getItem('name')) {
    //         this.name = localStorage.getItem('name');
    //         this.repo = localStorage.getItem('repo');
    //     }
    // }
    // saveUser(nameEl, repoEl) {
    //     localStorage.setItem('name', nameEl.value);
    //     localStorage.setItem('repo', repoEl.value);
    // }
}
