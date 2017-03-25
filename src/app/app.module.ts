import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { HttpModule }              from '@angular/http';
import { FormsModule }             from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule }        from './app-routing.module';

import { AppComponent } from './app.component';
import { components }   from './components/index';
import { services }     from './services/index';
import { pipes }        from './pipes/index';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        ...components,
        ...pipes
    ],
    providers: [ ...services ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
