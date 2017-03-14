// import { Component, OnInit }      from '@angular/core';
import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
}                                 from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService }            from '../../services/index';
import { Post }                   from '../../shared/post.model';

@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss'],
    animations: [
        trigger('post', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(300, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class PostComponent implements OnInit {
    post: Post;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    canEdit = false;
    url = `/${this.name}/${this.repo}/post/${this.title}`;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private httpService: HttpService) {
    }

    ngOnInit(): void {
        this.getPost();
    }
    getPost() {
        this.route.params
        .switchMap(({ name, repo, title }) =>
            this.httpService.getPost(name, repo, title))
            .subscribe(post => this.post = post);
    }
    goBack(): void {
        let loadPage = localStorage.getItem('page') ? localStorage.getItem('page') : '1';
        this.router.navigate([`/${this.name}/${this.repo}/page/${loadPage}`]);
        localStorage.removeItem('page');
        // this.location.back();
    }
}
