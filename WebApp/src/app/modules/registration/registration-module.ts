import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { GoogleDriveDirective } from '../../commonUtils/Directives/GoogleDrive';
import { DropBoxDirective } from '../../commonUtils/Directives/DropBox';
import { SharedModule } from '../shared/module/shared.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';
import { Http, HttpModule } from '@angular/http';
import { NotificationServiceComponent } from '../../commonUtils/Services/NotificationService/notificationService.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providers } from 'ng2-dnd';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { NgModule } from '@angular/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate';
import { NgSpinKitModule } from 'ng-spin-kit';

@NgModule({
    imports: [
      RegistrationRoutingModule,
      SharedModule,
      NgbModule.forRoot(),
      TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n/', '.json'),
        deps: [Http]
      })
    ],
    declarations: [
      RegistrationComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class RegistrationModuleComponent {
    constructor(translate: TranslateService) {
      translate.use(GlobalVariableService.appGenericName+'-'+GlobalVariableService.appLanguage);
  }
}