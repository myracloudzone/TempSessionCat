import { Router } from '@angular/router';
import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSideToggled: boolean = false;
  certainLogoPath = GlobalVariableService.certainLogoPath;
  userPath = GlobalVariableService.userLogoPath;
  constructor(private router: Router) {
    console.log(this.router.url);
  }
  ngOnInit() {
  }

  toggleSideBar() {
    this.isSideToggled = !this.isSideToggled;
    $('#sidebar-wrapper').toggleClass('visible');
    $('#side-panel').toggleClass('visible');
    console.log(this.isSideToggled)
    if (this.isSideToggled) {
      $('#page-content-wrapper').css('padding-left', '80px');
    } else {
      $('#page-content-wrapper').css('padding-left', '200px');
    }
  }
}
