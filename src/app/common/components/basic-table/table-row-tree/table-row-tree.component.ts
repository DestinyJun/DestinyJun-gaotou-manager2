import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Children } from '../table.model';

@Component({
  selector: 'rbi-table-row-tree',
  templateUrl: './table-row-tree.component.html',
  styleUrls: ['./table-row-tree.component.less']
})
export class TableRowTreeComponent implements OnInit, OnChanges {

  @Input()
  public treeTableOption: {
    width: any;
    header: any;
    Content: any;
    btnHidden?: any;
    children: Children
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
  }
  // select Data
  public  selectClick(e): void {
    this.selectData.emit(this.select);
  }

}
