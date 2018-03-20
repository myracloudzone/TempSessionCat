import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';

const homeRoutes: Routes = [
    { path: 'home',  component: HomeComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(homeRoutes),
      BrowserModule,
      HttpModule
    ],
    exports: [
      RouterModule
    ]
})
export class HomeRoutingModule {
    appName : string = 'Event';
    appGenericName : string = 'event';
    constructor() {
        this.setAppVariables();
    }
    setAppVariables = function() {
        GlobalVariableService.setAppNameValues(this.appName,this.appGenericName);
    };
}