import { Component, OnInit }                       from '@angular/core';
import { Router, ActivatedRoute }                  from '@angular/router';
import { Location }                                from '@angular/common';

import { DraftService, UserService, ToastService } from '../../../../services';
import { Post, User }                              from '../../../../models';
import { fadeIn }                                  from '../../../../animations';

@Component({
    selector: 'draft',
    templateUrl: 'draft.component.html',
    styleUrls: ['draft.component.scss'],
    animations: [fadeIn]
})
export class DraftComponent implements OnInit {
    post: Post;
    user: User;
    canEdit = false;
    controls = false;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    url = `/${this.name}/${this.repo}/drafts`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private toastService: ToastService,
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
                        post => this.post = post,
                        error => this.toastService.showError(error));
    }

    toggleControls(): void {
        this.controls = !this.controls;
    }

    goBack(): void {
        this.location.back();
    }

}
