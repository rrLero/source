import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }               from '@angular/common';

import { HttpService }            from '../../services/index';
import { Post, FullMd, fullMd }   from '../../shared/post.model';

@Component({
    templateUrl: 'edit-post.component.html',
    styleUrls: ['edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
    post: Post;
    hidden = true;
    popupText = 'Updating...';
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    url = `/${this.name}/${this.repo}/post/${this.title}`;
    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private httpService: HttpService) { }

    ngOnInit(): void {
        this.getPost();
    }
    getPost() {
        this.route.params
        .switchMap(({ name, repo, title }) =>
            this.httpService.getPost(name, repo, title))
            .subscribe(post => this.post = post);
    }
    save(titleEl, tagsEl, previewEl, textEl): void {
        this.post.title = titleEl.value;
        this.post.tags = tagsEl.value.split(',');
        this.post.preview = previewEl.value;
        this.post.text_full_strings = textEl.value;
        this.hidden = !this.hidden;
        this.buildFullMd();
        this.update();
    }
    buildFullMd(): void {
        new FullMd(
            this.post.title,
            this.post.tags.join(', '),
            this.post.author,
            this.post.date,
            this.post.preview,
            this.post.text_full_strings
        );
        this.post.text_full_md = fullMd.trim();
    }
    update(): void {
        this.httpService.update(
            this.name,
            this.repo,
            this.post.id,
            this.post.sha,
            this.post)
            .then(() =>
                this.httpService.updateBlog(this.name, this.repo)
                .subscribe(() => {
                    this.popupText = 'Done!';
                    setTimeout(() => this.hidden = true, 1500);
                    setTimeout(() => this.goBack(), 1800);
                })
            );
    }
    cancel(titleEl, tagsEl, textEl, previewEl): void {
        titleEl.value = this.post.title;
        tagsEl.value = this.post.tags;
        previewEl.setValue(this.post.preview);
        textEl.setValue(this.post.text_full_strings.trim());
    }
    goBack(): void {
        this.router.navigate([this.url]);
        // this.location.back();
    }
}
