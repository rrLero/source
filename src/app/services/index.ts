import { HttpService }   from './http.service';
import { PagerService }  from './pager.service';
import { SearchService } from './search.service';

export { HttpService };
export { PagerService };
export { SearchService };

export const services = [
    HttpService,
    PagerService,
    // SearchService
];
