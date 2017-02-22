import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { HttpModule }           from '@angular/http';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './shared/in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';
import { BlogService }          from './shared/blog.service';

import { AppComponent }         from './app.component';
import { PostsComponent }       from './components/posts/posts.component';
import { PostComponent }        from './components/post/post.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [
        AppComponent,
        PostsComponent,
        PostComponent
    ],
    providers: [BlogService],
    bootstrap: [AppComponent]
})
export class AppModule { }
