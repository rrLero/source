import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate
}                 from '@angular/core';
import { Router } from '@angular/router';

const faq = {
    friends: false,
    github: false,
    comments: false
};

@Component({
    selector: 'start',
    templateUrl: 'start.component.html',
    styleUrls: ['start.component.scss'],
    animations: [
        trigger('start', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(100, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class StartComponent {
    faq: any = faq;
    constructor(private router: Router) { }

    go(name, repo) {
        this.router.navigate([`${name}/${repo.value}`]);
    }
}
