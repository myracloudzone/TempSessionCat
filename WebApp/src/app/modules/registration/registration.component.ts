import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Rx';
declare var $: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  modals = { columnModalLoading : false};
  booleans = { allRegSelected : true };
  closeResult: string;
  totalItems = 100;
  itemsPerPage = 10;
  page = 2;
  headers = ['Name', 'Title', 'Company'];
  headerOptions = ['Name', 'Title', 'Company', 'Status', 'AppLink', 'FacebookLink', 'Phone', 'Mobile', 'City', 'Zone'];
  regData = [{id : 5, 'FacebookLink': 'www.facebook.com/7ty9kbvdg67679', 'Name': 'Akshay','Title': 'Mr.', 'Company' : 'InfoObjects Inc.',
             'Status': 'Registered', 'AppLink' : 'www.playstore.com/t456765', 'Phone' : '90988888', 'Mobile' : '7877439550', 'City' : 'SF', 'Zone' : 'America'},
             {id : 6, 'FacebookLink': 'www.facebook.com/4tyhbdvjhdg67679', 'Name': 'Rahul','Title': 'Mr.', 'Company' : 'Certain Inc.',
             'Status': 'Registered', 'AppLink' : 'www.playstore.com/yjnn787', 'Phone' : '90988888', 'Mobile' : '7877439550', 'City' : 'SF', 'Zone' : 'America'},
             {id : 7, 'FacebookLink': 'www.facebook.com/709dj888898', 'Name': 'Deepak','Title': 'Mr.', 'Company' : 'InfoObjects Inc.',
             'Status': 'Cancelled', 'AppLink' : 'www.playstore.com/,jbejhb9', 'Phone' : '90988888', 'Mobile' : '7877439550', 'City' : 'SF', 'Zone' : 'America'},
             {id : 8, 'FacebookLink': 'www.facebook.com/jhvvd78389sn', 'Name': 'Farina','Title': 'Ms.', 'Company' : 'InfoObjects Inc.',
             'Status': 'Registered', 'AppLink' : 'www.playstore.com/hjdg89779', 'Phone' : '90988888', 'Mobile' : '7877439550', 'City' : 'SF', 'Zone' : 'America'},
  ];
  constructor(private modalService: NgbModal) {
  }

  open(content) {
    this.modalService.open(content, { size: 'lg'}).result.then((result) => {
      this.setTableDraggable();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  toggleSelectAllReg() {
    this.booleans.allRegSelected = !this.booleans.allRegSelected;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.setTableDraggable();
  }

  setTableDraggable() {
    setTimeout(function() {
      $('.table').dragableColumns({
        drag: true,
        dragClass: 'drag',
        overClass: 'over',
        movedContainerSelector: '.dnd-moved'
     });
    }, 1000);
  }
  setHeadersConfig(header) {
    if(this.headers.indexOf(header) >= 0) {
      this.headers.splice(header,1);
    } else {
      this.headers.push(header);
    }
  }

  slideTable(side) {
    const leftPos = $('.table-responsive').scrollLeft();
    if(side === 'left') {
      $('.table-responsive').animate({scrollLeft: leftPos - 100},100);
    } else {
      $('.table-responsive').animate({scrollLeft: leftPos + 100},100);
    }
  }

}
