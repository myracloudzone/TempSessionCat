import { SessionComponent } from './session.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';

const sessionRoutes: Routes = [
    { path: 'session',  component: SessionComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(sessionRoutes),
      BrowserModule,
      HttpModule
    ],
    exports: [
      RouterModule
    ]
})
export class SessionRoutingModule {
    appName : string = 'Session';
    appGenericName : string = 'Session';
    constructor() {
        this.setAppVariables();
    }
    setAppVariables = function() {
        GlobalVariableService.setAppNameValues(this.appName,this.appGenericName);
    };
}