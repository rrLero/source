import {
    Component,
    OnInit,
    trigger,
    state,
    style,
    transition,
    animate
}                 from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/index';

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
export class StartComponent implements OnInit {
    faq: any = faq;
    user: any;
    constructor(private router: Router,
                private userService: UserService) { }

    ngOnInit() {
        this.user = this.userService.getUser();
    }

    go(name, repo) {
        this.router.navigate([`${name}/${repo.value}`]);
    }
}
