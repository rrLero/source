import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizeRouterService }  from 'localize-router';
import { Observable }             from 'rxjs/Observable';
import { Subject }                from 'rxjs/Subject';

import { SearchService, ToastService } from '../../../../services';
import { fadeIn }                      from '../../../../animations';
import { Post }                        from '../../../../models';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    providers: [SearchService],
    animations: [fadeIn]
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
                private toastService: ToastService,
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
