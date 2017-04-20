import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { DraftService, UserService, ToastService }    from '../../services';
import { Post }                                       from '../../shared/post.model';

@Component({
    selector: 'draft',
    templateUrl: 'draft.component.html',
    styleUrls: ['draft.component.scss'],
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
export class DraftComponent implements OnInit {
    post: Post;
    user: any;
    // commentsStatus: boolean;
    // commentsAmount: number;
    canEdit = false;
    controls = false;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    url = `/${this.name}/${this.repo}/drafts`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                // private commentsService: CommentsService,
                public toastService: ToastService,
                // private httpService: HttpService,
                private draftService: DraftService,
                private userService: UserService) { }

    ngOnInit(): void {
        this.getPost();
        this.user = this.userService.getUser();
        if (this.user) {
            this.userService
                .getPermission(this.name, this.repo, this.user.login)
                .then(res => this.canEdit = res.access)
                .catch(error => this.toastService.showError(error));
        }
    }

    getPost(): void {
        this.route.params
            .switchMap(({ name, repo, title }) =>
                this.draftService
                    .getDraft(name, repo, title))
                    .subscribe(
                        post => {
                            this.post = post;
                            // this.commentsStatus = this.post.comments_status;
                            // this.commentsAmount = this.post.comments;
                        },
                        error => this.toastService.showError(error));
    }

    toggleControls(): void {
        this.controls = !this.controls;
    }

    // commentsHandler(data): void {
    //     if (typeof data === 'boolean') {
    //         this.commentsStatus = data;
    //     } else if (typeof data === 'number') {
    //         this.commentsAmount = data;
    //     }
    // }
    goBack(): void {
        let loadPage = localStorage.getItem('page') ? localStorage.getItem('page') : 1;
        this.router.navigate([`/${this.url}/page/${loadPage}`]);
        localStorage.removeItem('page');
    }
}
