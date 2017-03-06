import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
  selector: 'authorization',
  templateUrl: 'authorization.component.html',
})
export class AuthorizationComponent implements OnInit {
  constructor(
      private router: Router) {  }

  ngOnInit() {}
  go(name, repo) {
      this.router.navigate([`${name.value}/${repo.value}/page/1`]);
  }
}
