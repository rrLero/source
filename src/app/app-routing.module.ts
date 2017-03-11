import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }       from './components/index';
import { PostsComponent }       from './components/index';
import { PostComponent }        from './components/index';
import { CreatePostComponent }  from './components/index';
import { EditPostComponent }    from './components/index';
import { NotFoundComponent }    from './components/index';
import { AuthComponent }        from './components/index';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
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
    {
        path: ':name/:repo/auth',
        component: AuthComponent
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
