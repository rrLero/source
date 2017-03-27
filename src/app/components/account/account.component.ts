import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HttpService, UserService, ToastService } from '../../services/index';

@Component({
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.scss'],
    animations: [
        trigger('account', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(300)
            ]),
            transition('* => void', [
                animate(200, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class AccountComponent implements OnInit {
    user: any;
    blogs: any[];
    hidden = true;
    update = false;
    confirm = true;
    noUser = true;
    deletedBlog: any = {};
    popupText = 'Remove blog?';
    githubUrl = `https://github.com/`;
    name: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                public toastService: ToastService,
                private httpService: HttpService,
                private userService: UserService) {
    };

    ngOnInit() {
        this.user = this.userService.getUser();
        this.route.params.forEach(param => {
            this.name = param.name;
            this.getBlogs();
        });
    }

    getBlogs() {
        this.httpService
            .getBlogs()
            .then(blogs => {
                this.blogs = blogs;
                if (this.user && this.user.login.toLowerCase() === this.name) {
                    this.noUser = false;
                } else {
                    this.blogs.forEach(item => {
                        if (item.name === this.name.toLowerCase()) {
                            this.noUser = false;
                        }
                    });
                }
            });
    }

    createBlog(name, repo) {
        this.toastService.showInfo('Activating blog...');
        this.httpService
            .createBlog(name, repo.value)
            .then(() => {
                this.toastService.showSuccess('Done! You will be redirect to your blog');
                setTimeout(() => this.router.navigate([`${name}/${repo.value}`]), 2000);
            });
    }

    updateBlog(repo) {
        this.toastService.showInfo('Updating...');
        this.httpService
            .updateBlog(this.name, repo)
            .subscribe(() => this.toastService.showSuccess('Done!'));
    }
    prepareDelete(name, repo, index) {
        this.hidden = false;
        this.deletedBlog.name = name;
        this.deletedBlog.repo = repo;
        this.deletedBlog.index = index;
    }
    deleteBlog(name, repo, index) {
        // this.popupText = 'Deleting...';
        this.toastService.showInfo('Deleting...');
        this.httpService
            .deleteBlog(name, repo)
            .then(() =>
                this.httpService.updateBlog(name, repo)
                    .subscribe(() => {
                        this.blogs.splice(index, 1);
                        this.toastService.showSuccess('Done!');
                        // this.popupText = 'Done!';
                        // setTimeout(() => this.hidden = true, 1500);
                    }));
    }
    popupHandler(confirm) {
        if (confirm) {
            this.hidden = true;
            this.deleteBlog(this.deletedBlog.name, this.deletedBlog.repo, this.deletedBlog.index);
        } else {
            this.hidden = true;
        }
    }
    toggleUpdateBtns() {
        this.update = !this.update;
    }
}
