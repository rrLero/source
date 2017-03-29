import { Pipe, PipeTransform } from '@angular/core';
import * as marked             from 'marked';
import highlight               from 'highlight.js';

@Pipe({
    name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
    transform(value: string): string {
        if (value != null) {
            marked.setOptions({
                highlight: function (code) {
                    return highlight.highlightAuto(code).value;
                }
            });
            return marked(value);
        }
        return null;
    }
}
