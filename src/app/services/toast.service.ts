import { Injectable }    from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToastService {
    constructor(public toastr: ToastsManager) { }

    showSuccess(msg: string) {
        this.toastr.success(msg, 'Success!');
    }
    showError(msg: string) {
        this.toastr.error(msg, 'Oops!');
    }
    showWarning(msg: string) {
        this.toastr.warning(msg, 'Alert!');
    }
    showInfo(msg: string) {
        this.toastr.info(msg);
    }
    showCustom(msg: string) {
        this.toastr.custom(msg, null, { enableHTML: true });
    }
}
