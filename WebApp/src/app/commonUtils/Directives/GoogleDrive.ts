import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
declare var $: any;
declare var google: any;
@Directive({
    selector: '[googleDrive]'
})

export class GoogleDriveDirective implements OnInit {
    @Input() driveOptions: {};
    @Output() driveSuccessFn: EventEmitter<any> = new EventEmitter();
    @Output() driveCancelFn: EventEmitter<any> = new EventEmitter();
    constructor(private el: ElementRef) {
        $('body').append( '<div class="hidden"><input id="gdrive_file" type="text"> <a  id="gdrive_file_selector">Select file</a></div>');
    }

    ngOnInit() {
        this.driveOptions['callback'] = (target_id, data) => {
            if (data.action === google.picker.Action.PICKED) {
                if(this.driveSuccessFn != null) {
                    this.driveSuccessFn.emit(data);
                }
            } else if (data.action === google.picker.Action.CANCEL) {
                if(this.driveCancelFn != null) {
                    this.driveCancelFn.emit();
                }
            }
        };
        $().gdrive('init', this.driveOptions);
        $('#gdrive_file').gdrive('set', {
          'trigger': 'gdrive_file_selector',
          'header': 'Select a file',
          'filter': ''
        });
    }

    @HostListener('click') onClick() {
        $('#gdrive_file_selector').click();
    }
}
