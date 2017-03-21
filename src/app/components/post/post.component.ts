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

import { HttpService, CommentsService, AuthService, UserService }            from '../../services/index';
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
    comments: boolean;
    user: any;
    canEdit = false;
    controls = false;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    url = `/${this.name}/${this.repo}/post/${this.title}`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private commentsService: CommentsService,
                private httpService: HttpService,
                private userService: UserService,
                public authService: AuthService) { }

    ngOnInit(): void {
        this.getPost();
        this.statusComments();
        this.user = this.userService.getUser();
        if (this.user) {
            this.userService.getPermission(this.name, this.repo, this.user.login)
                .then(res => this.canEdit = res.access);
        }
    }
    getPost() {
        this.route.params
        .switchMap(({ name, repo, title }) =>
            this.httpService.getPost(name, repo, title))
            .subscribe(post => {
                this.post = post;
                // console.log(this.post);
            });
    }
    toggleControls() {
        this.controls = !this.controls;
    }
    statusComments() {
        this.commentsService
            .getCommentsStatus(this.name, this.repo, this.title)
            .then(res => this.comments = res.status );
    }
    commentsHandler(status) {
        this.comments = status;
    }
    goBack(): void {
        let loadPage = localStorage.getItem('page') ? localStorage.getItem('page') : 1;
        this.router.navigate([`/${this.name}/${this.repo}/page/${loadPage}`]);
        localStorage.removeItem('page');
        // this.location.back();
    }
}
