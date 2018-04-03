import { Component, OnInit, animate, style, state, transition, trigger } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
declare var moment: any;
import { DataService } from './session-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('open', style({opacity: 1})),
      state('closed', style({opacity: 0})),
      transition('open <=> closed', animate( '1000ms')),
    ])
  ],
})
export class SessionComponent implements OnInit {
  loading = true;
  state = 'open';
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
  sortField = 'name';
  // ----------New-----------
  cartItemsIds = [];
  newCartItemsIds = [];
  newCartTimes = {};
  // ------------New---------
  cartItems = [];
  budgetLimit = {value : null};
  cartProgressClass = 'progress-bar bg-success';
  totalCartValue = 0;
  calData = {};
  distinctDates = [];
  distinctDates2 = ['Date/Time'];
  tracks = [];
  calDates = [];
  calSelectedDates = [];
  currentTrackSession = [];
  newCartData = {};
  sessionTooltipRequestExecuting = false;
  times = [ {key : '08', name : '08:00 AM'}, {key : '09', name : '09:00 AM'}, {key : '10', name : '10:00 AM'},
            {key : '11', name : '11:00 AM'}, {key : '12', name : '12:00 PM'}, {key : '13', name : '01:00 PM'},
            {key : '14', name : '02:00 PM'}, {key : '15', name : '03:00 PM'}, {key : '16', name : '04:00 PM'},
            {key : '17', name : '05:00 PM'} ];

  setScrollBar() {
    if (window.navigator.platform.toLowerCase().indexOf('mac') < 0) {
      const link = document.createElement( 'link' );
      link.href = location.protocol + '//' + location.host + '/assets/css/customScrollBar.css';
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.media = 'screen,print';
      document.getElementsByTagName( 'head' )[0].appendChild( link );
    }
  }

  getAMPMFormat(t) {
    return moment('20/03/2018 ' + t, 'DD/MM/YYYY HH:mm').format('hh:mm A');
  }

  nextDateSelector() {
    if (this.calSelectedDates[2] != null) {
      this.spinnerService.show();
      const tempDate1 = this.calSelectedDates[1];
      const tempDate2 = this.calSelectedDates[2];
      let tempDate3 = moment(this.calSelectedDates[2].key, 'DD/MM/YYYY');
      tempDate3.add(24, 'hours');
      tempDate3 = { key : tempDate3.format('DD/MM/YYYY'), value : tempDate3.format('dddd, MMMM DD YYYY')};
      let found = false;
      this.calDates.forEach((v,k) => {
          if (v.key == tempDate3.key) {
            found = true;
          }
      });
      if (found) {
        this.state = 'closed';
        setTimeout(() => {
          this.calSelectedDates = [];
          this.calSelectedDates.push(tempDate1);
          this.calSelectedDates.push(tempDate2);
          this.calSelectedDates.push(tempDate3);
          this.state = 'open';
        }, 1000);
      }
      this.spinnerService.hide();
    }
  }

  previousDateSelector() {
    if (this.calSelectedDates[0] != null) {
      this.spinnerService.show();
      let tempDate1 = this.calSelectedDates[1];
      let tempDate2 = this.calSelectedDates[0];
      let tempDate3 = moment(this.calSelectedDates[0].key, 'DD/MM/YYYY');
      tempDate3.subtract(24, 'hours');
      tempDate3 = { key : tempDate3.format('DD/MM/YYYY'), value : tempDate3.format('dddd, MMMM DD YYYY')};
      let found = false;
      this.calDates.forEach((v,k) => {
          if(v.key == tempDate3.key) {
            found = true;
          }
      });
      if (found) {
        this.state = 'closed';
        setTimeout(() => {
          this.calSelectedDates = [];
          this.calSelectedDates.push(tempDate3);
          this.calSelectedDates.push(tempDate2);
          this.calSelectedDates.push(tempDate1);
          this.state = 'open';
        }, 1000);
      }
      this.spinnerService.hide();
    }
  }

  openSession(arg1, arg2, arg3, arg4) {
    console.log(arg1, arg2, arg3, arg4);
    let params = new URLSearchParams();
    params.set('time', arg3.key + ' ' + arg2.name);
    params.set('trackId', arg4);
    this.spinnerService.show();
    this.currentTrackSession = [];
    this.dataService.getSessionDataByTrack(params).subscribe(resp => {
        this.spinnerService.hide();
        this.currentTrackSession = resp.body['data'];
        this.modalService.open(arg1, { size: 'lg'}).result.then((result) => {

        }, (reason) => {

        });
    })
  }

