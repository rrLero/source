import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    CommentsService,
    ToastService,
    UserService
} from '../../services';

@Component({
    templateUrl: 'new-comments.component.html',
    styleUrls: ['new-comments.component.scss']
})
export class NewCommentsComponent implements OnInit {
    comments = [];
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}`;
    isFetching = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private toastService: ToastService,
                private userService: UserService,
                private commentsService: CommentsService) {
    }

    ngOnInit(): void {
        const user = this.userService.getUser();

        if (user.login.toLowerCase() !== this.name.toLowerCase()) {
            this.router.navigate(['/']);
            return;
        }

        this.commentsService.getFromFile(this.name, this.repo)
            .then(data => this.comments = data);
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
            this.toastService.showError('TOAST.NEWCOMMENTS.pleaseSelect');
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
            });
    }

    remove(): void {
        const items = this.prepareSelected();

        if (items.length === 0) {
            this.toastService.showError('TOAST.NEWCOMMENTS.pleaseSelect');
            return;
        }

        this.isFetching = true;
        this.toastService.showInfo('TOAST.NEWCOMMENTS.deleting');

        this.commentsService
            .removeFromFile(this.name, this.repo, items)
            .then((data) => {
                let amount = data.message.split(']')[0].slice(1) // FIX
                this.toastService.showError('TOAST.NEWCOMMENTS.deleted', amount);
                this.clear();
                this.isFetching = false;
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
