import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';
import { Location }               from '@angular/common';

import { HttpService }       from '../../services/index';
import { Post, post, FullMd, fullMd } from '../../shared/post.model';

@Component({
    templateUrl: 'create-post.component.html'
})
export class CreatePostComponent implements OnInit {
    date = new Date();
    today: string;
    datetime: string;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}`;
    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private httpService: HttpService) { }

    ngOnInit() {
        this.today = `${this.date.toISOString()}`.slice(2).slice(0, 8);
        let time = `${this.date.toString()}`.slice(15).slice(0, 6);
        this.datetime = this.today + time;
    }
    goBack() {
        this.location.back();
    }
    repalceSpace(filenameEl) {
        filenameEl.value = filenameEl.value.replace(/\s+/g, '-');
    }
    create(filenameEl, titleEl, tagsEl, textEl) {
        new FullMd(
            titleEl.value,
            tagsEl.value,
            this.name,
            this.datetime,
            textEl.value
        );
        console.log(fullMd);
        new Post(
            filenameEl.value,
            // this.name,
            // this.datetime,
            // tagsEl.value.split(','),
            // titleEl.value,
            fullMd.trim()
        );
    }
    push(filenameEl, titleEl, tagsEl, textEl) {
        this.create(filenameEl, titleEl, tagsEl, textEl);
        this.httpService.create(this.name, this.repo, post);
        this.router.navigate([this.url]);
            // .then(post => {
            // });
    }
}
