import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
    BlogService,
    DraftService,
    UserService,
    ToastService
}                 from '../../services';
import { fadeIn } from '../../animations';

@Component({
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.scss'],
    animations: [fadeIn]
})
export class AccountComponent implements OnInit {
    user: any;
    name: string;
    blogs: any[];
    hidden = true;
    hiddenUpdates = false;
    hiddenControls = false;
    confirm = true;
    noUser = true;
    deletedBlog: any = {};
    popupText = 'POPUP.removeBlog';
    githubUrl = `https://github.com/`;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private blogService: BlogService,
                private draftService: DraftService,
                private userService: UserService,
                private toastService: ToastService) { }

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
        this.blogService
            .getBlogs()
            .then(blogs => {
                this.blogs = blogs.filter(item => item.name === this.name.toLowerCase());
                this.checkUser(blogs);
            })
            .catch(error => this.toastService.showError(error));
    }

    checkUser(blogs: any[]): void {
        if (this.user && this.user.login.toLowerCase() === this.name.toLowerCase()) {
            this.noUser = false;
        } else {
            blogs.forEach(item => {
                if (item.name === this.name.toLowerCase()) {
                    this.noUser = false;
                }
            });
        }
    }

    createBlog(name: string, repoEl: HTMLInputElement): void {
        let blog = repoEl.value.replace(/\s+/g, '-');
        this.toastService.showInfo('TOAST.ACCOUNT.activatingBlog');
        this.blogService
            .createBlog(name, blog)
            .then(() => {
                this.toastService.showSuccess('TOAST.ACCOUNT.done');
                this.blogs.push({ name: name.toLowerCase(), repo: blog });
                repoEl.value = null;
            })
            .catch(error => this.toastService.showError(error));
    }

    updateBlog(repo: string): void {
        this.toastService.showInfo('TOAST.ACCOUNT.updating');
        this.blogService
            .updateBlog(this.name, repo)
            .then(() => this.toastService.showSuccess('TOAST.ACCOUNT.done'))
            .catch(error => this.toastService.showError(error));
    }

    updateDraft(repo: string): void {
        this.toastService.showInfo('TOAST.ACCOUNT.updating');
        this.draftService
            .updateBlog(this.name, repo)
            .then(() => this.toastService.showSuccess('TOAST.ACCOUNT.done'))
            .catch(error => this.toastService.showError(error));
    }

    prepareDelete(name: string, repo: string, index: number): void {
        this.hidden = false;
        this.deletedBlog.name = name;
        this.deletedBlog.repo = repo;
        this.deletedBlog.index = index;
    }

    deleteBlog(name: string, repo: string, index: number): void {
        this.toastService.showInfo('TOAST.ACCOUNT.deleting');
        this.blogService
            .deleteBlog(name, repo)
            .then(() => {
                this.blogs.splice(index, 1);
                this.toastService.showSuccess('TOAST.ACCOUNT.done');
            })
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
        this.hiddenUpdates = !this.hiddenUpdates;
        this.hiddenControls = false;
    }

    toggleControlBtns(): void {
        this.hiddenControls = !this.hiddenControls;
        this.hiddenUpdates = false;
    }

}
