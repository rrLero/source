import { HttpService }     from './http.service';
import { PagerService }    from './pager.service';
import { SearchService }   from './search.service';
import { AuthService }     from './auth.service';
import { CommentsService } from './comments.service';
import { UserService }     from './user.service';
import { RouterService }   from './router.service';
import { DraftService }    from './draft.service';
import { ToastService }    from './toast.service';
import { ToastConfig }     from './toast.service';
import { ToastOptions }    from 'ng2-toastr';

export { HttpService };
export { PagerService };
export { SearchService };
export { AuthService };
export { CommentsService };
export { UserService };
export { ToastService };
export { RouterService };
export { DraftService };

export const services = [
    HttpService,
    PagerService,
    AuthService,
    CommentsService,
    UserService,
    RouterService,
    DraftService,
    ToastService, { provide: ToastOptions, useClass: ToastConfig }
];
