import { Component, Input, OnInit }                   from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateService }                           from '@ngx-translate/core';
import * as moment                                    from 'moment';

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
    @Input() drafts: boolean;
    @Input() name: string;
    @Input() repo: string;
    @Input() tag: string;
    @Input() url: string;
    @Input() canEdit: boolean;

    constructor(private translate: TranslateService) {
        translate.onLangChange.subscribe(event => {
            moment.locale(event.lang);
        });
        moment.locale(translate.currentLang);
    }

    ngOnInit(): void { }
}
