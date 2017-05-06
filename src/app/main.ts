import { enableProdMode }         from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { hmrBootstrap }           from './hmr';
import { AppModule }              from './app.module';

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (process.env.ENV === 'production') {
    enableProdMode();
    bootstrap();
} else  {
    if (module['hot']) {
        console.clear();
        hmrBootstrap(module, bootstrap);
    } else {
        console.error('HMR is not enabled!');
    }
}
