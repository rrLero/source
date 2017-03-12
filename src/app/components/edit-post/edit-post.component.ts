import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { HttpService }            from '../../services/index';
import { Post, FullMd, fullMd }   from '../../shared/post.model';

@Component({
    templateUrl: 'edit-post.component.html',
    styleUrls: ['edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
    post: Post;
    hidden = true;
    popupText = 'upload...';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    url = `/${this.name}/${this.repo}/post/${this.title}`;
    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private httpService: HttpService) { }

    ngOnInit(): void {
        this.route.params
            .switchMap(({ name, repo, title }) =>
                this.httpService.getPost(name, repo, title))
                .subscribe(post => {
                    this.post = post;
                    localStorage.setItem('title', this.post.title);
                    localStorage.setItem('tags', JSON.stringify(this.post.tags));
                    localStorage.setItem('text', this.post.text_full_strings);
                });
    }
    goBack(): void {
        this.clearLocalStorage();
        this.router.navigate([this.url]);
        // this.location.back();
    }
    save(title, tags, text, popup): void {
        event.preventDefault();
        this.post.title = title.value;
        this.post.tags = tags.value.split(',');
        this.post.text_full_strings = text.value;
        this.hidden = !this.hidden;
        this.buildFullMd();
        this.update();
    }
    buildFullMd(): void {
        new FullMd(
            this.post.title,
            this.post.tags.join(', '),
            this.post.author,
            this.post.date,
            this.post.text_full_strings
        );
        this.post.text_full_md = fullMd.trim();
    }
    update(): void {
        this.httpService.update(
            this.name,
            this.repo,
            this.post.id,
            this.post.sha,
            this.post)
            .then(() => {
                this.popupText = 'done!';
                setTimeout(() => this.hidden = true, 1500);
                setTimeout(() => this.goBack(), 1800);
            });
    }
    cancel(textEl): void {
        let title = localStorage.getItem('title');
        let tags = JSON.parse(localStorage.getItem('tags'));
        let text = localStorage.getItem('text');
        this.post.title = title;
        this.post.tags = tags;
        textEl.setValue(text.trim());
    }
    clearLocalStorage() {
        localStorage.removeItem('title');
        localStorage.removeItem('tags');
        localStorage.removeItem('text');
    }
}
