import { HttpService }   from './http.service';
import { PagerService }  from './pager.service';
import { SearchService } from './search.service';
import { AuthService } from './auth.service';

export { HttpService };
export { PagerService };
export { SearchService };
export { AuthService };

export const services = [
    HttpService,
    PagerService,
    AuthService,
    // SearchService
];
