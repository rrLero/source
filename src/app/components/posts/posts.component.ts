import { Component, OnInit } from '@angular/core';
import { Location }            from '@angular/common';

@Component({
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss']
})
export class PostsComponent implements OnInit {
    path = this.location.path().split('/');
    name = this.path[1];
    repo = this.path[2];
    url = `/${this.name}/${this.repo}/post/`;
    constructor(private location: Location) { };
    ngOnInit() {
        console.log(this.path);
     }

}
