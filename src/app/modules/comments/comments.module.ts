import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { RouterModule }         from '@angular/router';
import { TranslateModule }      from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';
import { MomentModule }         from 'angular2-moment';
import { SharedModule }         from '../../shared';

import { components }           from './components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslateModule,
        MomentModule,
        LocalizeRouterModule,
        SharedModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class CommentsModule { }
