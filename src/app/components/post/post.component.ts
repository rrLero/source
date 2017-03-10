import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';

import { HttpService }       from '../../services/index';
import { Post, UpdatedPost, updatedPost }              from '../../shared/post.model';

@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
    post: Post;
    hidden = true;
    popup = false;
    popupText = 'upload...';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}/post/`;
    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private httpService: HttpService) { }

    ngOnInit(): void {
        let test = parseFloat(this.location.path().split('/')[4].slice(0, 4));
        if (test) {
            this.route.params
            .switchMap(({ name, repo, title }) =>
                this.httpService.getPost(name, repo, title))
                .subscribe(post => this.post = post);
        } else {
            this.route.params
            .switchMap(({ name, repo, title }) =>
                this.httpService.getPostByTitle(name, repo, title))
                .subscribe(post => this.post = post);
        }
    }
    goBack(): void {
        this.location.back();
    }
    edit(): void {
        if (this.hidden) {
            localStorage.setItem('title', this.post.title);
            localStorage.setItem('tags', JSON.stringify(this.post.tags));
            localStorage.setItem('text', this.post.text_full_strings);
        } else {
            this.clearLocalStorage();
        }
        this.hidden = !this.hidden;
    }
    save(title, tags, text, popup): void {
        this.post.title = title.value;
        this.post.tags = tags.value.split(',');
        this.post.text_full_strings = text.value;
        this.hidden = !this.hidden;
        this.popup = true;
        this.buildFullMd();
        this.update();
        this.clearLocalStorage();
    }
    buildFullMd(): void {
        new UpdatedPost(
            this.post.title,
            this.post.tags,
            this.post.author,
            this.post.date,
            this.post.text_full_strings
        );
        this.post.text_full_md = updatedPost.trim();
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
                setTimeout(() => this.popup = false, 1500);
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
    // delete(): void {
    //     this.httpService.delete(this.name, this.repo, this.post.title);
    // }
}
