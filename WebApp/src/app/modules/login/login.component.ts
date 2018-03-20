import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;
  title = 'Login';
  notificationOptions = GlobalVariableService.NOTIFICATION_OPTIONS;
  constructor(private _service: NotificationsService, private router: Router) {

  }

  ngOnInit() {
  }

  loginUser() {
    if(this.username === 'akshay' && this.password === '123') {
      this._service.success('Success','Successfully Logged In.', GlobalVariableService.NOTIFICATION_OPTIONS);
    }
  }

  destroyed($event) {
    this.router.navigate(['/home']);
  }
}
