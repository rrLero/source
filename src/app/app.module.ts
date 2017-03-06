import { NgModule }                  from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { HttpModule }                from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule }          from './app-routing.module';
import { HttpService, PagerService } from './services/index';
import { SafeHtml }                  from './pipes/safe-html.pipe';
import { MarkdownPipe }              from './pipes/markdown.pipe';

import { AppComponent }              from './app.component';
import { AuthorizationComponent }     from './components/authorization/authorization.component';
import { PostsComponent }            from './components/posts/posts.component';
import { PostComponent }             from './components/post/post.component';
import { PaginationComponent }       from './components/pagination/pagination.component';
import { NotFoundComponent }         from './components/not-found/not-found.component';
import { SearchComponent }           from './components/search/search.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        AuthorizationComponent,
        PostsComponent,
        PostComponent,
        PaginationComponent,
        NotFoundComponent,
        SafeHtml,
        MarkdownPipe,
        SearchComponent
    ],
    providers: [
        HttpService,
        PagerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
