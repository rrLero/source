import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import SimpleMDE from 'simplemde';

@Component({
    selector: 'md-editor',
    template: `<textarea #editor></textarea>`
})
export class MdEditorComponent implements OnInit {
    @Input() value: string;
    @ViewChild('editor') el: ElementRef;
    updatedValue: string;
    editor;

    ngOnInit() {
        this.editor = new SimpleMDE({
            element: this.el.nativeElement,
            status: false
        });
        this.setValue(this.value);

        this.editor.codemirror.on("change", () => {
            this.updatedValue = this.editor.value();
        });
    }

    setValue(value) {
        this.editor.value(value);
    }
}