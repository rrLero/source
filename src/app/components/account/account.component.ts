import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HttpService, UserService, ToastService }     from '../../services';

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
    name: string;
    blogs: any[];
    hidden = true;
    update = false;
    confirm = true;
    noUser = true;
    noBlogs = true;
    deletedBlog: any = {};
    popupText = 'Remove blog?';
    githubUrl = `https://github.com/`;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private httpService: HttpService,
                private userService: UserService,
                public toastService: ToastService) { }

    ngOnInit(): void {
        this.user = this.userService.getUser();
        this.getName();
    }

    getName(): void {
        this.route.params.forEach(param => {
            this.name = param.name;
            this.getBlogs();
        });
    }
    getBlogs(): void {
        this.httpService
            .getBlogs()
            .then(blogs => {
                this.blogs = blogs;
                this.checkUser();
            })
            .catch(error => this.toastService.showError(error));
    }
    checkUser() {
        if (this.user && this.user.login.toLowerCase() === this.name.toLowerCase()) {
            this.noUser = false;
            this.checkBlogs(this.blogs);
        } else {
            this.checkBlogs(this.blogs);
        }
    }
    checkBlogs(blogs: any[]): void {
        blogs.forEach(item => {
            if (item.name === this.name.toLowerCase()) {
                this.noUser = false;
                this.noBlogs = false;
            }
        });
    }
    createBlog(name: string, repoEl: HTMLInputElement): void {
        if (repoEl.value) {
            let blog = repoEl.value.replace(/\s+/g, '-');
            this.toastService.showInfo('Activating blog...');
            this.httpService
                .createBlog(name, blog)
                .then(() => {
                    this.toastService.showSuccess('Done! You will be redirect to your blog');
                    setTimeout(() => this.router.navigate([`${name}/${blog}`]), 3000);
                })
                .catch(error => this.toastService.showError(error));
        } else {
            this.toastService.showWarning('Set blog name');
        }
    }
    updateBlog(repo: string): void {
        this.toastService.showInfo('Updating...');
        this.httpService
            .updateBlog(this.name, repo)
            .subscribe(
                () => this.toastService.showSuccess('Done!'),
                error => this.toastService.showError(error));
    }
    prepareDelete(name: string, repo: string, index: number): void {
        this.hidden = false;
        this.deletedBlog.name = name;
        this.deletedBlog.repo = repo;
        this.deletedBlog.index = index;
    }
    deleteBlog(name: string, repo: string, index: number): void {
        this.toastService.showInfo('Deleting...');
        this.httpService
            .deleteBlog(name, repo)
            .then(() =>
                this.httpService.updateBlog(name, repo)
                    .subscribe(
                        () => {
                            this.blogs.splice(index, 1);
                            this.toastService.showSuccess('Done!');
                        },
                        error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }
    popupHandler(confirm: boolean): void {
        if (confirm) {
            this.hidden = true;
            this.deleteBlog(this.deletedBlog.name, this.deletedBlog.repo, this.deletedBlog.index);
        } else {
            this.hidden = true;
        }
    }
    toggleUpdateBtns(): void {
        this.update = !this.update;
    }
}
