import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { CommentsService, ToastService } from '../../services';

@Component({
    templateUrl: 'new-comments.component.html',
    styleUrls: ['new-comments.component.scss']
})
export class NewCommentsComponent implements OnInit {
    comments;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}`;

    constructor(
        private route: ActivatedRoute,
        public toastService: ToastService,
        private commentsService: CommentsService) {  }

    ngOnInit() {
        this.commentsService.getFromFile(this.name, this.repo).then(data => {
            this.comments = data;
        })
    }

    selectAll(e) {
        this.comments.forEach(item => item.selected = e.target.checked);
    }

    isAllSelected() {
        return this.comments.every(item => item.selected);
    }

    prepareSelected() {
        return this.comments
            .map((item, index) => ({ counter: index, ...item }))
            .filter(item => item.selected);
    }

    approve() {
        const items = this.prepareSelected();

        if (items.length === 0) {
            this.toastService.showError('Please select items.')
            return;
        }

        this.commentsService.approve(this.name, this.repo, items).then((data) => {
            const message = data.length === 1 ?
                'Comment was approved.' :
                `${data.length} comments were approved.`;
            this.toastService.showSuccess(message)
        });
    }

    delete() {
        const items = this.prepareSelected();

        if (items.length === 0) {
            this.toastService.showError('Please select items.')
            return;
        }

        this.commentsService.removeFromFile(this.name, this.repo, items).then((data) => {
            this.toastService.showSuccess(data.message)
        });
    }
}
