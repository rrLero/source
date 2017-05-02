import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Http }                 from '@angular/http';
import { Location }             from '@angular/common';
import { TranslateService }     from '@ngx-translate/core';
import {
    LocalizeRouterModule,
    LocalizeParser,
    StaticParserLoader
}                               from 'localize-router';
import {
    WelcomeComponent,
    NotFoundComponent,
    AuthComponent,
    StartComponent,
    AccountComponent,
    AboutComponent
}                               from './components';
import { NewCommentsComponent } from './modules/comments/components';

const routes: Routes = [
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'start',
        component: StartComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'page-not-found',
        component: NotFoundComponent
    },
    {
        path: ':name',
        component: AccountComponent
    },
    {
        path: ':name/:repo/newcomments',
        component: NewCommentsComponent
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

export function localizeLoaderFactory(translate: TranslateService, location: Location, http: Http) {
    return new StaticParserLoader(translate, location, http, 'assets/i18n/config.json');
}

@NgModule({
    imports: [
        LocalizeRouterModule.forRoot(routes, {
            provide: LocalizeParser,
            useFactory: localizeLoaderFactory,
            deps: [TranslateService, Location, Http]
        }),
        RouterModule.forRoot(routes)
    ],
    exports: [
        LocalizeRouterModule,
        RouterModule
    ]
})
export class AppRoutingModule { }
