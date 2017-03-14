import { Component, Input } from '@angular/core';

@Component({
    selector: 'popup',
    templateUrl: 'popup.component.html',
    styleUrls: ['popup.component.scss']
})
export class PopupComponent {
    @Input() hidden: boolean;
    @Input() popupText: string;
}
