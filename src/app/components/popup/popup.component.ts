import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'popup',
    templateUrl: 'popup.component.html',
    styleUrls: ['popup.component.scss']
})
export class PopupComponent {
    @Input() hidden: boolean;
    @Input() confirm: boolean;
    @Input() popupText: string;
    @Input() popupComments: string;
    @Output() answer = new EventEmitter();

    remove() {
        this.answer.emit(true);
    }
    cancel() {
        this.answer.emit(false);
    }
}
