import { Injectable }                  from '@angular/core';
import { ToastsManager, ToastOptions } from 'ng2-toastr';

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
    toastLife = 2000;

    constructor(public toastr: ToastsManager) { }

    showSuccess(msg: string): void {
        this.toastr
            .success(msg, null, { dismiss: 'controlled' })
            .then(() => setTimeout(() => this.toastr.dispose(), this.toastLife));
    }

    showError(msg: string): void {
        this.toastr
            .error(msg, null, { dismiss: 'controlled' })
            .then(() => setTimeout(() => this.toastr.dispose(), 5000));
    }

    showWarning(msg: string): void {
        this.toastr
            .warning(msg, null)
            .then(() => setTimeout(() => this.toastr.dispose(), 5000));
    }

    showInfo(msg: string): void {
        this.toastr
            .info(msg, null, { dismiss: 'controlled' })
            .then(toast => {
                if (toast.timeoutId) {
                    clearTimeout(toast.timeoutId);
                }
            });
    }

    showCustom(msg: string): void {
        this.toastr.custom(`<span class="custom-toast-color">${msg}</span>`, null, { enableHTML: true });
    }

    life(): number {
        return this.toastLife;
    }
}
