import {
    Component,
    OnInit
}                                 from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { BlogService } from '../../shared/blog.service';
import { Post }        from '../../shared/post.model';

@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
    post: Post;
    constructor(
        private heroService: BlogService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.heroService.getPost(+params['id']))
            .subscribe(post => this.post = post);
    }
    goBack(): void {
        this.location.back();
    }
}
