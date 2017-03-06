import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Location }          from '@angular/common';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { HttpService }       from '../../services/index';
import { SearchService }     from '../../services/index';
import { Post }              from '../../shared/post.model';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    providers: [SearchService]
})
export class SearchComponent implements OnInit {
    posts: Observable<Post[]>;
    private path = this.location.path().split('/');
    private name = this.path[1];
    private repo = this.path[2];
    private url = `/${this.name}/${this.repo}/post/`;
    private searchTerms = new Subject<string>();
    constructor(
        private location: Location,
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
        let link = [this.url, post.title];
        this.router.navigate(link);
    }
}
