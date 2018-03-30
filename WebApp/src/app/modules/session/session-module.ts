import { SharedModule } from '../shared/module/shared.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';
import { Http, HttpModule } from '@angular/http';
import { SessionComponent } from './session.component';
import { SessionRoutingModule } from './session-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providers } from 'ng2-dnd';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { NgModule} from '@angular/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DataService } from './session-service';

@NgModule({
    imports: [
      SessionRoutingModule,
      SharedModule
      // TranslateModule.forRoot({
      //   provide: TranslateLoader,
      //   useFactory: (http: Http) => new TranslateStaticLoader(http,'/assets/i18n/', '.json'),
      //   deps: [Http]
      // })
    ],
    declarations: [
      SessionComponent
    ],
    providers: [DataService]
  })
  export class SessionModuleComponent {
    constructor() {
      // translate.use(GlobalVariableService.appGenericName+'-'+GlobalVariableService.appLanguage);
  }
}