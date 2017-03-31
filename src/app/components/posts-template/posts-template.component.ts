import { Component, Input, OnInit }                   from '@angular/core';
import { ActivatedRoute }                             from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Post } from '../../shared/post.model';

@Component({
    selector: 'posts-template',
    templateUrl: 'posts-template.component.html',
    styleUrls: ['posts-template.component.scss'],
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
export class PostsTemplateComponent implements OnInit {
    @Input() posts: Post[];
    @Input() name: string;
    @Input() repo: string;
    @Input() tag: string;
    @Input() url: string;
    @Input() canEdit: boolean;
    @Input() user: any;
    id: string;
    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getPageId();
    }

    getPageId(): void {
        this.route.params.forEach(param => {
            this.id = param.id;
        });
    }
    savePage(): void {
        let page = this.id || '1';
        localStorage.setItem('page', page);
    }
}
