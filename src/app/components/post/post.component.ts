import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { HttpService }            from '../../services/index';
import { Post }                   from '../../shared/post.model';


@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
    post: Post;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    url = `/${this.name}/${this.repo}/post/${this.title}`;
    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private httpService: HttpService) { }

    ngOnInit(): void {
        this.route.params
        .switchMap(({ name, repo, title }) =>
            this.httpService.getPostByTitle(name, repo, title))
            .subscribe(post => this.post = post);
    }
    goBack(): void {
        // this.location.back();
        let loadPage = localStorage.getItem('page') ? localStorage.getItem('page') : '1';
        this.router.navigate([`/${this.name}/${this.repo}/page/${loadPage}`]);
        localStorage.removeItem('page');
    }
}
