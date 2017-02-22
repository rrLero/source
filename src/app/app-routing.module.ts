import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent }       from './components/posts/posts.component';
import { PostComponent }        from './components/post/post.component';

const routes: Routes = [
  { path: '', redirectTo: '/new', pathMatch: 'full' },
  { path: 'new', component: PostsComponent },
  { path: 'posts/:id', component: PostComponent },
  { path: 'page/:id', component: PostsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
