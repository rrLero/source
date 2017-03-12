import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    name = '';
    repo = '';
    constructor(private router: Router) { }
    ngOnInit() {
        this.loadUser();
    }
    go(name, repo) {
        this.router.navigate([`${name.value}/${repo.value}`]);
    }
    loadUser() {
        if (localStorage.getItem('name')) {
            this.name = localStorage.getItem('name');
            this.repo = localStorage.getItem('repo');
        }
    }
    saveUser(nameEl, repoEl) {
        localStorage.setItem('name', nameEl.value);
        localStorage.setItem('repo', repoEl.value);
    }
}
