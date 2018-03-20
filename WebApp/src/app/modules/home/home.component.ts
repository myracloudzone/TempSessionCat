import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import { DataService } from './home-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  obj = {loading : true};
  filters = [];
  sessionData = [];
  filterObject = {};
  filterArrayObject = {};
  checkboxFlag = false;
  currentSpeaker = {};

  constructor(private dataService: DataService, private spinnerService: Ng4LoadingSpinnerService, private modalService: NgbModal) {

  }

  openSpeaker(content, speaker) {
    this.currentSpeaker = speaker;
    console.log(speaker)
    this.modalService.open(content, { size: 'lg'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  HomeComponent() {
  }

  toggleSpinner() {
    this.obj.loading = !this.obj.loading;
    console.log(this.obj.loading);
  }

  setSessionData() {
    var data = {};
    data['name'] = 'Session 1';
    data['code'] = 'Code1';
    data['description'] = 'Description 1';
    data['time'] = 'Wednesday, Apr 11, 12:45 p.m. - 01:30 p.m.';
    data['sessionType'] = { id : 1, name : 'Breakout Session'};
    data['location'] = {id : 1, name : 'Location 1'};
    data['speakers'] = [{id : 1, name : 'Andrew Smith', organization : 'Certain', position : 'Sales Manager'},
                        {id : 4, name : 'Sandeep Nadakuduru', organization : 'Certain', position : 'Product Manager'}
                       ];

    this.sessionData.push(data);

    data = {};
    data['name'] = 'Session 2';
    data['code'] = 'Code2';
    data['description'] = 'Description 2';
    data['time'] = 'Wednesday, Apr 11, 12:45 p.m. - 01:30 p.m.';
    data['sessionType'] = { id : 2, name : 'General Session'};
    data['location'] = {id : 2, name : 'Location 2'};
    data['speakers'] = [{id : 1, name : 'Andrew Smith', organization : 'Certain', position : 'Sales Manager'},
                        {id : 2, name : 'Sudhir Jangir', organization : 'Infoobjects', position : 'CTO'},
                        {id : 3, name : 'Jasvinder Matharu', organization : 'Certain', position : 'VP Engineering'}];

    this.sessionData.push(data);

    data = {};
    data['name'] = 'Session 3';
    data['code'] = 'Code3';
    data['description'] = 'Description 3';
    data['time'] = 'Wednesday, Apr 11, 12:45 p.m. - 01:30 p.m.';
    data['sessionType'] = { id : 3, name : 'Keynotes'};
    data['location'] = {id : 3, name : 'Location 3'};
    data['speakers'] = [];

    this.sessionData.push(data);

  }

  filterData() {
    this.getSessionData();
  }
  
  applyFilter(filterType, filterId) {
    if(this.filterArrayObject[filterType].indexOf(filterId) >= 0) {
      this.filterArrayObject[filterType].splice(this.filterArrayObject[filterType].indexOf(filterId), 1);
    } else {
      this.filterArrayObject[filterType].push(filterId);
    }
    // if(this.filterObject[filterType] == null) {
    //   this.filterObject[filterType] = [filterId];
    // } else {
    //   var data = [];
    //   var found = false;
    //   this.filterObject[filterType].forEach(function (v, k) {
    //     if(v == filterId) {
    //       found = true;
    //     } else {
    //       data.push(v);
    //     }
    //   });
    //   if(found == false) {
    //     data.push(filterId);
    //   }
    //   this.filterObject[filterType] = data;
    // }
    console.log(this.filterArrayObject);
    this.filterData();
  }

  setFilters() {
    this.filters = [];
    this.dataService.getLevels().subscribe(resp => {
      var tempData = {
          name : 'Session Levels' ,
          type : 'sessionLevel' ,
          optionsType : 'Checkbox',
          options : resp.body['data'],
          showOptions : true
        };
        this.filters.push(tempData);
    });

    this.dataService.getLocations().subscribe(resp => {
        var tempData = {
          name : 'Session Location' ,
          type : 'sessionLocation' ,
          optionsType : 'Checkbox',
          options : resp.body['data'],
          showOptions : false
        };
        this.filters.push(tempData);
    });
    this.dataService.getStatus().subscribe(resp => {
      var tempData = {
        name : 'Session Status' ,
        type : 'sessionStatus' ,
        optionsType : 'Checkbox',
        options : resp.body['data'],
        showOptions : false
      };
      this.filters.push(tempData);
    });
    this.dataService.getTags().subscribe(resp => {
      var tempData = {
        name : 'Session Tags' ,
        type : 'sessionTag' ,
        optionsType : 'Checkbox',
        options : resp.body['data'],
        showOptions : false
      };
      this.filters.push(tempData);
    });
    this.dataService.getTracks().subscribe(resp => {
      var tempData = {
        name : 'Session Tracks' ,
        type : 'sessionTrack' ,
        optionsType : 'Checkbox',
        options : resp.body['data'],
        showOptions : false
      };
      this.filters.push(tempData);
    });
    this.dataService.getTypes().subscribe(resp => {
      var tempData = {
        name : 'Session Types' ,
        type : 'sessionType' ,
        optionsType : 'Checkbox',
        options : resp.body['data'],
        showOptions : false
      };
      this.filters.push(tempData);
    });
  };

  clearAllFilter() {
      this.setDefaultFilterObject();
      this.setFilters();
      this.getSessionData();
  };

  setDefaultFilterObject() {
    this.filterObject['sessionLevel'] = {};
    this.filterObject['sessionLocation'] = {};
    this.filterObject['sessionStatus'] = {};
    this.filterObject['sessionTag'] = {};
    this.filterObject['sessionTrack'] = {};
    this.filterObject['sessionType'] = {};
    this.filterArrayObject['sessionLevel'] = [];
    this.filterArrayObject['sessionLocation'] = [];
    this.filterArrayObject['sessionStatus'] = [];
    this.filterArrayObject['sessionTag'] = [];
    this.filterArrayObject['sessionTrack'] = [];
    this.filterArrayObject['sessionType'] = [];
    this.filterArrayObject['term'] = '';
  };

  getSessionData() {
    this.spinnerService.show();
    this.dataService.getData(this.filterArrayObject).subscribe(resp => {
      setTimeout(()=>{
        this.spinnerService.hide();
        this.sessionData = resp.body['data'];
      },1000);
    });
  }

  ngOnInit() {
    this.setDefaultFilterObject();
    $('#sidebar-btn').click();
    this.setFilters();
    this.getSessionData();
  }


}
