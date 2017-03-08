import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'splitMd'
})
export class SplitMdPipe implements PipeTransform {
    transform(value: string): string {
        if (value != null) {
            return value.split('---')[2];
        }
        return null;
    }
}
