import { Component, OnInit } from '@angular/core';
import {BtnOption, DrapData, SearchData} from '../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../common/components/paging/paging.model';
import {FormValue, TreeClass} from '../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {AddDepart} from '../../common/model/org-model';
import {OrgService} from '../../common/services/org.service';
import {PublicMethedService} from '../../common/tool/public-methed.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {RoleService} from '../../common/services/role.service';
import {Limit, LimitData} from '../../common/model/limit-model';
import {TreeNode} from '../../common/model/shared-model';
import {Area, Data} from '../../common/model/area-model';
import {AddRole, Role, RoleData} from '../../common/model/role.model';
import {on} from 'cluster';
import {Children} from '../../common/components/basic-table/table.model';

@Component({
  selector: 'rbi-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public roleSelect: any[] = [];
  public roleTableOption: any;
  public pageOption: PagingOption = new PagingOption();
  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public roleTree: TreeClass = new TreeClass();
  public roleTreeCheck: any;
  public modifyRole: AddRole = new AddRole();
  public addRole: AddRole = new AddRole();
  public roleOption: any[] = [];
  public searchData: SearchData = new SearchData();
  public drapData: DrapData = new DrapData();
  public pageNo = 1;
  public companyID: any;
  public tableData: any[] = [];
  public checkList: any[] = [];
  public roleChildren: Children = new Children();
  constructor(
    private roleSrv: RoleService,
    private toolSrv: PublicMethedService,
    private localSrv: LocalStorageService,
    private datePie: DatePipe
  ) { }

  ngOnInit() {
    this.btnOption.btnlist = [
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
    ];
    this.roleTree.type = 'role';
    this.searchData.width = '19vw';
    this.searchData.searchHidden = false;
    this.btnOption.searchData = this.searchData;
    // 权限表的表头
    this.roleChildren.header = [
      {field: 'permissionName', header: '权限名称'},
      {field: 'systemName', header: '系统名称'},
      {field: 'enabled', header: '是否启用'},
      // {field: 'description', header: '描述'},
      // {field: 'idt', header: '日期'},
    ];
    this.getRoleConfig();
  }
  // select data （选择数据）
  public  selectData(e): void {
    console.log(e);
    this.roleSelect = e;
  }
  // set table data (设置表格数据)
  public setTableOption(tabledata): void {
    this.roleChildren.content = [];
    this.roleTableOption = {
      width: '100%',
      header: [
        {field: 'roleName', header: '角色名称'},
        {field: 'deptName', header: '部门名称'},
        {field: 'enabled', header: '是否启用'},
        {field: 'idt', header: '日期'},
      ],
      Content: tabledata,
      children: this.roleChildren,
      btnHidden: false,
    };
  }
  // Paging query (分页查询)
  public queryRoleData(data, id): void {
    this.roleSrv.queryRolePageData({currentPage: data, pageSize: 10, companyId: id}).subscribe(
      value => {
        console.log(value);
        // 判断状态码函数
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.roleSelect = [];
          this.tableData = [];
          value.pagingQueryData.datas.forEach((v, index) => {
            this.tableData.push(
              {companyDeptRoleId: v.companyDeptRoleId,
              roleName: v.roleName,
              companyDeptId: v.companyDeptId,
              deptName: v.deptName,
              companyId: v.companyId,
              companyName: v.companyName,
              description: v.description,
              enabled: v.enabled === 1 ? '启用' : '禁用',
              idt: v.idt,
              id: index,
              content: this.tableTreeInitialize(value.pagingQueryData.datas)[index].children});
          });
          console.log(this.tableTreeInitialize(value.pagingQueryData.datas));
          this.setTableOption(this.tableData);
          this.pageOption = {nowpage: value.pagingQueryData.currentPage, row: value.pagingQueryData.pageSize, total: value.pagingQueryData.totalRecord};
        });
      }
    );
  }
  public  getRoleConfig(): void {
    this.roleSrv.getRoleConfigData({companyId: this.localSrv.get('companyId')}).subscribe(val => {
      this.toolSrv.setQuestJudgment(val.status, val.message, () => {
        console.log(val);
        val.organizationConfig.companyList.forEach(v => {
          this.roleOption.push({label: v.companyName, value: v.companyId});
        });
        this.roleTreeCheck = val.rolePermissionCofigs;
        this.roleTree.treeData = val.organizationConfig.companyList;
        this.drapData.option  = this.roleOption;
        this.drapData.value = this.companyID = this.roleOption[0].value;
        this.queryRoleData(this.pageNo, this.companyID);
      });
    });
  }

  public  showAddDialog(): void {
    console.log(this.roleTreeCheck);
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '800',
      dialog: true
    };
    const list = ['roleName', 'companyDeptId', 'description', 'permissionIds', 'enabled', 'name'];
    list.forEach(val => {
      if (val === 'enabled') {
        this.form.push({key: val, disabled: false, required: true, value: 1});
      } else if (val === 'description') {
        this.form.push({key: val, disabled: false, required: false, value: ''});
      } else {
        this.form.push({key: val, disabled: false, required: true, value: ''});
      }
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '角色名称', type: 'input', name: 'roleName', option: '', placeholder: '请输入角色名称'},
      {label: '部门', type: 'tree', name: 'name', option: '', placeholder: '请选择部门'},
      {
        label: '是否启用',
        type: 'radio',
        name: 'enabled',
        option: '',
        placeholder: '',
        value: [
          {label: '启用', name: 'enabled', value: 1, group: 'group'},
          {label: '禁用', name: 'enabled', value: 0, group: 'group'},
        ]
      },
      {label: '角色描述', type: 'textbox', name: 'description', option: '', placeholder: '请输入描述'},
      {label: '权限选择', type: 'checktree', name: 'permissionIds', option: '',
        style: {width: '100%', height: '250px'}, value: this.checkTreeInitialize(this.roleTreeCheck)
      },
    ];
  }

  public  addRoleRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.roleSrv.addRoleData(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryRoleData(this.pageNo, this.companyID);
            this.dialogOption.dialog = false;
            this.roleSelect = [];
            this.formdata = [];
            this.form = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }

  public  showmodifyRoleDialog(): void {
    if (this.roleSelect.length === 0 || this.roleSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if ( this.roleSelect.length === 1) {
      this.getTreeValue(this.roleSelect[0].content);
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '800',
        dialog: true
      };
      const list = ['companyDeptRoleId', 'roleName', 'companyDeptId', 'description', 'permissionIds', 'enabled', 'name'];
      list.forEach(val => {
        if (val === 'enabled') {
          this.form.push({key: val, disabled: false, required: true, value: this.roleSelect[0][val] === '启用' ? 1 : 0});
        } else if (val === 'description') {
          this.form.push({key: val, disabled: false, required: false, value: this.roleSelect[0][val]});
        } else if (val === 'name') {
          this.form.push({key: val, disabled: false, required: false, value: this.roleSelect[0]['deptName']});
        } else {
          this.form.push({key: val, disabled: false, required: true, value: this.roleSelect[0][val]});
        }
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '角色名称', type: 'input', name: 'roleName', option: '', placeholder: '请输入角色名称'},
        {label: '部门', type: 'tree', name: 'name', option: '', placeholder: '请选择部门'},
        {
          label: '是否启用',
          type: 'radio',
          name: 'enabled',
          option: '',
          placeholder: '',
          value: [
            {label: '启用', name: 'enabled', value: 1, group: 'group'},
            {label: '禁用', name: 'enabled', value: 0, group: 'group'},
          ]
        },
        {label: '角色描述', type: 'textbox', name: 'description', option: '', placeholder: '请输入描述'},
        {label: '权限选择', type: 'checktree', name: 'permissionIds', option: '',
          style: {width: '100%', height: '250px'}, value: this.checkTreeInitialize(this.roleTreeCheck), check: this.checkList
        },
      ];
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  public  modifyStoryRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.roleSrv.updateRoleData(data).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryRoleData(this.pageNo, this.companyID);
            this.dialogOption.dialog = false;
            this.roleSelect = [];
            this.formdata = [];
            this.form = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }
  // btn click event  (button点击事件)
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.showAddDialog(); break;
      case '修改': this.showmodifyRoleDialog(); break;
      case '删除': this.deletedapart() ; break;
      default: break;
    }
  }
  // Pagination (分页)
  public  nowPageClick(e): void {
    this.pageNo = e;
    this.queryRoleData(this.pageNo, this.companyID);
  }
  // delete dapartInfo (删除公司信息)
  public  deletedapart(): void {
    if (this.roleSelect.length === 1) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.roleSrv.delRoleData({companyDeptRoleId: this.roleSelect[0].companyDeptRoleId}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.queryRoleData(this.pageNo, this.companyID);
              this.roleSelect = [];
            });
          }
        );
      });
    } else  {
      this.toolSrv.setToast('error', '操作失败', '请选择一项进行删除');
    }
  }
  // 弹窗点击确认事件
  public  eventClick(e): void {
    if (e === 'false') {
      this.dialogOption.dialog = false;
      this.roleSelect = [];
      this.formdata = [];
      this.form = [];
      this.formgroup.reset();
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            this.addRole[eKey] = e.value.value[eKey];
          }
          delete  this.addRole.name;
          this.addRoleRequest(this.addRole);
        } else  {
          for (const eKey in e.value.value) {
            this.modifyRole[eKey] = e.value.value[eKey];
          }
          console.log(this.modifyRole);
          delete this.modifyRole['name'];
          this.modifyStoryRequest(this.modifyRole);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
  // 获取下拉框的信息
  public  getDrapData(e): void {
    console.log(e);
    this.companyID = e;
    this.queryRoleData(this.pageNo, this.companyID);
  }

  // 递归调用重组权限结构
  public checkTreeInitialize(data): any {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      if (data[i].hasOwnProperty('permissionName')) {
        childnode.value = data[i].permissionId;
        childnode.label = data[i].permissionName;
        childnode.type = 2;
      } else {
          childnode.value = data[i].systemId;
          childnode.label = data[i].systemName;
          childnode.type = 1;
      }
      childnode.check = false;
      // 追加子元素
      if (data[i].hasOwnProperty('permissionTreeInfoList')) {
        if (data[i].permissionTreeInfoList != null && data[i].permissionTreeInfoList.length !== 0) {
          childnode.children = this.checkTreeInitialize(data[i].permissionTreeInfoList);
        }else {
          childnode.children = [];
        }
      } else if (data[i].hasOwnProperty('sysPermissionList')) {
        if (data[i].sysPermissionList != null && data[i].sysPermissionList.length !== 0) {
          childnode.children = this.checkTreeInitialize(data[i].sysPermissionList);
        }else {
          childnode.children = [];
        }
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }

  // 递归调用重组分页数据结构
  public tableTreeInitialize(data): any {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new Role();
      const datanode  = new RoleData();
      // if (data[i].hasOwnProperty('companyId')) {
      //   console.log(123);
      //   datanode.deptName = data[i].deptName;
      //   datanode.name = data[i].roleName;
      // } else
      if (data[i].hasOwnProperty('permissionName')) {
        datanode.permissionName = data[i].permissionName;
        datanode.permissionId = data[i].permissionId;
        datanode.idt = data[i].idt;
        datanode.systemName = data[i].systemName;
        datanode.enabled = data[i].enabled === 1 ? '启用' : '禁用';
      }
      if (data[i].hasOwnProperty('rolePermissionInfoList')) {
        if (data[i].rolePermissionInfoList != null && data[i].rolePermissionInfoList.length !== 0) {
          childnode.children = this.tableTreeInitialize(data[i].rolePermissionInfoList);
        }
      } else if (data[i].hasOwnProperty('rolePermissionInfos')) {
        if (data[i].rolePermissionInfos != null && data[i].rolePermissionInfos.length !== 0) {
          childnode.children = this.tableTreeInitialize(data[i].rolePermissionInfos);
        }
      }else {
        childnode.children = [];
      }
      childnode.data = datanode;
      oneChild.push(childnode);
    }
    return oneChild;
  }

 // 选中状态
   public  getTreeValue(data): void {
    if (data !== undefined) {
      for (let i = 0; i < data.length; i++) {
        this.checkList.push(data[i].data.permissionId);
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
