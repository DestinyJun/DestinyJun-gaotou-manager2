import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rbi-upload-file-record',
  templateUrl: './upload-file-record.component.html',
  styleUrls: ['./upload-file-record.component.less']
})
export class UploadFileRecordComponent implements OnInit {

  @Input()
  public uploadRecordOption: {
    width: any,
    dialog: boolean,
    title: any,
    totalNumber: any,
    realNumber: any
    uploadOption: any,
  };
  constructor() { }

  ngOnInit() {
  }

}
