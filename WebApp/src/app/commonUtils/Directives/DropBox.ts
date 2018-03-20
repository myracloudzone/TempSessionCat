import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
declare var Dropbox: any;

@Directive({
    selector: '[dropBox]'
})

export class DropBoxDirective {
    @Input() dropBoxOptions: any;
    @Output() dropBoxSuccessFn: EventEmitter<any> = new EventEmitter();
    @Output() dropBoxCancelFn: EventEmitter<any> = new EventEmitter();
    constructor(private el: ElementRef) {

    }
    @HostListener('click') onClick() {
        this.dropBoxOptions['success'] = (files) => {
            if(this.dropBoxSuccessFn != null) {
                this.dropBoxSuccessFn.emit(files);
            }
        };
        this.dropBoxOptions['cancel'] = () => {
            if(this.dropBoxCancelFn) {
                this.dropBoxCancelFn.emit();
            }
        };
        Dropbox.choose(this.dropBoxOptions);
    }
}
