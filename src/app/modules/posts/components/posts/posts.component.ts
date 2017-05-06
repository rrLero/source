import { Component, OnInit }                      from '@angular/core';
import { Router, ActivatedRoute }                 from '@angular/router';
import { LocalizeRouterService }                  from 'localize-router';
import { PostService, UserService, ToastService } from '../../../../services';
import { Post }                                   from '../../../../models';

@Component({
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss']
})
export class PostsComponent implements OnInit {
    posts: Post[];
    user: any;
    total = 0;
    perPage = 5;
    empty = false;
    canEdit = false;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    id = +this.route.snapshot.params['id'] || 1;
    url = `/${this.name}/${this.repo}/`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private localize: LocalizeRouterService,
                private postService: PostService,
                private userService: UserService,
                public toastService: ToastService) { };

    ngOnInit(): void {
        this.getUser();
        this.getPage();
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

    getPage(id: number = this.id): void {
        this.postService
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
            .catch(error => {
                if (error.status === 404) {
                    let localUrl = this.localize.translateRoute('/page-not-found');
                    this.router.navigate([localUrl]);
                }
            });
    }

    handlePageChange(page: number): void {
        this.getPage(page);
    }
}
