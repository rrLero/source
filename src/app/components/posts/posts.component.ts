import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService }            from '../../services/index';
import { Template, template }              from '../../shared/post.model';

@Component({
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss']
})
export class PostsComponent implements OnInit {
    date = new Date();
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    id = this.route.snapshot.params['id'];
    url = `/${this.name}/${this.repo}/post/`;
    hidden = true;
    template: string;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private httpService: HttpService) { };
    ngOnInit() {
        this.router.navigate([`${this.name}/${this.repo}/page/${this.id || 1}`]);
    }
    create() {
        let date = `${this.date.toISOString()}`.slice(2).slice(0, 8);
        let time = `${this.date.toString()}`.slice(15).slice(0, 6);
        let setDate = date + time;
        let empty = '';
        let emptyArr = [];
        new Template(
            empty,
            emptyArr,
            this.name,
            setDate,
        );
        this.template = template;
        this.hidden = !this.hidden;
    }
    push(text) {
        console.log(text.value);
        // name = name.trim();
        // if (!name) { return; }
        // this.httpService.create(name)
        //     .then(hero => {
        //         this.heroes.push(hero);
        //         this.selectedHero = null;
        //     });
    }
}
