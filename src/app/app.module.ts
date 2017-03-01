import { NgModule }                  from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { HttpModule }                from '@angular/http';

import { AppRoutingModule }          from './app-routing.module';
import { HttpService, PagerService } from './services/index';
import { SafeHtml }                  from './pipes/safe-html.pipe';

import { AppComponent }              from './app.component';
import { PostsComponent }            from './components/posts/posts.component';
import { PostComponent }             from './components/post/post.component';
import { PaginationComponent }       from './components/pagination/pagination.component';
import { NotFoundComponent }         from './components/not-found/not-found.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PostsComponent,
        PostComponent,
        PaginationComponent,
        NotFoundComponent,
        SafeHtml
    ],
    providers: [
        HttpService,
        PagerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
