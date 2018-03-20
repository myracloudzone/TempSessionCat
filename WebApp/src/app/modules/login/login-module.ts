import { SharedModule } from '../shared/module/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providers } from 'ng2-dnd';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
      LoginRoutingModule,
      SharedModule
    ],
    declarations: [
      LoginComponent
    ],
    providers: []
  })
  export class LoginModuleComponent {
    constructor() {
        //Constructor Called
    }
}