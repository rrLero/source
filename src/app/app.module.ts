import { NgModule }                  from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { HttpModule }                from '@angular/http';
import { FormsModule }               from '@angular/forms';
import { AppRoutingModule }          from './app-routing.module';

import { HttpService, PagerService } from './services/index';
import { SafeHtmlPipe }              from './pipes/safe-html.pipe';
import { MarkdownPipe }              from './pipes/markdown.pipe';

import { AppComponent }              from './app.component';
import { LoginComponent }            from './components/login/login.component';
import { PostsComponent }            from './components/posts/posts.component';
import { PostComponent }             from './components/post/post.component';
import { PostEditComponent }         from './components/post-edit/post-edit.component';
import { PaginationComponent }       from './components/pagination/pagination.component';
import { SearchComponent }           from './components/search/search.component';
import { NotFoundComponent }         from './components/not-found/not-found.component';
import { MdEditorDirective }         from './directives/md-editor.directive';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        PostsComponent,
        PostComponent,
        PostEditComponent,
        PaginationComponent,
        NotFoundComponent,
        SafeHtmlPipe,
        MarkdownPipe,
        SearchComponent,
        MdEditorDirective
    ],
    providers: [
        HttpService,
        PagerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
