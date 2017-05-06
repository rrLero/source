import { Component, Input, Output, EventEmitter } from '@angular/core';
import { fadeIn }                                 from '../../../../animations';

@Component({
    selector: 'popup',
    templateUrl: 'popup.component.html',
    styleUrls: ['popup.component.scss'],
    animations: [fadeIn]
})
export class PopupComponent {
    @Input() text: string;
    @Input() hidden: boolean;
    @Output() answer = new EventEmitter();

    // constructor() {
    //     console.log(this.text);
    // }

    remove() {
        this.answer.emit(true);
    }

    cancel() {
        this.answer.emit(false);
    }
}
