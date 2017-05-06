import { PostService }     from './post.service';
import { PagerService }    from './pager.service';
import { SearchService }   from './search.service';
import { AuthService }     from './auth.service';
import { AuthGuard }       from './auth-guard.service';
import { CommentsService } from './comments.service';
import { UserService }     from './user.service';
import { RouterService }   from './router.service';
import { DraftService }    from './draft.service';
import { BlogService }     from './blog.service';
import { ToastService }    from './toast.service';
import { ToastConfig }     from './toast.service';
import { ToastOptions }    from 'ng2-toastr';

export {
    PostService,
    PagerService,
    SearchService,
    AuthService,
    AuthGuard,
    CommentsService,
    UserService,
    ToastService,
    RouterService,
    DraftService,
    BlogService
};

export const services = [
    PostService,
    PagerService,
    AuthService,
    AuthGuard,
    CommentsService,
    UserService,
    RouterService,
    DraftService,
    BlogService,
    ToastService, { provide: ToastOptions, useClass: ToastConfig }
];
