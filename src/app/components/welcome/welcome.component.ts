import { Component, OnInit }                          from '@angular/core';
import { Router }                                     from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HttpService, BlogService, UserService, ToastService } from '../../services';

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.scss'],
    animations: [
        trigger('welcome', [
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
export class WelcomeComponent implements OnInit {
    blogs: string[];

    constructor(private router: Router,
                public toastService: ToastService,
                private blogService: BlogService,
                private httpService: HttpService) { }

    ngOnInit() {
        this.getBlogs();
        // this.getSubscribe();
    }

    getBlogs() {
        this.httpService
            .getBlogs()
            .then(blogs => {
                this.blogs = blogs;
                console.log(this.blogs);
            })
            .catch(error => this.toastService.showError(error));
    }

    // getBlogId(name: string, repo: string): void {
    //     this.blogService
    //         .getBlogId(name, repo)
    //         .then(res =>
    //             this.blogService
    //                 .subscribeBlog(name, repo, res.id))
    //                 .then(res => this.toastService.showSuccess('done'))
    //                 .catch(error => this.toastService.showError(error))
    //         .catch(error => this.toastService.showError(error));
    // }
    //
    // getSubscribe() {
    //     this.blogService
    //         .getSubscribe('acid-base', 'test')
    //         .then(res => console.log(res))
    // }
}
