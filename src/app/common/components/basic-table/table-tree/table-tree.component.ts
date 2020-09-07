import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'rbi-table-tree',
  templateUrl: './table-tree.component.html',
  styleUrls: ['./table-tree.component.less']
})
export class TableTreeComponent implements OnInit, OnChanges{

  @Input()
  public treeTableOption: {
    width: any;
    header: any;
    Content: any;
    headerHidden?: any;
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
}
