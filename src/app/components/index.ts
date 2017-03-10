import { LoginComponent }      from './login/login.component';
import { PostsComponent }      from './posts/posts.component';
import { PostComponent }       from './post/post.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent }     from './search/search.component';
import { NotFoundComponent }   from './not-found/not-found.component';
import { MdEditorComponent }   from './md-editor/md-editor.component';
import { AuthComponent }       from './auth/auth.component';
import { AuthGithubComponent } from './auth-github/auth-github.component';

export { LoginComponent };
export { PostsComponent };
export { PostComponent };
export { NotFoundComponent };
export { AuthComponent };
export { AuthGithubComponent };

export const components = [
    LoginComponent,
    PostsComponent,
    PostComponent,
    PaginationComponent,
    SearchComponent,
    NotFoundComponent,
    MdEditorComponent,
    AuthComponent,
    AuthGithubComponent
];
