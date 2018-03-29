import { SharedModule } from './modules/shared/module/shared.module';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { HttpModule } from '@angular/http';
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
import { SessionModuleComponent } from './modules/session/session-module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    LoginModuleComponent,
    HomeModuleComponent,
    SessionModuleComponent,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot([
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}  
