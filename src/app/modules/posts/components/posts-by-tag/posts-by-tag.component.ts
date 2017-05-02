import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HttpService, UserService, ToastService } from '../../../../services';
import { Post }                                   from '../../../../shared/post.model';

@Component({
    templateUrl: 'posts-by-tag.component.html',
    styleUrls: ['posts-by-tag.component.scss'],
    animations: [
        trigger('posts', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(0, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class PostsByTagComponent implements OnInit {
    posts: Post[];
    user: any;
    tag: string;
    paginationUrl: string;
    total = 0;
    perPage = 5;
    empty = false;
    canEdit = false;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    id = +this.route.snapshot.params['id'] || 1;
    url = `/${this.name}/${this.repo}`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private httpService: HttpService,
                private userService: UserService,
                public toastService: ToastService) { };

    ngOnInit(): void {
        this.getUser();
        this.getPosts();
    }

    getUser(): void {
        this.user = this.userService.getUser();
        if (this.user) {
            this.userService
                .getPermission(this.name, this.repo, this.user.login)
                .then(res => this.canEdit = res.access)
                .catch(error => this.toastService.showError(error));
        }
    }

    getPosts(id: number = this.id): void {
        this.route.params.forEach((param) => {
            this.tag = param.tag;
            this.paginationUrl = `${this.url}/tag/${this.tag}`;
        });
        this.httpService
            .getPostsByTag(this.name, this.repo, id, this.perPage, this.tag)
            .then(res => {
                if (res.items) {
                    this.posts = res.items;
                    this.total = res.total;
                    window.scrollTo(0, 0);
                } else {
                    this.empty = true;
                }
            })
            .catch(error => this.toastService.showError(error));
    }

    handlePageChange(page: number): void {
        this.getPosts(page);
    }
}
