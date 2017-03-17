// import { Component, OnInit }      from '@angular/core';
import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
}                                 from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { HttpService, AuthService } from '../../services/index';
import { UserService } from "../../services/user.service";

@Component({
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss'],
    animations: [
        trigger('posts', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(0, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class PostsComponent implements OnInit {
    hidden = true;
    popupText = 'deleting...';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    id = this.route.snapshot.params['id'];
    url = `/${this.name}/${this.repo}/`;
    owner: string;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private httpService: HttpService,
        public authService: AuthService,
        private userService: UserService) { };

    ngOnInit() {
        this.router.navigate([`${this.name}/${this.repo}/page/${this.id || 1}`]);
        this.owner = this.userService.getUser().login;
    }
    savePage() {
        let page = this.location.path().split('/')[4];
        localStorage.setItem('page', page);
    }

    deleteBlog() {
        this.hidden = false;
        if (confirm('Remove blog?')) {
            this.httpService
                .deleteBlog(this.name, this.repo)
                .then(() => {
                    this.popupText = 'done!';
                    setTimeout(() => this.hidden = true, 1500);
                    setTimeout(() => this.router.navigate(['/']), 1800);
                });
        } else {
            this.hidden = true;
        }
    }
}
