import { Injectable }                  from '@angular/core';
import { ToastsManager, ToastOptions } from 'ng2-toastr';

ToastsManager.prototype.dispose = function() {
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

    constructor(public toastr: ToastsManager) { }

    showSuccess(msg: string) {
        this.toastr
            .success(msg, 'Success!', { dismiss: 'controlled' })
            .then(() => setTimeout(() => this.toastr.dispose(), 2000));
    }
    showError(msg: string) {
        this.toastr
            .error(msg, 'Oops!', { dismiss: 'controlled' })
            .then(() => setTimeout(() => this.toastr.dispose(), 5000));
    }
    showWarning(msg: string) {
        this.toastr.warning(msg, 'Alert!');
    }
    showInfo(msg: string) {
        this.toastr
            .info(msg, null, { dismiss: 'controlled' })
            .then(toast => {
                if (toast.timeoutId) {
                    clearTimeout(toast.timeoutId);
                }
            });
    }
    showCustom(msg: string) {
        this.toastr.custom(msg, null, { enableHTML: true });
    }
}
