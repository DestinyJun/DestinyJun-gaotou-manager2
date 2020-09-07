import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { PopData, TableOption} from '../basic-dialog.model';

@Component({
  selector: 'rbi-detail-pop',
  templateUrl: './detail-pop.component.html',
  styleUrls: ['./detail-pop.component.less']
})
export class DetailPopComponent implements OnInit, OnChanges {

  @Input()
  public dialogOption: {
    title?: any;
    width?: any;
    dialog?: any;
    tableHidden?: boolean;
    poplist?: PopData;
    tablelist?: TableOption;
  };
  // @Output()
  // public event: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  public  CloseClick(): void {
    this.dialogOption.dialog = false;
  }
}
