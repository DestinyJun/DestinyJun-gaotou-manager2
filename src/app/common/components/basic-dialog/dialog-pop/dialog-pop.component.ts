import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DataTree, DialogModel, FromData, FromDataDialog, TreeClass} from '../dialog.model';
import {FormGroup} from '@angular/forms';
import {TreeNode} from '../../../model/shared-model';
import {Area, Data} from '../../../model/area-model';
import {PublicMethedService} from '../../../tool/public-methed.service';

@Component({
  selector: 'rbi-dialog-pop',
  templateUrl: './dialog-pop.component.html',
  styleUrls: ['./dialog-pop.component.less']
})
export class DialogPopComponent implements OnInit, OnChanges {

  @Input() public dialogOption: DialogModel = new DialogModel();
  @Output() public eventClick = new EventEmitter<any>();
  @Output() public blurClick = new EventEmitter<any>();
  @Input() public formContrl: FormGroup;
  @Input() public formdata: FromDataDialog[];
  @Input() public treeData: TreeClass = new TreeClass();
  @Input() public checkTree: any[];
  public checkTreeData: any[] = [];
  public dataTrees: DataTree[];
  public dataTree: DataTree = new DataTree();
  public treeDialog: boolean;
  public disable = true;
  public parentLabel: any;
  public checkTreeDialog: boolean;
  public flag = 0;
  public checkList = [];
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

  constructor() {}

  ngOnInit() {}

  // 弹窗确认
  public SureClick(): void {
    if (this.treeData) {
      if (this.treeData.type === 'role') {
        const ids = [];
        this.checkTreeData.forEach(v => {
          if (v.type === 2) {
            ids.push(v.value);
          }
        });
        // 去重
        const setids = new Set(ids);
        this.formContrl.patchValue({permissionIds: [...setids]});
      } else if (this.treeData.type === 'user') {
        const ids = [];
        this.checkTreeData.forEach(v => {
          if (v.type === 2) {
            ids.push(v.value);
          }
        });
        // 去重
        const userids = new Set(ids);
        this.formContrl.patchValue({companyDeptRoleId: [...userids]});
      }
    }
    this.eventClick.emit({
      type: this.dialogOption.title,
      value: this.formContrl,
      invalid: !this.formContrl.invalid
    });
  }

  // input click event
  public inputData(): void {
  }

  // 弹窗关闭
  public CloseClick(): void {
    this.eventClick.emit('false');
    this.flag = 0;
  }

  // 树选择
  public dataTreeClick(): void {
    if (this.treeData.type === 'store') {
      this.dataTrees = this.initializeTree(this.treeData.treeData);
    } else if (this.treeData.type === 'limit') {
      this.dataTrees = this.initializeLimitTree(this.treeData.treeData);
    } else if (this.treeData.type === 'depart') {
      this.dataTrees = this.initializeDepartTree(this.treeData.treeData);
    } else if (this.treeData.type === 'role') {
      this.dataTrees = this.initializeRoleTree(this.treeData.treeData);
    } else {
      console.log(123);
      this.dataTrees = this.initializeTree(this.treeData.treeData);
    }
    this.treeDialog = true;
  }

  // 树节点选择
  public treeOnNodeSelect(e): void {
    console.log(e);
  }

  // 确认树选择
  public dataTreeSureClick(): void {
    this.setData(this.dataTree);
    this.treeDialog = false;
    this.flag = 0;
  }

