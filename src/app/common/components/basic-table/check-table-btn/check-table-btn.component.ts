import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { TableeBtn} from '../table.model';

@Component({
  selector: 'rbi-check-table-btn',
  templateUrl: './check-table-btn.component.html',
  styleUrls: ['./check-table-btn.component.less']
})
export class CheckTableBtnComponent implements OnInit, OnChanges {
  @Input() public option: {
    width: any;
    header: any;
    Content: any;
    btnHidden?: any;
    tableList?: TableeBtn[];
  };
  @Output()
  public detail = new EventEmitter<number>();
  @Output()
  public selectData =  new EventEmitter<number>();
  @Input()
  public select: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
    }
  }
  public  DetailClick(e): void {
    // console.log(e);
    this.detail.emit(e);
  }
  // select Data
  public  selectClick(e): void {
    this.selectData.emit(this.select);
  }
  // cancel select data
  public  noSelectClick(e): void {
    this.selectData.emit(this.select);
  }

  public  checkClick(): void {
    this.selectData.emit(this.select);
  }
}
