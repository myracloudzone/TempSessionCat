import { CheckInModuleComponent } from './modules/checkin/checkin-module';
import { RegistrationModuleComponent } from './modules/registration/registration-module';
import { SharedModule } from './modules/shared/module/shared.module';
import { EmailModuleComponent } from './modules/email/email-module';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { NotificationServiceComponent } from './commonUtils/Services/NotificationService/notificationService.component';
import { HomeModuleComponent } from './modules/home/home-module';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './modules/login/login-routing.module';
import { LoginComponent } from './modules/login/login.component';
import { RouterModule } from '@angular/router';
import { LoginModuleComponent } from './modules/login/login-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppComponent } from './app.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NotificationServiceComponent,
  ],
  imports: [
    SharedModule,
    LoginModuleComponent,
    HomeModuleComponent,
    // RegistrationModuleComponent,
    // EmailModuleComponent,
    // CheckInModuleComponent,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot([
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [NotificationServiceComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
