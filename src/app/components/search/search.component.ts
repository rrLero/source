import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { HttpService }   from '../../services/index';
import { SearchService } from '../../services/index';
import { Post }          from '../../shared/post.model';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    providers: [SearchService]
})
export class SearchComponent implements OnInit {
    posts: Observable<Post[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private httpService: HttpService,
        private searchService: SearchService,
        private router: Router) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }
    ngOnInit(): void {
        this.posts = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term
                ? this.searchService.search(term)
                : Observable.of<Post[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Post[]>([]);
            });
    }
    gotoDetail(post: Post): void {
        let link = ['/post', post.id];
        this.router.navigate(link);
    }
}
