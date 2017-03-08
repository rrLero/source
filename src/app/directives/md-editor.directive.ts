import { Directive, ElementRef } from '@angular/core';
import SimpleMDE from 'simplemde';

@Directive({
    selector: '[mdEditor]'
})
export class MdEditorDirective {
    editor;

    constructor(private el: ElementRef) {
        console.log(el);
        this.editor = new SimpleMDE({
            element: this.el.nativeElement,
            status: false
        });
    }
}