import { Component, Input, Output, EventEmitter }     from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'popup',
    templateUrl: 'popup.component.html',
    styleUrls: ['popup.component.scss'],
    animations: [
        trigger('popup', [
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
export class PopupComponent {
    @Input() text: string;
    @Input() hidden: boolean;
    @Output() answer = new EventEmitter();

    remove() {
        this.answer.emit(true);
    }
    cancel() {
        this.answer.emit(false);
    }
}
