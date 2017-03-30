import { Component, Input, Output, EventEmitter }     from '@angular/core';
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
export class PostsTemplateComponent {
    @Input() posts: Post[];
    @Input() total: number;
    @Input() perPage: number;
    @Input() name: string;
    @Input() repo: string;
    @Input() id: number;
    @Input() tag: string;
    @Input() url: string;
    @Input() canEdit: boolean;
    @Input() empty: boolean;
    @Input() user: any;
    @Output() pageChange = new EventEmitter();

    handlePageChange(page: number): void {
        this.pageChange.emit(page);
    }
    savePage() {
        let page = JSON.stringify(this.id);
        localStorage.setItem('page', page);
    }
}
