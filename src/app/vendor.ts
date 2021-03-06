import '@angular/platform-browser';
import '@angular/platform-browser/animations';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import '@angular/forms';
import '@angular/animations';

import 'rxjs/Observable';
import 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';

if (process.env.ENV !== 'production') {
    require('@angular/platform-browser-dynamic');
    require('@angular/compiler');
} else {
    require('../../.htaccess');
}

import 'underscore';
import 'marked';
import 'simplemde';
import 'ng2-toastr';
import 'highlight.js';
import 'angular2-moment';
import '@ngx-translate/core';
import '@ngx-translate/http-loader';
import 'localize-router';
import 'primeng/primeng';

import 'primeng/resources/primeng.min.css';
import 'primeng/resources/themes/omega/theme.css';
