import { GlobalVariableService } from '../../commonUtils/Services/GlobalVariableService/GlobalVariableService';
import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var Dropbox: any;

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  dropBoxOption = GlobalVariableService.dropBoxOptions;
  driveOption = GlobalVariableService.driveOptions;

  constructor() { }

  ngOnInit() {
  }

  dropBoxSuccessFn(files) {
    console.log(files)
    if (files) {
      const file = files[0];
      $('#my_image').attr('src',file.thumbnailLink);
    }
  }

  driveSuccessFn(files) {
    if (files) {
      const doc = files.docs[0];
      const file_id = doc.id;
      $('#my_image').attr('src','https://drive.google.com/uc?export=view&id='+file_id);
    }
  }
}
