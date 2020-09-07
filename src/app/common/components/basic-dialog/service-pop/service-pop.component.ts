import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DataTree, DialogModel, FromData} from '../dialog.model';
import {FormGroup} from '@angular/forms';
import {TreeNode} from '../../../model/shared-model';
import {PublicMethedService} from '../../../tool/public-methed.service';

@Component({
  selector: 'rbi-service-pop',
  templateUrl: './service-pop.component.html',
  styleUrls: ['./service-pop.component.less']
})
export class ServicePopComponent implements OnInit, OnChanges {

  @Input()
  public dialogOption: DialogModel = new DialogModel();
  @Output()
  public eventClick = new EventEmitter<any>();
  @Output()
  public delBtnClick = new EventEmitter<any>();
  @Output()
  public blurClick = new EventEmitter<any>();

  @Output()
  public ChangeDataClick = new EventEmitter<any>();
  @Input()
  public formContrl: FormGroup;
  @Input()
  public formdata: FromData = new FromData();
  @Input()
  public treeData: any;
  public dataTrees: DataTree[];
  public dataTree: DataTree = new DataTree();
  public treeDialog: boolean;
  public disable = true;
  public flag = 0;
  public esDate = {
    firstDayOfWeek: 0,
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    clear: '清除'
  };
  constructor(
    private toolSrv: PublicMethedService
  ) { }

  ngOnInit() {
    // this.dialog = false;
  }
  // dialog sure
  public  SureClick(): void {
    this.eventClick.emit({type: this.dialogOption.title, value: this.formContrl, invalid: !this.formContrl.invalid});

  }
  // input click event
  public  inputData(): void {
  }
  // Close the dialog
  public  CloseClick(): void {
    this.eventClick.emit('false');
    this.flag = 0;
  }
  // Initialization tree structure
  public  dataTreeClick(): void {
    this.dataTrees = this.initializeTree(this.treeData);
    console.log(this.dataTrees);
    this.treeDialog = true;
  }
  // Tree structure is not selected
  public  treeOnNodeSelect(e): void {
    console.log(e);
  }
  // Confirm selected data
  public  dataTreeSureClick(): void {
    this.setData(this.dataTree);
    this.treeDialog = false;
    this.flag = 0;
  }
  // The life cycle onChanges
  ngOnChanges(changes: SimpleChanges): void {
    // if (this.treeData) {
    //   this.disable = true;
    // }
    // console.log(this.formdata.formList);
    console.log(this.treeData);
  }
  // Tree structure initialization
  // public initializeTree(data): any {
  //
  //   const oneChild = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const childnode = new TreeNode();
  //     childnode.value = data[i].code;
  //     childnode.label = data[i].name;
  //     if (data[i].villageChoose2DTO != null && data[i].villageChoose2DTO.length !== 0 ) {
  //       childnode.children = this.initializeTree(data[i].villageChoose2DTO);
  //     } else {
  //       childnode.children = [];
  //     }
  //     oneChild.push(childnode);
  //   }
  //   return oneChild;
  //
  // }
  public  initializeTree(data): any[] {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      if (data[i].hasOwnProperty('companyName')) {
        childnode.value = data[i].companyId;
        childnode.label = data[i].companyName;
        childnode.selectable = false;
      } else if (data[i].hasOwnProperty('areaName')) {
        if (data[i].hasOwnProperty('companyId')){
          console.log(data[i].areaName);
          childnode.value = data[i].areaCode;
          childnode.label = data[i].areaName;
          childnode.selectable = false;
        } else {
          console.log(data[i].areaName);
          childnode.value = data[i].areaCode;
          childnode.label = data[i].areaName;
          childnode.selectable = true;
        }
      } else if (data[i].hasOwnProperty('serviceAreaName')) {
        childnode.value = data[i].serviceAreaId;
        childnode.label = data[i].serviceAreaName;
        // childnode.selectable = true;
      }
      if (data[i].hasOwnProperty('companyMngPrvcTreeList')) {
        if (data[i].companyMngPrvcTreeList != null && data[i].companyMngPrvcTreeList.length !== 0 ) {
          childnode.children = this.initializeTree(data[i].companyMngPrvcTreeList);
        }
      } else if (data[i].hasOwnProperty('companyAreaInfoList')) {
        if (data[i].companyAreaInfoList != null && data[i].companyAreaInfoList.length !== 0 ) {
          childnode.children = this.initializeTree(data[i].companyAreaInfoList);
        }
      } else  if (data[i].hasOwnProperty('serviceAreaBasisInfoList')) {
        if (data[i].serviceAreaBasisInfoList != null && data[i].serviceAreaBasisInfoList.length !== 0 ) {
          childnode.children = this.initializeTree(data[i].serviceAreaBasisInfoList);
        }
      } else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
  // Set the value in the acquired tree
  public setData(data): void {
      this.formContrl.patchValue({areaCode: data.value});
      this.formContrl.patchValue({areaName: data.label});
  }
  // Input loses focus event
  public  inputBlur(e): void {
    const data = {name: e , value: this.formContrl};
    this.blurClick.emit(data);
  }
  // Dropdown box change event
  public  dataChange(e, value, option): void {
    const a = {};
    option.forEach(v => {
      if (this.formContrl.value[e] === v.value) {
        a[value] = v.label;
        this.formContrl.patchValue(a);
      }
    });
    const data = {name: e , value: this.formContrl};
    this.blurClick.emit(data);
  }

  public  deleteBtnClick(title, type, data, index): void {
      const a = {
        title:  title,
        type: type,
        index: index,
      };
      this.formContrl.removeControl(data.name);
      this.delBtnClick.emit(a);
  }
  public  dropDownChangeData(e, i, option): void {
    // const a = {};
    let labelname = '';
    option.forEach(v => {
      if (this.formContrl.value[e] === v.value) {
        labelname = v.label;
      }
    });
    const data = {name: e, label: labelname , index: i, form: this.formContrl};
    this.ChangeDataClick.emit(data);
  }
}
