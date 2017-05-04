import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LocalizeRouterService }                      from 'localize-router';
import { Observable }                                 from 'rxjs/Observable';
import { Subject }                                    from 'rxjs/Subject';

import { SearchService, ToastService } from '../../../../services';
import { Post }                        from '../../../../shared';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    providers: [SearchService],
    animations: [
        trigger('search', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(100, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class SearchComponent implements OnInit {
    posts: Observable<Post[]>;
    private searchTerms = new Subject<string>();
    private name = this.route.snapshot.params['name'];
    private repo = this.route.snapshot.params['repo'];
    private url = `/${this.name}/${this.repo}/post/`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private localize: LocalizeRouterService,
                public toastService: ToastService,
                private searchService: SearchService) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.posts = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term
                ? this.searchService.search(this.name, this.repo, term)
                : Observable.of<Post[]>([]))
            .catch(error => {
                this.toastService.showError(error);
                return Observable.of<Post[]>([]);
            });
    }

    gotoDetail(post: Post): void {
        let localUrl = this.localize.translateRoute(this.url)
        this.router.navigate([localUrl, post.id]);
    }

}