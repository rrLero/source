import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
}                                   from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';

import { HttpService, UserService } from '../../services/index';

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
    popupText = 'deleting blog...';
    githubUrl = `https://github.com/`;
    name: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private httpService: HttpService,
                private userService: UserService) {
    };


    ngOnInit() {
        this.user = this.userService.getUser();
        this.route.params.forEach(param => {
            this.name = param.name;
        });
        this.getBlogs();
    }

    getBlogs() {
        this.httpService
            .getBlogs()
            .then(blogs => this.blogs = blogs);
    }

    createBlog(name, repo) {
        this.router.navigate([`${name}/${repo.value}`]);
    }

    updateBlog(repo) {
        this.httpService.updateBlog(this.name, repo)
            .subscribe(() => alert('done'));
    }

    deleteBlog(name, repo, index) {
        this.hidden = false;
        if (confirm('Remove blog?')) {
            if (confirm('Are you sure?')) {
                this.httpService
                    .deleteBlog(name, repo)
                    .then(() => {
                        this.blogs.splice(index, 1);
                        this.popupText = 'done!';
                        setTimeout(() => this.hidden = true, 1500);
                    });
            } else {
                this.hidden = true;
            }
        } else {
            this.hidden = true;
        }
    }
}
