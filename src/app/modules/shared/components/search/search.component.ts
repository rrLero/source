import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
}                                 from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService }       from '@ngx-translate/core';
import { LocalizeRouterService }  from 'localize-router';
import { SelectItem }             from 'primeng/primeng';
import { Observable }             from 'rxjs/Observable';
import { Subject }                from 'rxjs/Subject';

import {
    SearchService,
    ToastService,
    PostService
}                         from '../../../../services';
import { fadeIn }         from '../../../../animations';
import { Post, Calendar } from '../../../../models';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
    providers: [SearchService],
    animations: [fadeIn]
})
export class SearchComponent implements OnInit {
    @Input() advanced: boolean;
    @Output() postsByAuthor = new EventEmitter();
    posts: Observable<Post[]>;
    allPosts: Post[];
    authors: any[] = [];
    uniqueAuthors: string[];
    selectedAuthor: string;
    calendar: Calendar;
    minDate: Date;
    maxDate: Date;
    fromDate: Date;
    beforeDate: Date;
    oneDayBlog: boolean;
    invalidTimeInterval: boolean;
    private lang = localStorage.getItem('LOCALIZE_LOCAL_STORAGE') || 'en';
    private searchTerms = new Subject<string>();
    private name = this.route.snapshot.params['name'];
    private repo = this.route.snapshot.params['repo'];
    private url = `/${this.name}/${this.repo}/post/`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private translate: TranslateService,
                private localize: LocalizeRouterService,
                private postService: PostService,
                private toastService: ToastService,
                private searchService: SearchService) {
        translate.onLangChange.subscribe(event => {
            this.advanced && this.onLangChange(event.lang);
        });
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

        this.advanced && this.loadAdvanced();
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    gotoDetail(post: Post): void {
        let localUrl = this.localize.translateRoute(this.url)
        this.router.navigate([localUrl, post.id]);
    }

    advancedSearch(from: Date, before: Date, author: string): void {
        let dates = this.convertDates(from, before);

        let posts = this.allPosts.filter(post => {
            let postDate = +new Date(post.date) / 1000;
            let authors = this.getPostAuthors(post);

            for (let i = 0; i < authors.length; i++) {
                if (author !== authors[i]) continue;
                return dates.from <= postDate && postDate <= dates.before ;
            }
        });

        this.postsByAuthor.emit(posts);

        // const data = {
        //     date_after: dates.from,
        //     date_before: dates.before,
        //     author: author
        // }
        // this.searchService
        //     .advancedSearch(this.name, this.repo, data)
        //     .then(res => this.postsByAuthor.emit(res))
        //     .catch(error => this.toastService.showError(error));
    }

    checkDates(from: Date, before: Date): void {
        let dates = this.convertDates(from, before);

        if (dates.from > dates.before) {
            this.invalidTimeInterval = true;
            this.toastService.showWarning('TOAST.SEARCH.invalidTimeInterval');
        } else {
            this.invalidTimeInterval = false;
        }
    }

    clear(): void {
        this.fromDate = this.minDate;
        this.beforeDate = this.maxDate;
        this.selectedAuthor = this.uniqueAuthors.length > 1 ? null : this.selectedAuthor;
        this.invalidTimeInterval = false;
        this.postsByAuthor.emit(null);
    }

    private getPosts(): void {
        this.postService
            .getPosts(this.name, this.repo)
            .then(res => {
                this.allPosts = res.items;
                this.setDates(this.allPosts);
                this.getUniqueAuthors(res.items)
                    .forEach(item => this.buildDropdown(item));
            })
            .catch(error => this.toastService.showError(error));
    }

    private getUniqueAuthors(posts: Post[]): string[] {
        let obj: any = {};
        let authors: string[] = [];

        posts.forEach(post =>
            post.author.split(',').forEach(author =>
                authors.push(author.trim())));

        authors.forEach(author => obj[author] = true);
        return this.uniqueAuthors = Object.keys(obj);
    }

    private getPostAuthors(post: Post): string[] {
        let authors: string[] = [];

        post.author.split(',').forEach(auhtor =>
            authors.push(auhtor.trim()));

        return authors;
    }

    private buildDropdown(author: string): void {
        this.authors.push({
            label: author,
            value: { name: author }
        });

        if (this.uniqueAuthors.length === 1) {
            this.selectedAuthor = this.uniqueAuthors[0];
        }
    }

    private setDates(posts: Post[]): void {
        let dates: number[] = [];
        posts.forEach(item => dates.push(+new Date(item.date)));

        this.minDate = new Date(Math.min.apply(null, dates));
        this.minDate.setHours(0, 0, 0);
        this.maxDate = new Date();

        this.fromDate = this.minDate;
        this.beforeDate = this.maxDate;

        this.checkBlogAge();
    }

    private checkBlogAge(): void {
        let oneDayBlog = this.minDate.getFullYear() === this.maxDate.getFullYear()
                      && this.minDate.getMonth() === this.maxDate.getMonth()
                      && this.minDate.getDate() === this.maxDate.getDate();

        if (oneDayBlog) this.oneDayBlog = true;
    }

    private convertDates(from: Date, before: Date): any {
        let day = 86399;
        before.setHours(0, 0, 0);

        return {
            from: +new Date(from) / 1000,
            before: +new Date(before) / 1000 + day
        };
    }

    private localizeCalendar(lang: string): void {
        this.calendar = {
            firstDayOfWeek: lang === 'en' ? 0 : 1
        }
        this.translate
            .get('SEARCH.CALENDAR')
            .subscribe(res => {
                this.calendar.dayNamesMin = res.dayNamesMin;
                this.calendar.monthNames = res.monthNames;
        });
    }

    private onLangChange(lang: string): void {
        this.authors = [];
        this.fromDate = null;
        this.beforeDate = null;

        this.uniqueAuthors.forEach(author => this.buildDropdown(author));
        this.localizeCalendar(lang);
        setTimeout(() => {
            this.fromDate = this.minDate;
            this.beforeDate = this.maxDate;
        }, 0);
    }

    private loadAdvanced(): void {
        this.getPosts();
        this.localizeCalendar(this.lang);
    }

}
