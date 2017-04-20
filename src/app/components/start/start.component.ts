import { Component, OnInit }                          from '@angular/core';
import { Router }                                     from '@angular/router';
import { Location }                                   from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { UserService, HttpService, ToastService }     from '../../services';

const faq = {
    capabilities: false,
    friends: false,
    problems: false,
    github: false,
    comments: false
};

@Component({
    selector: 'start',
    templateUrl: 'start.component.html',
    styleUrls: ['start.component.scss'],
    animations: [
        trigger('start', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(100, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class StartComponent implements OnInit {
    user: any;
    faq: any = faq;

    constructor(private router: Router,
                private location: Location,
                private httpService: HttpService,
                private userService: UserService,
                public toastService: ToastService) { }

    ngOnInit() {
        this.user = this.userService.getUser();
    }

    createBlog(repo) {
        let blog = repo.value.replace(/\s+/g, '-');
        this.toastService.showInfo('Activating blog...');
        this.httpService
            .createBlog(this.user.login, blog)
            .then(() => {
                this.toastService.showSuccess('Done! You will be redirect to your profile');
                setTimeout(() => this.router.navigate([`${this.user.login}`]), this.toastService.life());
            })
            .catch(error => this.toastService.showError(error));
    }

    savePath() {
        localStorage.setItem('path', this.location.path());
    }
}
