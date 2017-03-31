import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent }     from './components';
import { PostsComponent }       from './components';
import { PostComponent }        from './components';
import { CreatePostComponent }  from './components';
import { EditPostComponent }    from './components';
import { NotFoundComponent }    from './components';
import { AuthComponent }        from './components';
import { StartComponent }       from './components';
import { AccountComponent }     from './components';
import { DraftsComponent }      from './components';
import { DraftComponent }       from './components';
import { PostsByTagComponent }  from './components';

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
        component: EditPostComponent
    },
    {
        path: ':name/:repo/create',
        component: CreatePostComponent
    },
    {
        path: ':name/:repo/drafts',
        component: DraftsComponent
    },
    {
        path: ':name/:repo/drafts/page/:id',
        component: DraftsComponent
    },
    {
        path: ':name/:repo/drafts/post/:title',
        component: DraftComponent
    },
    {
        path: ':name/:repo/drafts/post/:title/edit',
        component: EditPostComponent
    },
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