  getToolTipForTrackSection(arg2, arg3, arg4) {
    // if(this.sessionTooltipRequestExecuting == true) {
    //   return;
    // }
    // this.sessionTooltipRequestExecuting = true;
    // let params = new URLSearchParams();
    // params.set('time', arg3.key + ' ' + arg2.name);
    // params.set('trackId', arg4);
    // this.dataService.getSessionDataByTrack(params).subscribe(resp => {
    //     this.sessionTooltipRequestExecuting = false;
    //     return resp.body['data'].length + 'Session associated with this track at this time.';
    // })
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


  getTrack(id) {
    var obj = {};
    this.tracks.forEach(function(v,k) {
        if(v.id == id) {
          obj = v;
        }
    })
    return obj;
  }

  getTrackBorderForCalendar(id) {
    var color = '#fff';
    this.tracks.forEach(function(v,k) {
        if(v.id == id) {
          color = v.color;
        }
    })
    return '7px solid '+color;
  }

  setBudgetLimit() {
    if(this.budgetLimit.value == null || this.budgetLimit.value == '') {

    } else {
      this.budgetLimit.value = parseInt(this.budgetLimit.value+'');
      if(isNaN(this.budgetLimit.value)) {
        this.budgetLimit.value = null;
      }
    }
  }

  getCartProgressMaxValue() {
    var total = 0;
    this.cartItems.forEach(function (v, k) {
      if(v.typeColor != null && v.typeColor != '') { //refering fees temporary
        total = total + parseInt(v.typeColor);
      }
    });
    var limit = parseInt(this.budgetLimit.value);
    var per = (total/limit)*100;
    if(per > 100) {
      this.cartProgressClass = 'progress-bar bg-danger';
      return '100%';
    } else {
      if(per > 90) {
        this.cartProgressClass = 'progress-bar bg-danger';
      } else if(per > 60){
        this.cartProgressClass = 'progress-bar bg-warning';
      } else {
        this.cartProgressClass = 'progress-bar bg-success';
      }
      return per+'%';
    }
  }

  getCartProgressMaxValueNew() {
    var total = 0;
    var limit = parseInt(this.budgetLimit.value);
    var per = (this.totalCartValue/limit)*100;
    if(per > 100) {
      this.cartProgressClass = 'progress-bar bg-danger';
      return '100%';
    } else {
      if(per > 90) {
        this.cartProgressClass = 'progress-bar bg-danger';
      } else if(per > 60){
        this.cartProgressClass = 'progress-bar bg-warning';
      } else {
        this.cartProgressClass = 'progress-bar bg-success';
      }
      return per+'%';
    }
  }

  constructor(private dataService: DataService, private spinnerService: Ng4LoadingSpinnerService, private modalService: NgbModal) {
    //  private spinnerService: Ng4LoadingSpinnerService,
  }

  showCart() {
    document.getElementById('mySidenav').style.width = '400px';
  }
  hideCart() {
    document.getElementById('mySidenav').style.width = '0px';
  }
  removeItemFee(item) {
    var index = this.cartItemsIds.indexOf(item.id);
    var tempItems = [];
    this.cartItemsIds.splice(index, 1);
    this.sessionData.forEach(function (v, k) {
      if(v.id == item.id) {
        v.isFav = false;
      }
    });
    this.cartItems.forEach(function (v, k) {
        if(v.id != item.id) {
          tempItems.push(v);
        }
    });
    if(item.typeColor != null) {
      var val = parseInt(item.typeColor);
      if(!isNaN(val)) {
        this.totalCartValue = this.totalCartValue - val;
      }
    }
    this.cartItems = tempItems;
  }
  addToCart(data) {
    if(data.isFav == null || data.isFav == false) {
      data.isFav = true;
      this.cartItemsIds.push(data.id);
      this.cartItems.push(data);
      if(data.typeColor != null) {
        var val = parseInt(data.typeColor);
        if(!isNaN(val)) {
          this.totalCartValue = this.totalCartValue + val;
        }
      }
    } else {
      data.isFav = false;
    }
  }

  setSortBy(field) {
    this.sortField = field;
    this.getSessionData();
  }

 

  SessionComponent() {
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
    this.dataService.getDistinctDatesForCalendar().subscribe(resp => {
      this.calDates = (resp.body['data']);
      var i = 0;
      this.calDates.forEach((v,k) => {
        if(i < 3) {
          this.calSelectedDates.push(v);
        }
        i++;
      });
    });

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
      this.tracks = resp.body['data'];
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
    this.totalCartValue = 0;
    this.loading = true;
    this.filterArrayObject['sortField'] = this.sortField;
    this.dataService.getData(this.filterArrayObject).subscribe(resp => {
      setTimeout(() => {
        this.spinnerService.hide();
        this.sessionData = resp.body['data'];
        this.maxDuration = resp.body['maxDuration'];
        this.listLoading = false;
        this.cartItems = [];
        this.cartItemsIds = [];
        this.distinctDates2 = ['Date/Time'];
        this.distinctDates = [];
        this.calData = {};
        this.sessionData.forEach((v, k) => {
            if (this.calData[v.startDateString] == null) {
              this.calData[v.startDateString] = {};
            }
            if (this.calData[v.startDateString][v.startTimeHour] == null) {
              this.calData[v.startDateString][v.startTimeHour] = [];
            }
            if (this.calData[v.startDateString][v.startTimeHour].indexOf(v.trackId) < 0) {
              this.calData[v.startDateString][v.startTimeHour].push(v.trackId);
            }
            if (this.distinctDates.indexOf(v.startDateString) < 0) {
              this.distinctDates.push(v.startDateString);
              this.distinctDates2.push(v.startDateString);
            }
            if (v.isFav == true) {
              this.cartItems.push(v);
              this.cartItemsIds.push(v.id);

              if (v.typeColor != null) {
                let val = parseInt(v.typeColor);
                if (!isNaN(val)) {
                  if (this.newCartData[v.startDateString] == null) {
                     this.newCartData[v.startDateString] = {};
                  }
                  if (this.newCartData[v.startDateString][v.startTimeString] == null) {
                    this.newCartData[v.startDateString][v.startTimeString] = [];
                  }
                  if (this.newCartItemsIds.indexOf(v.startDateString) < 0) {
                    this.newCartItemsIds.push(v.startDateString);
                  }
                  if (this.newCartTimes[v.startDateString] == null) {
                    this.newCartTimes[v.startDateString] = [];
                  }
                  if (this.newCartTimes[v.startDateString].indexOf(v.startTimeString) < 0) {
                    this.newCartTimes[v.startDateString].push(v.startTimeString);
                    this.newCartTimes[v.startDateString] = this.sortTimeArray(this.newCartTimes[v.startDateString]);
                  }

                  this.newCartData[v.startDateString][v.startTimeString].push(v);
                  this.totalCartValue = this.totalCartValue + val;
                }
              }
            }
            this.loading = false;
        });
        console.log(this.newCartData);
        this.sortDateArray();
      }, 500);
    });
  };

  sortDateArray() {
    this.newCartItemsIds.sort((a, b) => {
      if (moment(a, 'DD/MM/YYYY').valueOf() < moment(b, 'DD/MM/YYYY').valueOf()) {
        return -1;
      } else if (moment(a, 'DD/MM/YYYY').valueOf() > moment(b, 'DD/MM/YYYY').valueOf()) {
         return 1;
      } else {
        return 0;
      }
    });
  }

  sortTimeArray(data) {
    data = data.sort((a, b) => {
      if (moment('20/02/2018 ' + a, 'DD/MM/YYYY HH:mm').valueOf() < moment('20/02/2018 ' + b,  'DD/MM/YYYY HH:mm').valueOf()) {
        return -1;
      } else if (moment('20/02/2018 ' + a,  'DD/MM/YYYY HH:mm').valueOf() > moment('20/02/2018 ' + b,  'DD/MM/YYYY HH:mm').valueOf()) {
         return 1;
      } else {
        return 0;
      }
    });
    return data;
  }

  removeItemFeeNew(date, time, session) {
    const data = [];
    this.newCartData[date][time].forEach((v, k) => {
      console.log(v);
      if (v.id != session.id) {
          data.push(v);
      }
    });
    console.log(data)
    if (data.length == 0) {
      this.newCartTimes[date].splice(this.newCartTimes[date].indexOf(time), 1);
      delete this.newCartData[date][time];
    } else {
      this.newCartData[date][time] = data;
    }
    if ($.isEmptyObject(this.newCartData[date])) {
      this.newCartItemsIds.splice(this.newCartItemsIds.indexOf(date), 1);
    }
    if(session.typeColor != null) {
      const val = parseInt(session.typeColor);
      if (!isNaN(val)) {
        this.totalCartValue = this.totalCartValue - val;
      }
    }
    this.sortDateArray();
  }

  addToCartNew(data) {
    console.log(data);
    if(data.isFav == null || data.isFav == false) {
      data.isFav = true;
      if (data.typeColor != null) {
        const val = parseInt(data.typeColor);
        if (!isNaN(val)) {
          if (this.newCartData[data.startDateString] == null) {
             this.newCartData[data.startDateString] = {};
          }
          if (this.newCartData[data.startDateString][data.startTimeString] == null) {
            this.newCartData[data.startDateString][data.startTimeString] = [];
          }
          if (this.newCartItemsIds.indexOf(data.startDateString) < 0) {
            this.newCartItemsIds.push(data.startDateString);
          }
          if (this.newCartTimes[data.startDateString] == null) {
            this.newCartTimes[data.startDateString] = [];
          }
          if (this.newCartTimes[data.startDateString].indexOf(data.startTimeString) < 0) {
            this.newCartTimes[data.startDateString].push(data.startTimeString);
            this.newCartTimes[data.startDateString] = this.sortTimeArray(this.newCartTimes[data.startDateString]);
          }

          this.newCartData[data.startDateString][data.startTimeString].push(data);
          this.totalCartValue = this.totalCartValue + val;
        }
      }
    } else {
      data.isFav = false;
      this.removeItemFeeNew(data.startDateString, data.startTimeString, data);
    }
    this.sortDateArray();
  }

  getHours(min) {
    let h = parseInt('' + (min/60));
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
    this.setScrollBar();
    this.setDefaultFilterObject();
    $('#sidebar-btn').click();
    this.setFilters();
    this.getSessionData();
  }


}
