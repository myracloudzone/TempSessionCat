import { Notification } from 'rxjs/Rx';
import { Component, Injector, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-root',
    template: `<simple-notifications (onCreate)="created($event)" (onDestroy)="destroyed($event)"></simple-notifications>`
})
export class NotificationServiceComponent {
    notificationOptions = {

    }
    constructor(private service: NotificationsService) {

    }

    successMsgWithTitle(title, content) {
        this.service.success(
            title, content, this.notificationOptions
        );
    }
    successMsg(content) {
        this.service.success(
            'Success', content, this.notificationOptions
        );
    }

}
