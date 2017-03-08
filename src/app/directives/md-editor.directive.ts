import { Directive, ElementRef, Input } from '@angular/core';
import SimpleMDE from 'simplemde';

@Directive({
    selector: '[mdEditor]'
})
export class MdEditorDirective {
    editor;
    @Input('mdEditor') editorValue: string;

    constructor(private el: ElementRef) {
        this.editor = new SimpleMDE({
            element: this.el.nativeElement,
            status: false
        });
        this.editor.value(this.editorValue);
    }
}