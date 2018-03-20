import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';

const memberRoutes: Routes = [
    { path: 'login',  component: LoginComponent }
];
@NgModule({
    imports: [
      RouterModule.forChild(memberRoutes),
      BrowserModule,
      HttpModule
    ],
    exports: [
      RouterModule
    ]
})
export class LoginRoutingModule {
    title = 'Login';
}