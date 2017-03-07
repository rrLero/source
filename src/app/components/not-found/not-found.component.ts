import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'not-found.component.html',
})
export class NotFoundComponent implements OnInit {
    constructor(private router: Router) { }
    ngOnInit() {
        setTimeout(() => this.router.navigate(['/']), 1000);
    }
}
