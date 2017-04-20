import { Injectable }                            from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Injectable()
export class RouterService {
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) { }

    getRoute() {
        return this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter(route => route.outlet === 'primary');
    }
}
