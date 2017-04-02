import { Component, OnInit }                          from '@angular/core';
import { Router, ActivatedRoute }                     from '@angular/router';
import { Location }                                   from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HttpService, DraftService, ToastService }    from '../../services';
import { Post, post, FullMd, fullMd }                 from '../../shared/post.model';

@Component({
    templateUrl: 'edit-post.component.html',
    styleUrls: ['edit-post.component.scss'],
    animations: [
        trigger('edit', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(300, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class EditPostComponent implements OnInit {
    post: Post;
    draft = false;
    name = this.route.snapshot.params['name'];
    repo = this.route.snapshot.params['repo'];
    title = this.route.snapshot.params['title'];
    url = `/${this.name}/${this.repo}/post/${this.title}`;
    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private draftService: DraftService,
        private httpService: HttpService,
        public toastService: ToastService) { }

    ngOnInit(): void {
        this.checkPath();
        this.draft ? this.getDraft() : this.getPost();
    }
    checkPath(): void {
        let path = this.location.path().split('/');
        path.forEach(item => {
            if (item === 'drafts') {
                this.draft = true;
            }
        });
    }
    getPost(): void {
        this.route.params
            .switchMap(({ name, repo, title }) =>
                this.httpService
                    .getPost(name, repo, title))
                    .subscribe(
                        post => this.post = post,
                        error => this.toastService.showError(error));
    }
    getDraft(): void {
        this.route.params
            .switchMap(({ name, repo, title }) =>
                this.draftService
                    .getDraft(name, repo, title))
                    .subscribe(
                        post => this.post = post,
                        error => this.toastService.showError(error));
    }
    save(titleEl, tagsEl, previewEl, textEl): void {
        this.post.title = titleEl.value;
        this.post.tags = tagsEl.value.split(',');
        this.post.preview = previewEl.value;
        this.post.text_full_strings = textEl.value;
        this.toastService.showInfo('In process...');
        this.buildFullMd();
        this.draft ? this.updateDraft() : this.update();
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
        this.httpService
            .update(
                this.name,
                this.repo,
                this.post.id,
                this.post.sha,
                this.post)
            .then(() =>
                this.httpService
                    .updateBlog(this.name, this.repo)
                    .subscribe(
                        () => {
                            this.toastService.showSuccess('Done!');
                            setTimeout(() => this.goBack(), this.toastService.life());
                        },
                        error => this.toastService.showError(error)))
            .catch(error => this.toastService.showError(error));
    }
    updateDraft(): void {
        this.draftService
            .update(
                this.name,
                this.repo,
                this.post.id,
                this.post)
            .then(() => {
                this.toastService.showSuccess('Done!');
                setTimeout(() => this.goBack(), this.toastService.life());
            })
            .catch(error => this.toastService.showError(error));
    }
    create(titleEl, tagsEl, prevEl, textEl): void {
        new FullMd(
            titleEl.value,
            tagsEl.value,
            this.post.author,
            this.post.date,
            prevEl.value,
            textEl.value
        );
        new Post(
            this.post.id.slice(20),
            fullMd.trim()
        );
    }
    moveToDrafts(titleEl, tagsEl, prevEl, textEl): void {
        this.create(titleEl, tagsEl, prevEl, textEl);
        this.toastService.showInfo('Moving...');
        this.draftService
            .create(this.name, this.repo, post)
            .then(() => {
                this.httpService
                    .delete(this.name, this.repo, this.post.id, this.post.sha)
                    .then(() =>
                        this.httpService
                            .updateBlog(this.name, this.repo)
                            .subscribe(
                                () => {
                                    this.toastService.showSuccess('Done!');
                                    setTimeout(() => this.router.navigate([this.name, this.repo, 'drafts']), this.toastService.life());
                                },
                                error => this.toastService.showError(error)))
                    .catch(error => this.toastService.showError(error));
            })
            .catch(error => this.toastService.showError(error));
    }
    cancel(titleEl, tagsEl, textEl, previewEl): void {
        titleEl.value = this.post.title;
        tagsEl.value = this.post.tags;
        previewEl.setValue(this.post.preview);
        textEl.setValue(this.post.text_full_strings.trim());
    }
    goBack(): void {
        this.location.back();
    }
}
