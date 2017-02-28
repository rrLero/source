import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent }       from './components/posts/posts.component';
import { PostComponent }        from './components/post/post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/page/1', pathMatch: 'full' },
  { path: 'post/:id', component: PostComponent },
  { path: 'page/:id', component: PostsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
