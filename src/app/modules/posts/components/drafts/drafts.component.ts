import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';

import { DraftService, UserService, ToastService }    from '../../../../services';
import { Post }                                       from '../../../../models';

@Component({
    selector: 'drafts',
    templateUrl: 'drafts.component.html',
    styleUrls: ['drafts.component.scss']
})
export class DraftsComponent implements OnInit {
    posts: Post[];
    user: any;
    total = 0;
    perPage = 5;
    empty = false;
    canEdit = true;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    id = +this.route.snapshot.params['id'] || 1;
    url = `/${this.name}/${this.repo}/drafts/`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                private draftService: DraftService,
                public toastService: ToastService) { };

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
        this.draftService
            .getDrafts(this.name, this.repo, id, this.perPage)
            .then(res => {
                if (res.total) {
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
        this.getPage(page);
        // console.log(true);
    }
}
