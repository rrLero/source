import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }       from './components/login/login.component';
import { PostsComponent }       from './components/posts/posts.component';
import { PostComponent }        from './components/post/post.component';
import { NotFoundComponent }    from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: ':name/:repo', component: PostsComponent },
  { path: ':name/:repo/page/:id', component: PostsComponent },
  { path: ':name/:repo/post/:title', component: PostComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
