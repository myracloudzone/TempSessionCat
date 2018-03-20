import { BrowserModule } from '@angular/platform-browser';
import { DropBoxDirective } from '../../../commonUtils/Directives/DropBox';
import { GoogleDriveDirective } from '../../../commonUtils/Directives/GoogleDrive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SimpleNotificationsModule } from 'angular2-notifications/dist';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgModule } from '@angular/core';
import { NgSpinKitModule } from "ng-spin-kit/dist/spinners"; 
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

@NgModule({
    declarations: [
        NavbarComponent,
        DropBoxDirective,
        GoogleDriveDirective
    ],
    imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgbModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        JsonpModule,
        SimpleNotificationsModule.forRoot(),
        NgSpinKitModule,
        BrowserAnimationsModule,
        Angular2FontawesomeModule
    ],
    providers: [],
    exports: [
        NavbarComponent, FormsModule, HttpModule, SimpleNotificationsModule, NgSpinKitModule, BrowserAnimationsModule, NgbModule,
        DropBoxDirective,
        GoogleDriveDirective,
        BrowserModule,
        ReactiveFormsModule,
        JsonpModule
    ]
})
export class SharedModule {

}