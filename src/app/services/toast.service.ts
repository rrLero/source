import { Injectable, EventEmitter }    from '@angular/core';
import { ToastsManager, ToastOptions } from 'ng2-toastr';
import { TranslateService }            from '@ngx-translate/core';

ToastsManager.prototype.dispose = function () {
    if (this.container) {
        this.container.destroy();
        this.container = null;
    }
};

export class ToastConfig extends ToastOptions {
    newestOnTop = false;
    showCloseButton = false;
    animate = 'fade';
    positionClass = 'toast-top-right';
    toastLife = 5000;
    maxShown = 5;
}

@Injectable()
export class ToastService {
    state: EventEmitter<boolean> = new EventEmitter();
    toastLife = 2000;

    constructor(private translate: TranslateService,
                public toastr: ToastsManager) { }

    showSuccess(msg: string, data =  ''): void {
        this.translate
            .get(msg)
            .subscribe((res: string) =>
                this.toastr
                    .success(`${data} ${res}`, null, { dismiss: 'controlled' })
                    .then(() => setTimeout(() => {
                        this.toastr.dispose();
                        this.state.emit(false);
                    }, this.toastLife)));
    }

    showError(msg: string, data = ''): void {
        this.translate
            .get(msg)
            .subscribe((res: string) =>
                this.toastr
                    .error(`${data} ${res}`, null, { dismiss: 'controlled' })
                    .then(() => setTimeout(() => {
                        this.state.emit(false);
                        this.toastr.dispose();
                    }, 5000)));
    }

    showWarning(msg: string, data = ''): void {
        this.translate
            .get(msg)
            .subscribe((res: string) =>
                this.toastr
                    .warning(`${data} ${res}`, null, { dismiss: 'controlled' })
                    .then(() => setTimeout(() => {
                        this.state.emit(false);
                        this.toastr.dispose();
                    }, 5000)));
    }

    showInfo(msg: string): void {
        this.state.emit(true);
        this.translate
            .get(msg)
            .subscribe((res: string) =>
                this.toastr
                    .info(res, null, { dismiss: 'controlled' })
                    .then(toast => toast.timeoutId && clearTimeout(toast.timeoutId)));
    }

    showCustom(msg: string): void {
        this.translate
            .get(msg)
            .subscribe((res: string) =>
                this.toastr
                    .custom(`<span class="custom-toast-color">${res}</span>`, null, { enableHTML: true }));
    }

    life(): number {
        return this.toastLife;
    }

    getState(): EventEmitter<boolean> {
        return this.state;
    }
}
