import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // selector: 'selector',
  templateUrl: 'not-found.component.html',
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
      setTimeout(() => this.router.navigate(['/page', 1]), 1000);
  }
}
