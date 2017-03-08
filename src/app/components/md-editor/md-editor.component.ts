import { Component, Input, Output, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import SimpleMDE from 'simplemde';

@Component({
    selector: 'md-editor',
    template: `<textarea #editor></textarea>`
})
export class MdEditorComponent implements OnInit {
    @Input() value: string;
    @Output() updatedValue = new EventEmitter();
    @ViewChild('editor') el: ElementRef;
    editor;

    ngOnInit() {
        this.editor = new SimpleMDE({
            element: this.el.nativeElement,
            status: false
        });
        this.editor.value(this.value);
    }

}