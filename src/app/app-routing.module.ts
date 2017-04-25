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
import { AuthGuard }            from './services';
import {
    WelcomeComponent,
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    EditPostComponent,
    NotFoundComponent,
    AuthComponent,
    StartComponent,
    AccountComponent,
    DraftsComponent,
    DraftComponent,
    PostsByTagComponent,
    AboutComponent,
    NewCommentsComponent,
}  from './components';

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
        path: ':name/:repo',
        component: PostsComponent
    },
    {
        path: ':name/:repo/page/:id',
        component: PostsComponent
    },
    {
        path: ':name/:repo/tag/:tag',
        component: PostsByTagComponent
    },
    {
        path: ':name/:repo/tag/:tag/page/:id',
        component: PostsByTagComponent
    },
    {
        path: ':name/:repo/post/:title',
        component: PostComponent
    },
    {
        path: ':name/:repo/post/:title/edit',
        component: EditPostComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':name/:repo/create',
        component: CreatePostComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':name/:repo/drafts',
        component: DraftsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':name/:repo/drafts/page/:id',
        component: DraftsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':name/:repo/drafts/post/:title',
        component: DraftComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':name/:repo/drafts/post/:title/edit',
        component: EditPostComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':name/:repo/newcomments',
        component: NewCommentsComponent
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

export function localizeLoaderFactory(translate: TranslateService, location: Location, http: Http) {
    return new StaticParserLoader(translate, location, http, 'assets/i18n/locales.json');
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
