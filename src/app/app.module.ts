import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { HttpModule, Http }                 from '@angular/http';
import { FormsModule }                      from '@angular/forms';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { ToastModule }                      from 'ng2-toastr';
import { MomentModule }                     from 'angular2-moment';
import { TranslateHttpLoader }              from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { modules }          from './modules';
import { services }         from './services';
import { directives }       from './directives';
import { components }       from './components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        MomentModule,
        AppRoutingModule,
        ToastModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        ...modules
    ],
    declarations: [
        AppComponent,
        ...directives,
        ...components
    ],
    providers: [...services],
    bootstrap: [AppComponent]
})
export class AppModule { }
