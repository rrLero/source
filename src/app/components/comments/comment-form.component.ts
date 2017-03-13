import { Component, OnInit } from '@angular/core';
import {} from '../../services/auth.service';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'comment-from',
    templateUrl: 'comment-form.component.html'
})
export class CommentFormComponent implements OnInit {

    constructor(public authService: AuthService) { }

    ngOnInit() {

    }

    submit(value) {
        // console.log(value);
    }

}