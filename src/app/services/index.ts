import { HttpService }     from './http.service';
import { PagerService }    from './pager.service';
import { SearchService }   from './search.service';
import { AuthService }     from './auth.service';
import { CommentsService } from './comments.service';

export { HttpService };
export { PagerService };
export { SearchService };
export { AuthService };
export { CommentsService };

export const services = [
    HttpService,
    PagerService,
    AuthService,
    CommentsService,
    // SearchService
];
