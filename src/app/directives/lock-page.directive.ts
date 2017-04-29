import { Directive, ElementRef, EventEmitter } from '@angular/core';
import { ToastService }                        from '../services';

@Directive({
    selector: '[lockPage]'
})
export class LockPageDirective {
    public el: HTMLElement;

    constructor(private toastService: ToastService,
                public element: ElementRef) {
        this.el = element.nativeElement;
        toastService
            .getState()
            .subscribe(res => this.el.style.display = res ? 'block' : 'none');
    }

}