  public initializeTree(data): any[] {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      if (data[i].hasOwnProperty('companyName')) {
        childnode.value = data[i].companyId;
        childnode.label = data[i].companyName;
        childnode.id = 1;
        childnode.selectable = false;
      } else if (data[i].hasOwnProperty('areaName')) {
        childnode.value = data[i].areaCode;
        childnode.label = data[i].areaName;
        childnode.id = 2;
        childnode.selectable = false;
      } else if (data[i].hasOwnProperty('serviceAreaName')) {
        childnode.value = data[i].serviceAreaId;
        childnode.label = data[i].serviceAreaName;
        childnode.id = 3;
        childnode.selectable = this.treeData.type !== 'cash';
      } else if (data[i].hasOwnProperty('operatorName')) {
        childnode.selectable = !(data[i].children != null && data[i].children.length !== 0);
        childnode.value = data[i].serviceAreaOperatorId;
        childnode.label = data[i].operatorName;
        childnode.id = 4;

      } else if (data[i].hasOwnProperty('label')) {
        childnode.value = data[i].id;
        childnode.label = data[i].label;
        childnode.id = 5;
        childnode.selectable = false;
      } else if (data[i].hasOwnProperty('storeId')) {
        childnode.value = data[i].storeId;
        childnode.label = data[i].storeName;
        childnode.id = 6;
        childnode.selectable = true;
      }

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
      } else if (data[i].hasOwnProperty('children')) {
        if (data[i].children != null && data[i].children.length !== 0) {
          childnode.children = this.initializeTree(data[i].children);
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
      if (!data[i].hasOwnProperty('parentId')) {
        childnode.value = data[i].systemId;
        childnode.label = data[i].systemName;
        childnode.parentCode = -1;
        childnode.id = 1;
        childnode.selectable = true;
      } else if (data[i].hasOwnProperty('parentId')) {
        childnode.value = data[i].permissionId;
        childnode.label = data[i].permissionName;
        childnode.parentCode = data[i].systemId;
        // childnode.parentId = data[i].parentId;
        childnode.id = 2;
        childnode.selectable = true;
      }
      // 追加子元素
      if (data[i].hasOwnProperty('permissionTreeInfoList')) {
        if (data[i].permissionTreeInfoList != null && data[i].permissionTreeInfoList.length !== 0) {
          childnode.children = this.initializeLimitTree(data[i].permissionTreeInfoList);
        }
        } else if (data[i].hasOwnProperty('sysPermissionList')) {
          if (data[i].sysPermissionList != null && data[i].sysPermissionList.length !== 0) {
            childnode.children = this.initializeLimitTree(data[i].sysPermissionList);
          }
      } else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
  // depart 数据处理
  public initializeDepartTree(data): any[] {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      // 修改属性名称
      if (data[i].hasOwnProperty('companyName')) {
        childnode.value = data[i].companyId;
        childnode.label = data[i].companyName;
        childnode.id = 1;
        childnode.parentCode = 0;
        childnode.selectable = true;
      } else if (data[i].hasOwnProperty('deptName')) {
        childnode.value = data[i].companyDeptId;
        childnode.label = data[i].deptName;
        childnode.parentCode = data[i].companyId;
        childnode.id = 2;
        childnode.selectable = true;
      }
      // 追加子元素
      if (data[i].hasOwnProperty('deptList')) {
        if (data[i].deptList != null && data[i].deptList.length !== 0) {
          childnode.children = this.initializeDepartTree(data[i].deptList);
        }
      } else if (data[i].hasOwnProperty('sonDeptList')) {
        if (data[i].sonDeptList != null && data[i].sonDeptList.length !== 0) {
          childnode.children = this.initializeDepartTree(data[i].sonDeptList);
        }
      } else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
  // depart 数据处理
  public initializeRoleTree(data): any[] {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      // 修改属性名称
      if (data[i].hasOwnProperty('companyName')) {
        childnode.value = data[i].companyId;
        childnode.label = data[i].companyName;
        childnode.id = 1;
        childnode.parentCode = 0;
        childnode.selectable = false;
      } else if (data[i].hasOwnProperty('deptName')) {
        childnode.value = data[i].companyDeptId;
        childnode.label = data[i].deptName;
        childnode.parentCode = data[i].companyId;
        childnode.id = 2;
        childnode.selectable = true;
      }
      // 追加子元素
      if (data[i].hasOwnProperty('deptList')) {
        if (data[i].deptList != null && data[i].deptList.length !== 0) {
          childnode.children = this.initializeDepartTree(data[i].deptList);
        }
      } else if (data[i].hasOwnProperty('sonDeptList')) {
        if (data[i].sonDeptList != null && data[i].sonDeptList.length !== 0) {
          childnode.children = this.initializeDepartTree(data[i].sonDeptList);
        }
      } else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }

  public setData(data): void {
    if (this.treeData.type === 'store') {
      if (data.id === 3) {
        this.formContrl.patchValue({serviceAreaId: data.value});
        this.formContrl.patchValue({name: data.label});
        this.formContrl.patchValue({storeId: ''});
      } else if (data.id === 4) {
        this.formContrl.patchValue({serviceAreaOperatorId: data.value});
        this.formContrl.patchValue({name: data.label});
      } else if (data.id === 6) {
        this.formContrl.patchValue({storeId: data.value});
        this.formContrl.patchValue({name: data.label});
        this.formContrl.patchValue({serviceAreaId: data.parent.parent.parent.value});
      }
    } else if (this.treeData.type === 'limit') {
        this.formContrl.patchValue({name:  data.label});
        if (data.parentCode === -1) {
          this.formContrl.patchValue({systemId: data.value});
          this.formContrl.patchValue({parentId: 0});

        } else {
          this.formContrl.patchValue({systemId: data.parentCode});
          this.formContrl.patchValue({parentId: data.value});
        }
    } else if (this.treeData.type === 'depart') {
      if ( data.id === 1) {
        this.formContrl.patchValue({companyId: data.value});
        this.formContrl.patchValue({parentId: 0});
      } else {
        this.formContrl.patchValue({companyId: data.parentCode});
        this.formContrl.patchValue({parentId: data.value});
      }
      this.formContrl.patchValue({name:  data.label});
    } else if (this.treeData.type === 'role') {
      this.formContrl.patchValue({companyDeptId: data.value});
      this.formContrl.patchValue({name:  data.label});
    } else {
      if (data.id === 3) {
        this.formContrl.patchValue({serviceAreaId: data.value});
        this.formContrl.patchValue({name: data.label});
        this.formContrl.patchValue({storeId: ''});
      } else if (data.id === 4) {
        this.formContrl.patchValue({serviceAreaOperatorId: data.value});
        this.formContrl.patchValue({name: data.label});
      } else if (data.id === 6) {
        this.formContrl.patchValue({storeId: data.value});
        this.formContrl.patchValue({name: data.label});
        this.formContrl.patchValue({serviceAreaId: data.parent.parent.parent.value});
      }
    }
  }

  // Input loses focus event
  public inputBlur(e): void {
    const data = {name: e, value: this.formContrl};
    this.blurClick.emit(data);
  }

  // Dropdown box change event
  public dataChange(e, value, option): void {
    const a = {};
    option.forEach(v => {
      if (this.formContrl.value[e] === v.value) {
        a[value] = v.label;
        this.formContrl.patchValue(a);
      }
    });
    const data = {name: e, value: this.formContrl};
    this.blurClick.emit(data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dialogOption) {
      if (this.treeData !== undefined) {
        this.checkTreeData = [];
        if (this.treeData.type === 'role' && this.dialogOption.title === '修改信息') {
          this.formdata.forEach(v => {
            if (v.type === 'checktree') {
              this.checkNode(v.value, v.check);
            }
          });
        } else if (this.treeData.type === 'user' && this.dialogOption.title === '修改信息') {
          this.formdata.forEach(v => {
            if (v.type === 'checktree') {
              this.getTreeValue(v.check);
              this.parentLabel = v.check[0].data.companyName;
              let flag = 0;
              // 获取下标
              v.value.forEach((val, index) => {
                if (val.label === this.parentLabel) {
                  flag = index;
                }
              });
              const tree = this.checkTreeInitialize(v.value, 'add');
              tree.splice(flag, 0, v.value[flag]);
              v.value = tree;
              this.checkNode(v.value, this.checkList);
            }
          });
        }
      }

    }
  }
  // 还原选择的数据
  public  checkNode(nodes: TreeNode[], str: any[]): any {
    for (let i = 0 ; i < nodes.length ; i++) {
      if (!nodes[i].check) {
        for (let j = 0 ; j < nodes[i].children.length ; j++) {
          if (str.includes(nodes[i].children[j].value)) {
            if (!this.checkTreeData.includes(nodes[i].children[j])) {
              this.checkTreeData.push(nodes[i].children[j]);
            }
          }
        }
      }
      if (nodes[i].check) {
        return;
      }
      this.checkNode(nodes[i].children, str);
      const count = nodes[i].children.length;
      let c = 0;
      for (let j = 0 ; j < nodes[i].children.length ; j++) {
        if (this.checkTreeData.includes(nodes[i].children[j])) {
          c++;
        }
        if (nodes[i].children[j].partialSelected) { nodes[i].partialSelected = true; }
      }
      if (c === 0) {} else if (c === count) {
        nodes[i].partialSelected = false;
        if (!this.checkTreeData.includes(nodes[i])) {
          this.checkTreeData.push(nodes[i]);
        }
      } else {
        nodes[i].partialSelected = true;
      }
    }
  };
  // 多选框选择
  public  selectCheck(item, data): void {
    if (this.treeData.type === 'user') {
      this.getTreeParentValue(item.node);
      let flag = 0;
      data.forEach((v, index) => {
        if (v.label === this.parentLabel) {
          flag = index;
        }
      });
      const tree = this.checkTreeInitialize(data, 'add');
      tree.splice(flag, 0, data[flag]);
      this.formdata.forEach(value => {
        if (value.type === 'checktree') {
          value.value = tree;
        }
      });
    }
  }
  // 选中状态
  public getTreeParentValue(item): void {
    if (item.parent !== undefined) {
      this.getTreeParentValue(item.parent);
    } else {
      this.parentLabel = item.label;
    }
  }
  public  noSelect(data): void {
    if (this.treeData.type === 'user') {
      if (this.checkTreeData.length === 0) {
        this.parentLabel = '';
        const tree = this.checkTreeInitialize(data, 'less');
        this.formdata.forEach(value => {
          if (value.type === 'checktree') {
            value.value = tree;
          }
        });
      }
    }
  }
  // 递归调用重组权限结构
  public checkTreeInitialize(data, type): any {
    const oneChild = [];
    if (type === 'add') {
      for (let i = 0; i < data.length; i++) {
        if (data[i].label !== this.parentLabel) {
          const childnode = new TreeNode();
          childnode.value = data[i].value;
          childnode.label = data[i].label;
          childnode.type = data[i].type;
          childnode.selectable = false;
          childnode.check = false;
          // 追加子元素
          if (data[i].hasOwnProperty('children')) {
            if (data[i].children != null && data[i].children.length !== 0) {
              childnode.children = this.checkTreeInitialize(data[i].children, type);
            } else {
              childnode.children = [];
            }
          } else {
            childnode.children = [];
          }
          oneChild.push(childnode);
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const childnode = new TreeNode();
        childnode.value = data[i].value;
        childnode.label = data[i].label;
        childnode.type = data[i].type;
        if (data[i].type === 2) {
          childnode.selectable = true;
        } else {
          childnode.selectable = false;
        }
        childnode.check = false;
        // 追加子元素
        if (data[i].hasOwnProperty('children')) {
          if (data[i].children != null && data[i].children.length !== 0) {
            childnode.children = this.checkTreeInitialize(data[i].children, type);
          } else {
            childnode.children = [];
          }
        } else {
          childnode.children = [];
        }
        oneChild.push(childnode);
        }
    }
    return oneChild;
  }

  // 选中状态
  public  getTreeValue(data): void {
    if (data !== undefined) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].data.companyDeptRoleId) {
          this.checkList.push(data[i].data.companyDeptRoleId);
        }
        // 追加子元素
        if (data[i].hasOwnProperty('children')) {
          if (data[i].children != null && data[i].children.length !== 0) {
            this.getTreeValue(data[i].children);
          }
        }
      }
    } else {
      this.checkList = [];
    }
  }
}
