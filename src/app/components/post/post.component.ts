import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Location }          from '@angular/common';

import { HttpService }       from '../../services/index';
import { Post }              from '../../shared/post.model';

@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
    post: Post;
    hidden = true;
    popup = false;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}/post/`;
    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private httpService: HttpService) { }

    ngOnInit(): void {
        this.route.params
            .switchMap(({ name, repo, title }) =>
                this.httpService.getPost(name, repo, title))
            .subscribe(post => this.post = post);
    }
    goBack(): void {
        this.location.back();
    }
    edit(): void {
        if (this.hidden) {
            localStorage.setItem('backup', this.post.text_full_strings);
        } else {
            localStorage.removeItem('backup');
        }
        this.hidden = !this.hidden;
    }
    save(text): void {
        this.post.text_full_strings = text.updatedValue;
        this.httpService.update(this.name, this.repo, this.post);
        this.popup = true;
    }
    cancel(text): void {
        let backup = localStorage.getItem('backup');
        text.setValue(backup);
    }
    delete(): void {
        this.httpService.delete(this.name, this.repo, this.post.title);
    }
}
