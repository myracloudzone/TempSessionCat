import { SharedModule } from '../shared/module/shared.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';
import { Http, HttpModule } from '@angular/http';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providers } from 'ng2-dnd';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { NgModule } from '@angular/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DataService } from './home-service';

@NgModule({
    imports: [
      HomeRoutingModule,
      SharedModule,
      // TranslateModule.forRoot({
      //   provide: TranslateLoader,
      //   useFactory: (http: Http) => new TranslateStaticLoader(http,'/assets/i18n/', '.json'),
      //   deps: [Http]
      // })
    ],
    declarations: [
      HomeComponent 
    ],
    providers: [DataService]
  })
  export class HomeModuleComponent {
    constructor(translate: TranslateService) {
      // translate.use(GlobalVariableService.appGenericName+'-'+GlobalVariableService.appLanguage);
  }
}