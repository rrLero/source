// import { Component, Input }       from '@angular/core';
import {
    Component,
    Input,
    trigger,
    state,
    style,
    transition,
    animate
}                                 from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService }            from '../../services/index';
import { Post }                   from '../../shared/post.model';

@Component({
    selector: 'controls',
    templateUrl: 'controls.component.html',
    styleUrls: ['controls.component.scss'],
    animations: [
        trigger('controls', [
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
export class ControlsComponent {
    @Input() post: Post;
    @Input() owner: string;
    hidden = true;
    popupText = 'deleting...';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    create = `/${this.name}/${this.repo}/create`;
    edit = `/${this.name}/${this.repo}/post/${this.title}/edit`;
    constructor(
        private router: Router,
        private route: ActivatedRoute,

        private httpService: HttpService) {
    }

    delete() {
        this.hidden = false;
        if (confirm('delete post?')) {
            this.httpService
            .delete(this.name, this.repo, this.post.id, this.post.sha)
            .then(() =>
                this.httpService.updateBlog(this.name, this.repo)
                .subscribe(() => {
                    this.popupText = 'done!';
                    setTimeout(() => this.hidden = true, 1500);
                    setTimeout(() => this.router.navigate([`/${this.name}/${this.repo}`]), 1800);
                })
            );
        } else {
            this.hidden = true;
        }
    }
    deleteBlog() {
        this.hidden = false;
        if (confirm('Remove blog?')) {
            this.httpService
            .deleteBlog(this.name, this.repo)
            .then(() => {
                this.popupText = 'done!';
                setTimeout(() => this.hidden = true, 1500);
                setTimeout(() => this.router.navigate(['/']), 1800);
            });
        } else {
            this.hidden = true;
        }
    }
}
