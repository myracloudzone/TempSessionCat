import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckInComponent implements OnInit {
  questions = {'title' : 'When are you going back to India?', 'type' : 'TextArea'};
  constructor() { }
  toogleDivById(id) {
    $('#'+id).toggle();
  }
  ngOnInit() {
  }

}
