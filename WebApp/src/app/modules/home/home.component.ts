import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import { DataService } from './home-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';

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
  currentSpeakerSession = [];
  maxDuration = 0;
  listLoading = true;
  sortField = 's.startTime';

  constructor(private dataService: DataService, private spinnerService: Ng4LoadingSpinnerService, private modalService: NgbModal) {
    //  private spinnerService: Ng4LoadingSpinnerService,
  }

  setSortBy(field) {
    this.sortField = field;
    this.getSessionData();
  }

  openSpeaker(content, speaker) {
    this.currentSpeaker = speaker;
    console.log(speaker);
    this.spinnerService.show();
    this.dataService.getSpeakerSesssion(this.currentSpeaker['speakerId']).subscribe(resp => {
      setTimeout(()=> {
        this.spinnerService.hide();
        this.currentSpeakerSession = resp.body['data'];
        this.modalService.open(content, { size: 'lg'}).result.then((result) => {
          
        }, (reason) => {
        });
      },500);
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

  getStartEndDate(startTime, endTime) {
    var start = new Date(startTime);
    var end = new Date(endTime);
    var datePipe = new DatePipe('en-US');
    console.log('S.D = '+start.getDay()+ ' E.D = '+end.getDay()+' S.M = '+start.getMonth()+' E.M = '+end.getMonth()+' S.Y = '+start.getFullYear()+' E.Y ' + end.getFullYear());
    if(start.getDay() === end.getDay() && start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return datePipe.transform(start, 'yyyy-MM-dd').toString() + '  ' +
                datePipe.transform(start, 'HH:mm').toString() + ' - ' + datePipe.transform(end, 'HH:mm').toString();
    } else {
        return datePipe.transform(start, 'yyyy-MM-dd HH:mm').toString() + ' - ' + datePipe.transform(end, 'yyyy-MM-dd HH:mm').toString();
    }

  }

  setFilters() {
    this.filters = [{}, {}, {}, {}, {}, {}, {}];
    var count = 0;
    this.dataService.getLevels().subscribe(resp => {
      var tempData = {
          name : 'Levels' ,
          type : 'sessionLevel' ,
          optionsType : 'Checkbox',
          options : resp.body['data'],
          showOptions : false
        };
        this.filters[1] =tempData;
    });

    this.dataService.getLocations().subscribe(resp => {
        var tempData = {
          name : 'Location' ,
          type : 'sessionLocation' ,
          optionsType : 'Checkbox',
          options : resp.body['data'],
          showOptions : false
        };
        this.filters[2] =tempData;
    });
    this.dataService.getStatus().subscribe(resp => {
      var tempData = {
        name : 'Status' ,
        type : 'sessionStatus' ,
        optionsType : 'Checkbox',
        options : resp.body['data'],
        showOptions : false
      };
      this.filters[3] = tempData;
    });
    this.dataService.getTags().subscribe(resp => {
      var tempData = {
        name : 'Tags' ,
        type : 'sessionTag' ,
        optionsType : 'Checkbox',
        options : resp.body['data'],
        showOptions : false
      };
      this.filters[4] =tempData;
    });
    this.dataService.getTracks().subscribe(resp => {
      var tempData = {
        name : 'Tracks' ,
        type : 'sessionTrack' ,
        optionsType : 'Checkbox',
        options : resp.body['data'],
        showOptions : false
      };
      this.filters[5] =tempData;
    });
    this.dataService.getTypes().subscribe(resp => {
      var tempData = {
        name : 'Types' ,
        type : 'sessionType' ,
        optionsType : 'Checkbox',
        options : resp.body['data'],
        showOptions : false
      };
      this.filters[6] = tempData;
    });
    this.dataService.getDistinctDates().subscribe(resp => {
      var tempData = {
        name : 'Dates' ,
        type : 'dates' ,
        optionsType : 'Checkbox',
        options : resp.body['data'],
        showOptions : true
      };
      this.filters[0] =tempData;
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
    this.filterObject['dates'] = {};
    this.filterArrayObject['sessionLevel'] = [];
    this.filterArrayObject['sessionLocation'] = [];
    this.filterArrayObject['sessionStatus'] = [];
    this.filterArrayObject['sessionTag'] = [];
    this.filterArrayObject['sessionTrack'] = [];
    this.filterArrayObject['sessionType'] = [];
    this.filterArrayObject['dates'] = [];
    this.filterArrayObject['term'] = '';
  };

  getSessionData() {
    this.spinnerService.show();
    this.listLoading = true;
    this.filterArrayObject['sortField'] = this.sortField;
    this.dataService.getData(this.filterArrayObject).subscribe(resp => {
      setTimeout(()=> {
        this.spinnerService.hide();
        this.sessionData = resp.body['data'];
        this.maxDuration = resp.body['maxDuration'];
        this.listLoading = false;
      },1000);
    });
  }

  getHours(min) {
    let h = parseInt(''+(min/60));
    let m = min%60;
    var t = h + 'h : '+m+'m';
    return t;
  }
  getMinutes(min) {
    // return 
  }
  getProgressmaxValue(min) {
    return ((min/this.maxDuration)*100).toFixed(2)+'%';
  }

  ngOnInit() {
    this.setDefaultFilterObject();
    $('#sidebar-btn').click();
    this.setFilters();
    this.getSessionData();
  }


}
