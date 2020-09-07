import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TableeBtn} from '../table.model';

@Component({
  selector: 'rbi-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.less']
})
export class TreeTableComponent implements OnInit, OnChanges {

  @Input()
  public treeTableOption: {
    width: any;
    header: any;
    Content: any;
    btnHidden?: any;
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
    // if (this.option) {
    //   console.log(this.option);
    // }
    // console.log(this.treeTableOption);

  }
  // public  DetailClick(e): void {
  //   // console.log(e);
  //   this.detail.emit(e);
  // }
  // select Data
  public  selectClick(e): void {
    this.selectData.emit(this.select);
  }
  // cancel select data
  public  noSelectClick(e): void {
    this.selectData.emit(this.select);
  }
}
