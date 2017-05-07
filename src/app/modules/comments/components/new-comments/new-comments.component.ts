import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    CommentsService,
    BlogService,
    ToastService,
    UserService
}                 from '../../../../services';
import { fadeIn } from '../../../../animations';

@Component({
    templateUrl: 'new-comments.component.html',
    styleUrls: ['new-comments.component.scss'],
    animations: [fadeIn]
})
export class NewCommentsComponent implements OnInit {
    comments = [];
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}`;
    isFetching = false;
    empty = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private blogService: BlogService,
                private toastService: ToastService,
                private userService: UserService,
                private commentsService: CommentsService) { }

    ngOnInit(): void {
        const user = this.userService.getUser();

        if (user.login.toLowerCase() !== this.name.toLowerCase()) {
            this.router.navigate(['/']);
            return;
        }

        this.getNewComments();
    }

    getNewComments(): void {
        this.commentsService
            .getFromFile(this.name, this.repo)
            .then(data => {
                this.comments = data;
                this.empty = this.comments.length ? false : true;
            })
            .catch(error => this.toastService.showError(error));
    }

    selectAll(e): void {
        this.comments.forEach(item => item.selected = e.target.checked);
    }

    isAllSelected(): any {
        return this.comments.every(item => item.selected);
    }

    approve(): void {
        const items = this.prepareSelected();

        if (items.length === 0) {
            this.toastService.showWarning('TOAST.NEWCOMMENTS.pleaseSelect');
            return;
        }

        this.isFetching = true;
        this.toastService.showInfo('TOAST.NEWCOMMENTS.approving');

        this.commentsService
            .approve(this.name, this.repo, items)
            .then((data) => {
                data.length === 1
                    ? this.toastService.showSuccess('TOAST.NEWCOMMENTS.wasApproved')
                    : this.toastService.showSuccess('TOAST.NEWCOMMENTS.wereApproved', data.length);
                this.clear();
                this.isFetching = false;
                this.empty = true;
                this.blogService.updateBlog(this.name, this.repo);
            });
    }

    remove(): void {
        const items = this.prepareSelected();

        if (items.length === 0) {
            this.toastService.showWarning('TOAST.NEWCOMMENTS.pleaseSelect');
            return;
        }

        this.isFetching = true;
        this.toastService.showInfo('TOAST.NEWCOMMENTS.deleting');

        this.commentsService
            .removeFromFile(this.name, this.repo, items)
            .then((data) => {
                let amount = data.message.split(']')[0].slice(1) // FIX
                this.toastService.showWarning('TOAST.NEWCOMMENTS.deleted', amount);
                this.clear();
                this.isFetching = false;
                this.empty = true;
                this.blogService.updateBlog(this.name, this.repo);
            });
    }

    clear(): void {
        this.comments = this.comments.filter(item => !item.selected);
    }

    private prepareSelected(): any[] {
        return this.comments
            .map((item, index) => ({ counter: index, ...item }))
            .filter(item => item.selected);
    }

}
