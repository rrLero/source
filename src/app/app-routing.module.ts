import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent }     from './components/index';
import { PostsComponent }       from './components/index';
import { PostComponent }        from './components/index';
import { CreatePostComponent }  from './components/index';
import { EditPostComponent }    from './components/index';
import { NotFoundComponent }    from './components/index';
import { AuthComponent }        from './components/index';
import { StartComponent }       from './components/index';
import { AccountComponent }     from './components/index';

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
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
