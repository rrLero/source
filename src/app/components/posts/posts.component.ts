import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { Location }                                   from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HttpService, UserService } from '../../services/index';

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
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    id = this.route.snapshot.params['id'];
    url = `/${this.name}/${this.repo}/`;
    canEdit = false;
    user: any;
    constructor(private router: Router,
                private location: Location,
                private route: ActivatedRoute,
                private httpService: HttpService,
                private userService: UserService) { };

    ngOnInit() {
        this.user = this.userService.getUser();
        if (this.user) {
            this.userService
                .getPermission(this.name, this.repo, this.user.login)
                .then(res => this.canEdit = res.access);
        }
    }
    savePage() {
        let page = this.location.path().split('/')[4];
        localStorage.setItem('page', page);
    }
}
