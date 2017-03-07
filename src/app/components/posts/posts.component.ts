import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss']
})
export class PostsComponent implements OnInit {
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    url = `/${this.name}/${this.repo}/post/`;
    constructor(
        private router: Router,
        private route: ActivatedRoute) { };
    ngOnInit() {
        this.router.navigate([`${this.name}/${this.repo}/page/1`]);
    }
}
