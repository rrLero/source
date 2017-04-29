import {
    Component,
    Input,
    OnInit,
    ViewChild,
    ElementRef
}                           from '@angular/core';
import SimpleMDE            from 'simplemde';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'md-editor',
    template: `<textarea #editor></textarea>`
})
export class MdEditorComponent implements OnInit {
    @Input() value: string;
    @Input() placeholder: string;
    @ViewChild('editor') el: ElementRef;
    editor: SimpleMDE;

    constructor(private translate: TranslateService) { }

    ngOnInit(): void {
        this.editor = new SimpleMDE({
            element: this.el.nativeElement,
            status: false,
            showIcons: ['code', 'table'],
            spellChecker: false,
            placeholder: this.setPlaceholder(this.placeholder)
        });
        this.setValue(this.value);

        this.editor.codemirror.on('change', () => {
            this.value = this.editor.value();
        });
    }

    setValue(value: string): void {
        this.editor.value(value);
    }

    setPlaceholder(value: string): string {
        let placeholder: string;
        this.translate
            .get(value)
            .subscribe(res => placeholder = res.slice(0, -1));

        return placeholder;
    }

}
