import { CheckInComponent } from './checkin.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';

const checkInRoutes: Routes = [
    { path: 'checkin',  component: CheckInComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(checkInRoutes),
      BrowserModule,
      HttpModule
    ],
    exports: [
      RouterModule
    ]
})
export class CheckInRoutingModule {
    appName: string = 'CheckIn';
    appGenericName: string = 'checkin';
    constructor() {
        this.setAppVariables();
    }
    setAppVariables = function() {
        GlobalVariableService.setAppNameValues(this.appName,this.appGenericName);
    };
}