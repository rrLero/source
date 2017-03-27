import { Component, OnInit, OnDestroy }               from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HttpService, CommentsService, UserService }  from '../../services/index';
import { Post }                                       from '../../shared/post.model';

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
export class PostComponent implements OnInit, OnDestroy {
    post: Post;
    user: any;
    commentsStatus: boolean;
    commentsAmount: number;
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
                private userService: UserService) { }

    ngOnInit(): void {
        this.getPost();
        this.user = this.userService.getUser();
        if (this.user) {
            this.userService
                .getPermission(this.name, this.repo, this.user.login)
                .then(res => this.canEdit = res.access);
        }
    }
    ngOnDestroy(): void {
        if (this.post.comments !== this.commentsAmount) {
            setTimeout(() =>
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .subscribe(), 0);
        }
    }
    getPost(): void {
        this.route.params
            .switchMap(({ name, repo, title }) =>
                this.httpService
                    .getPost(name, repo, title))
                    .subscribe(post => {
                        this.post = post;
                        this.commentsStatus = this.post.comments_status;
                        this.commentsAmount = this.post.comments;
                    });
    }
    toggleControls(): void {
        this.controls = !this.controls;
    }
    commentsHandler(data): void {
        if (typeof data === 'boolean') {
            this.commentsStatus = data;
        } else if (typeof data === 'number') {
            this.commentsAmount = data;
        }
    }
    goBack(): void {
        let loadPage = localStorage.getItem('page') ? localStorage.getItem('page') : 1;
        this.router.navigate([`/${this.name}/${this.repo}/page/${loadPage}`]);
        localStorage.removeItem('page');
        // this.location.back();
    }
}
