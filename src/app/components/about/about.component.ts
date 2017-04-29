import { Component, OnInit }                          from '@angular/core';
import { Router }                                     from '@angular/router';
import { Location }                                   from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateService }                           from '@ngx-translate/core';

import { DraftService, ToastService }                 from '../../services';
import { Post }                                       from '../../shared/post.model';

@Component({
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.scss'],
    animations: [
        trigger('post', [
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
export class AboutComponent implements OnInit {
    posts: Post[];
    postsLocal: Post[];
    post: any = {};
    title: string;
    active: string;
    lang = localStorage.getItem('LOCALIZE_LOCAL_STORAGE') || 'en';

    constructor(private router: Router,
                private translate: TranslateService,
                private location: Location,
                private draftService: DraftService,
                public toastService: ToastService) {
        translate.onLangChange.subscribe(event => {
            this.lang = event.lang;
            this.getDrafts();
        });
    }

    ngOnInit(): void {
        this.getDrafts();
    }

    getDrafts(): void {
        this.draftService
            .getDrafts('blog-platform', 'dev', 1, 10)
            .then(res => {
                if (res.items.length) {
                    this.posts = res.items;
                    this.chooseLang();
                    this.getData(this.active || 'FAQ');
                }
            })
            .catch(error => this.toastService.showError(error));
    }

    getData(title: string): void {
        this.postsLocal.forEach(item => {
            if (item.title === title) {
                this.post.text_full_strings = item.text_full_strings;
                this.active = title;
            }
        });
    }

    chooseLang(): void {
        this.postsLocal = this.posts.filter(item => item.tags[0] === this.lang)
    }

    goBack(): void {
        this.location.back();
    }
}
