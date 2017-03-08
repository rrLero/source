import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }       from './components/login/login.component';
import { PostsComponent }       from './components/posts/posts.component';
import { PostComponent }        from './components/post/post.component';
import { PostEditComponent }    from './components/post-edit/post-edit.component';
import { NotFoundComponent }    from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: ':name/:repo/post/:title', component: PostComponent },
  { path: ':name/:repo/post/:title/edit', component: PostEditComponent },
  { path: ':name/:repo/page/:id', component: PostsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
