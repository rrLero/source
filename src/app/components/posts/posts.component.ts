import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { Location }                                   from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HttpService, UserService, ToastService } from '../../services/index';

import { Post } from '../../shared/post.model';

@Component({
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss'],
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
export class PostsComponent implements OnInit {
    posts: Post[];
    total: number = 0;
    perPage: number = 3;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    id = +this.route.snapshot.params['id'] || 1;
    url = `/${this.name}/${this.repo}/`;
    canEdit = false;
    empty = false;
    user: any;
    constructor(private router: Router,
                private location: Location,
                private route: ActivatedRoute,
                public toastService: ToastService,
                private httpService: HttpService,
                private userService: UserService) {
        // location.subscribe(() => this.handlePageChange());
    };

    ngOnInit() {
        this.getUser();
        this.getPage();
    }
    getUser() {
        this.user = this.userService.getUser();
        if (this.user) {
            this.userService
                .getPermission(this.name, this.repo, this.user.login)
                .then(res => this.canEdit = res.access)
                .catch(error => this.toastService.showError(error));
        }
    }
    getPage(id: number = this.id): void {
        this.httpService
            .getPage(this.name, this.repo, id, this.perPage)
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
    handlePageChange(page) {
        // if (!page) {
        //     let path = this.location.path().split('/');
        //     page = parseFloat(path[4]) || 1;
        // }
        this.getPage(page);
    }
    savePage() {
        let page = this.location.path().split('/')[4] || '1';
        localStorage.setItem('page', page);
    }
}
