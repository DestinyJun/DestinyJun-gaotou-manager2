import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BtnOption, DrapData} from '../headerData.model';
import {TreeNode} from '../../../model/shared-model';
import {DataTree} from '../../basic-dialog/dialog.model';

@Component({
  selector: 'rbi-basic-btn',
  templateUrl: './basic-btn.component.html',
  styleUrls: ['./basic-btn.component.less']
})
export class BasicBtnComponent implements OnInit, OnChanges {

  @Input() public btnOption: BtnOption;
  @Output() public event = new EventEmitter<any>();
  @Output() public searchEvent = new EventEmitter<any>();
  @Output() public changeData = new EventEmitter<any>();
  @Input() public treeData: any;
  @Input() public drapData: DrapData;
  public dataTrees: DataTree[];
  public dataTree: DataTree = new DataTree();
  public treeDialog: boolean;
  public ServiceName: any;

  constructor() {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.btnOption.searchData.type === 'limit') {
      setTimeout(() => {
        this.ServiceName = this.treeData[0].systemName;
      }, 1000);
    }
  }
  public eventClick(e): void {
    this.event.emit(e);
  }

  // public  SearchClick(): void {
  //     this.searchEvent.emit({type: this.searchType, value: this.serchData});
  // }
  public initializeTree(data): any[] {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      // 修改属性名称
      if (data[i].hasOwnProperty('companyName')) {
        childnode.value = data[i].companyId;
        childnode.label = data[i].companyName;
        childnode.id = 1;
        if (childnode.value === 0) {
          childnode.selectable = true;
        } else {
          childnode.selectable = false;
        }
      } else if (data[i].hasOwnProperty('areaName')) {
        childnode.value = data[i].areaCode;
        childnode.label = data[i].areaName;
        childnode.id = 2;
        childnode.selectable = false;
      } else if (data[i].hasOwnProperty('serviceAreaName')) {
        childnode.value = data[i].serviceAreaId;
        childnode.label = data[i].serviceAreaName;
        childnode.id = 3;
        childnode.selectable = true;
      } else if (data[i].hasOwnProperty('operatorName')) {
        childnode.value = data[i].serviceAreaOperatorId;
        childnode.label = data[i].operatorName;
        childnode.id = 4;
        childnode.selectable = true;
      }

      // 追加子元素
      if (data[i].hasOwnProperty('companyMngPrvcTreeList')) {
        if (data[i].companyMngPrvcTreeList != null && data[i].companyMngPrvcTreeList.length !== 0) {
          childnode.children = this.initializeTree(data[i].companyMngPrvcTreeList);
        }
      } else if (data[i].hasOwnProperty('companyAreaInfoList')) {
        if (data[i].companyAreaInfoList != null && data[i].companyAreaInfoList.length !== 0) {
          childnode.children = this.initializeTree(data[i].companyAreaInfoList);
        }
      } else if (data[i].hasOwnProperty('serviceAreaBasisInfoList')) {
        if (data[i].serviceAreaBasisInfoList != null && data[i].serviceAreaBasisInfoList.length !== 0) {
          childnode.children = this.initializeTree(data[i].serviceAreaBasisInfoList);
        }
      } else if (data[i].hasOwnProperty('operatorInfoList')) {
        if (data[i].operatorInfoList != null && data[i].operatorInfoList.length !== 0) {
          childnode.children = this.initializeTree(data[i].operatorInfoList);
        }
      } else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
  public initializeLimitTree(data): any[] {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      // 修改属性名称
      // if (data[i].hasOwnProperty('systemName')) {
      childnode.value = data[i].systemId;
      childnode.label = data[i].systemName;
      childnode.id = 1;
      childnode.selectable = true;
      childnode.children = [];
      oneChild.push(childnode);
    }
    return oneChild;
  }

  public dataTreeSureClick(): void {
    // console.log();
    this.setData(this.dataTree);
    this.treeDialog = false;
  }

  public setData(data): void {
    this.ServiceName = data.label;
    console.log(data);
    this.searchEvent.emit(data.value);
  }

  public showDataTree(): void {
    if (this.btnOption.searchData.type === 'store') {
      this.dataTrees = this.initializeTree(this.treeData);
    } else if (this.btnOption.searchData.type === 'limit') {
      this.dataTrees = this.initializeLimitTree(this.treeData);
    }
    this.treeDialog = true;
  }

  public  dataChange(e): void {
    console.log(e);
    this.changeData.emit(e.value);
  }
}
