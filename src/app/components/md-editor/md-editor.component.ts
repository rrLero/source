import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import SimpleMDE from 'simplemde';

@Component({
    selector: 'md-editor',
    template: `<textarea #editor></textarea>`
})
export class MdEditorComponent implements OnInit {
    @Input() value: string;
    @ViewChild('editor') el: ElementRef;
    editor;

    ngOnInit() {
        this.editor = new SimpleMDE({
            element: this.el.nativeElement,
            status: false,
            showIcons: ["code", "table"],
            spellChecker: false
        });
        this.setValue(this.value);

        this.editor.codemirror.on("change", () => {
            this.value = this.editor.value();
        });
    }

    setValue(value) {
        this.editor.value(value);
    }
}