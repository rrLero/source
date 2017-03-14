import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService }            from '../../services/index';
import { Post }                   from '../../shared/post.model';
import { AuthService }            from '../../services/index';


@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
    post: Post;
    hidden = true;
    popupText = 'deleted...';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    canEdit = false;
    url = `/${this.name}/${this.repo}/post/${this.title}`;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private httpService: HttpService,
        public authService: AuthService) {
    }

    ngOnInit(): void {
        this.getPost();
        if (this.authService.isLogged) {
            this.authService.getProfile().subscribe(() => {
                let login = this.authService.loggedUser.login;
                this.authService
                    .getPermission(this.name, this.repo, login)
                    .then(({ access }) => this.canEdit = access);
            });
        }
    }
    getPost() {
        this.route.params
        .switchMap(({ name, repo, title }) =>
            this.httpService.getPost(name, repo, title))
            .subscribe(post => this.post = post);
    }
    delete() {
        this.hidden = false;
        if (confirm('delete post?')) {
            this.httpService
            .delete(this.name, this.repo, this.post.id, this.post.sha)
            .then(() =>
                this.httpService.updateBlog(this.name, this.repo)
                .subscribe(() => {
                    this.popupText = 'done!';
                    setTimeout(() => this.hidden = true, 1500);
                    setTimeout(() => this.router.navigate([`/${this.name}/${this.repo}`]), 1800);
                })
            );
        } else {
            this.hidden = true;
        }
    }
    goBack(): void {
        let loadPage = localStorage.getItem('page') ? localStorage.getItem('page') : '1';
        this.router.navigate([`/${this.name}/${this.repo}/page/${loadPage}`]);
        localStorage.removeItem('page');
        // this.location.back();
    }
}
