import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable }             from 'rxjs/Observable';
import { Subject }                from 'rxjs/Subject';

import { SearchService }          from '../../services/index';
import { Post }                   from '../../shared/post.model';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    providers: [SearchService]
})
export class SearchComponent implements OnInit {
    posts: Observable<Post[]>;
    private searchTerms = new Subject<string>();
    private name = this.route.snapshot.params['name'];
    private repo = this.route.snapshot.params['repo'];
    private url = `/${this.name}/${this.repo}/post/`;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
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
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Post[]>([]);
            });
    }
    gotoDetail(post: Post): void {
        let link = [this.url, post.title];
        this.router.navigate(link);
    }
}
