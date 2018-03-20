import { EmailComponent } from './email.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';

const emailRoutes: Routes = [
    { path: 'email',  component: EmailComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(emailRoutes),
      BrowserModule,
      HttpModule
    ],
    exports: [
      RouterModule
    ]
})
export class EmailRoutingModule {
    appName: string = 'Email';
    appGenericName: string = 'email';
    constructor() {
        this.setAppVariables();
    }
    setAppVariables = function() {
        GlobalVariableService.setAppNameValues(this.appName,this.appGenericName);
    };
}