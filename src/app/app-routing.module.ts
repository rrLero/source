import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationComponent }     from './components/authorization/authorization.component';
import { PostsComponent }       from './components/posts/posts.component';
import { PostComponent }        from './components/post/post.component';
import { NotFoundComponent }    from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/authorization', pathMatch: 'full' },
  { path: 'authorization', component: AuthorizationComponent },
  { path: ':name/:repo/post/:id', component: PostComponent },
  { path: ':name/:repo/page/:id', component: PostsComponent },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
