import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FileOption} from '../basic-dialog.model';

@Component({
  selector: 'rbi-file-pop',
  templateUrl: './file-pop.component.html',
  styleUrls: ['./file-pop.component.less']
})
export class FilePopComponent implements OnInit, OnChanges {

  @Input()
  public UploadFileOption: FileOption = new FileOption();

  @Output()
  public event =  new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  public  UploadSureClick(): void {
    const fileData = new FormData();
    this.UploadFileOption.files.forEach(v => {
      fileData.append('file', v);
    });
    this.event.emit(fileData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.UploadFileOption);
  }
}
