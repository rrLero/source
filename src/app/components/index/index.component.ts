import {
    Component,
    OnInit
}                 from '@angular/core';
// import { Router } from '@angular/router';

import { BlogService } from '../../shared/blog.service';
import { Post }        from '../../shared/post.model';

@Component({
    selector: 'index',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.scss']
})
export class IndexComponent implements OnInit {
    posts: Post[];

    constructor(private blogService: BlogService) {};
    ngOnInit() {
        this.getPosts();
    }
    getPosts(): void {
        this.blogService.getPosts().then(posts => this.posts = posts.reverse());
    }
}
