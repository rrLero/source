import { Component, OnInit }          from '@angular/core';
import { Router, ActivatedRoute }     from '@angular/router';
import { Location }                   from '@angular/common';

import { HttpService, AuthService }   from '../../services/index';
import { Post, post, FullMd, fullMd } from '../../shared/post.model';
import { UserService } from "../../services/user.service";

@Component({
    templateUrl: 'create-post.component.html',
    styleUrls: ['create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
    date = new Date();
    author: string;
    datetime: string;
    hidden = true;
    popupText = 'creating...';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}`;
    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private authService: AuthService,
        private userService: UserService,
        private httpService: HttpService) { }

    ngOnInit() {
        let date = `${this.date.toISOString()}`.slice(2).slice(0, 8);
        let time = `${this.date.toString()}`.slice(15).slice(0, 6);
        this.datetime = date + time;
        if (this.authService.isLogged) {
            const profile = this.userService.getUser();
            this.author = profile.name || profile.login;
        }
    }
    goBack() {
        this.location.back();
    }
    repalceSpace(filenameEl) {
        if (filenameEl.value) {
            filenameEl.value = filenameEl.value.replace(/\s+/g, '-');
        }
    }
    create(filenameEl, titleEl, tagsEl, prevEl, textEl) {
        new FullMd(
            titleEl.value,
            tagsEl.value,
            this.author,
            this.datetime,
            prevEl.value,
            textEl.value
        );
        new Post(
            filenameEl.value,
            fullMd.trim()
        );
    }
    push(filenameEl, titleEl, tagsEl, prevEl, textEl) {
        this.create(filenameEl, titleEl, tagsEl, prevEl, textEl);
        this.hidden = false;
        this.httpService.create(this.name, this.repo, post)
        .then(() =>
            this.httpService.updateBlog(this.name, this.repo)
            .subscribe(() => {
                this.popupText = 'done!';
                setTimeout(() => this.hidden = true, 1500);
                setTimeout(() => this.router.navigate([this.url]), 1800);
            })
        );
    }
}
