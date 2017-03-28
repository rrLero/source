import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'spinner',
    templateUrl: 'spinner.component.html',
})
export class SpinnerComponent implements OnInit {
    loading = false;
    constructor() { }

    ngOnInit() {
        setTimeout(() => this.loading = true, 500);
    }
}
