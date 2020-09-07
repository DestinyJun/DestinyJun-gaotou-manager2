import { Component, OnInit } from '@angular/core';
import {BtnOption, DrapData, SearchData} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue, TreeClass} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {AddDepart} from '../../../common/model/org-model';
import {OrgService} from '../../../common/services/org.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {UserService} from '../../../common/services/user.service';
import {Children} from '../../../common/components/basic-table/table.model';
import {Role, RoleData} from '../../../common/model/role.model';
import {TreeNode} from '../../../common/model/shared-model';
import {AddUser} from '../../../common/model/user.mode';

@Component({
  selector: 'rbi-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public userSelect: any[] = [];
  public userTableOption: any;
  public pageOption: PagingOption = new PagingOption();
  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public userTree: TreeClass = new TreeClass();
  public modifyUser: AddUser = new AddUser();
  public addUser: AddUser = new AddUser();
  public userOption: any[] = [];
  public searchData: SearchData = new SearchData();
  public drapData: DrapData = new DrapData();
  public pageNo = 1;
  public companyID: any;
  public userChildren: Children = new Children();
  public tableData: any[] = [];
  public userTreeCheck: any;
  public checkList: any[] = [];
  constructor(
    private userSrv: UserService,
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
    this.userTree.type = 'user';
    this.searchData.width = '19vw';
    this.searchData.searchHidden = false;
    this.btnOption.searchData = this.searchData;
    // 用户表表的表头
    this.userChildren.header = [
      {field: 'roleName', header: '角色名称'},
      {field: 'deptName', header: '部门名称'},
      {field: 'companyName', header: '公司名称'}
    ];
    this.getUserConfig();
  }
  // select data （选择数据）
  public  selectData(e): void {
    this.userSelect = e;
  }
  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.userChildren.content = [];
    this.userTableOption = {
      width: '100%',
      header: [
        {field: 'userName', header: '用户名称'},
        {field: 'realName', header: '真实名字'},
        {field: 'gender', header: '性别'},
        {field: 'telNumber', header: '电话号码'},
        {field: 'birthday', header: '出生日期'},
        {field: 'email', header: '邮箱'},
        {field: 'workType', header: '工作类型'},
        {field: 'address', header: '地址'},
        {field: 'idt', header: '日期'},
      ],
      Content: data,
      children: this.userChildren,
      btnHidden: false
    };
  }
  // Paging query (分页查询)
  public queryUserData(data, id): void {
    this.userSrv.queryUserPageData({currentPage: data, pageSize: 10, companyId: id}).subscribe(
      value => {
        console.log(value);
        // 判断状态码函数
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.userSelect = [];
          this.tableData = [];
          value.pagingQueryData.datas.forEach((v, index) => {
            this.tableData.push(
              {userCode: v.userCode,
                userName: v.userName,
                realName: v.realName,
                telNumber: v.telNumber,
                birthday: v.birthday,
                email: v.email,
                gender: v.gender === 1 ? '男' : '女',
                workType: v.workType,
                address: v.address,
                enabled: v.enabled === 1 ? '启用' : '禁用',
                idt: v.idt,
                id: index,
                content: this.tableTreeInitialize(value.pagingQueryData.datas)[index].children});
          });
          this.setTableOption(this.tableData);
          this.pageOption = {nowpage: value.pagingQueryData.currentPage, row: value.pagingQueryData.pageSize, total: value.pagingQueryData.totalRecord};
        });
      }
    );
  }
  public  getUserConfig(): void {
    this.userSrv.getUserConfigData({companyId: this.localSrv.get('companyId')}).subscribe(val => {
      console.log(val);
      this.toolSrv.setQuestJudgment(val.status, val.message, () => {
        val.userMngConfig.companyList.forEach(v => {
          this.userOption.push({label: v.companyName, value: v.companyId});
        });
        this.userTreeCheck = this.setTreeMiddleData(val.userMngConfig.companyList);
        this.userTree.treeData = val.userMngConfig.companyList;
        this.drapData.option  = this.userOption;
        this.drapData.value = this.companyID = this.userOption[0].value;
        this.queryUserData(this.pageNo, this.companyID);
      });
    });
  }

  public  showAddDialog(): void {
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '1000',
      dialog: true
    };
    const requireList = ['userName'];
    const list = ['userName', 'password', 'realName', 'telNumber', 'email', 'birthday', 'remark',
      'address', 'workType', 'gender', 'companyDeptRoleId', 'enabled'];
    list.forEach(val => {
      if (requireList.includes(val)) {
        this.form.push({key: val, disabled: false, required: true, value: ''});
      } else {
        if (val === 'gender' || val === 'enabled'){
          this.form.push({key: val, disabled: false, required: false, value: 1});

        } else {
          this.form.push({key: val, disabled: false, required: false, value: ''});
        }
      }
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '用户账号', type: 'input', name: 'userName', option: '', placeholder: '请输入用户名称'},
      {label: '密   码', type: 'input', name: 'password', option: '', placeholder: '请输入用户密码'},
      {label: '真实姓名', type: 'input', name: 'realName', option: '', placeholder: '请输入真实姓名'},
      {label: '手机号码', type: 'input', name: 'telNumber', option: '', placeholder: '请输入手机号码'},
      {label: '邮   箱', type: 'input', name: 'email', option: '', placeholder: '请输入邮箱'},
      {label: '出生日期', type: 'date', name: 'birthday', option: '', placeholder: '请输入出生日期'},
      {label: '地址', type: 'input', name: 'address', option: '', placeholder: '请输入地址'},
      {label: '工作类型', type: 'input', name: 'workType', option: '', placeholder: '请输入工作类型'},
      {
        label: '性别',
        type: 'radio',
        name: 'gender',
        option: '',
        placeholder: '',
        value: [
          {label: '男', name: 'gender', value: 1, group: 'group'},
          {label: '女', name: 'gender', value: 0, group: 'group'},
        ]
      },
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
      {label: '描 述', type: 'textbox', name: 'remark', option: '', placeholder: '请输入描 述'},
      {label: '角色匹配', type: 'checktree', name: 'permissionIds', option: '',
        style: {width: '100%', height: '250px'}, value: this.checkTreeInitialize(this.userTreeCheck)
      },
    ];
  }

  public  addUserRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.userSrv.addUserData(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryUserData(this.pageNo, this.companyID);
            this.dialogOption.dialog = false;
            this.userSelect = [];
            this.formdata = [];
            this.form = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }
  public  showmodifyUserDialog(): void {
    if (this.userSelect.length === 0 || this.userSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if ( this.userSelect.length === 1) {
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '1000',
        dialog: true
      };
      const requireList = ['userName'];
      const list = ['userCode', 'userName', 'password', 'realName', 'telNumber', 'email', 'birthday', 'remark',
        'address', 'workType', 'gender', 'companyDeptRoleId', 'enabled'];
      list.forEach(val => {
        if (requireList.includes(val)) {
          this.form.push({key: val, disabled: false, required: true, value: this.userSelect[0][val]});
        } else {
          if (val === 'gender') {
            this.form.push({key: val, disabled: false, required: false, value: this.userSelect[0][val] === '男' ? 1 : 0});

          } else if (val === 'enabled') {
            this.form.push({key: val, disabled: false, required: false, value:  this.userSelect[0][val] === '启用' ? 1 : 0});
          } else{
            this.form.push({key: val, disabled: false, required: false, value: this.userSelect[0][val]});
          }
        }
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '用户账号', type: 'input', name: 'userName', option: '', placeholder: '请输入用户名称'},
        {label: '密   码', type: 'input', name: 'password', option: '', placeholder: '请输入用户密码'},
        {label: '真实姓名', type: 'input', name: 'realName', option: '', placeholder: '请输入真实姓名'},
        {label: '手机号码', type: 'input', name: 'telNumber', option: '', placeholder: '请输入手机号码'},
        {label: '邮   箱', type: 'input', name: 'email', option: '', placeholder: '请输入邮箱'},
        {label: '出生日期', type: 'date', name: 'birthday', option: '', placeholder: '请输入出生日期'},
        {label: '地址', type: 'input', name: 'address', option: '', placeholder: '请输入地址'},
        {label: '工作类型', type: 'input', name: 'workType', option: '', placeholder: '请输入工作类型'},
        {
          label: '性别',
          type: 'radio',
          name: 'gender',
          option: '',
          placeholder: '',
          value: [
            {label: '男', name: 'gender', value: 1, group: 'group'},
            {label: '女', name: 'gender', value: 0, group: 'group'},
          ]
        },
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
        {label: '描 述', type: 'textbox', name: 'remark', option: '', placeholder: '请输入描 述'},
        {label: '角色匹配', type: 'checktree', name: 'permissionIds', option: '',
          style: {width: '100%', height: '250px'}, value: this.checkTreeInitialize(this.userTreeCheck), check: this.userSelect[0].content
        },
      ];
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  public  modifyStoryRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.userSrv.updateUserData(data).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryUserData(this.pageNo, this.companyID);
            this.dialogOption.dialog = false;
            this.userSelect = [];
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
      case '修改': this.showmodifyUserDialog(); break;
      case '删除': this.deletedapart() ; break;
      default: break;
    }
  }
  // Pagination (分页)
  public  nowPageClick(e): void {
    this.pageNo = e;
    this.queryUserData(this.pageNo, this.companyID);
  }
  // delete dapartInfo (删除公司信息)
  public  deletedapart(): void {
    if (this.userSelect.length === 1) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.userSrv.delUserData({userCode: this.userSelect[0].userCode}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.queryUserData(this.pageNo, this.companyID);
              this.userSelect = [];
            });
          }
        );
      });
    } else  {
      this.toolSrv.setToast('error', '操作失败', '请选择一项进行删除');
    }
  }
  // 递归调用重组分页数据结构
  public tableTreeInitialize(data): any {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new Role();
      const datanode  = new RoleData();
      if (data[i].hasOwnProperty('deptName')) {
        datanode.deptName = data[i].deptName;
        datanode.roleName = data[i].roleName;
        datanode.companyName = data[i].companyName;
        datanode.companyDeptRoleId = data[i].companyDeptRoleId;
        datanode.idt = data[i].idt;
      }
      if (data[i].hasOwnProperty('userRoleInfoList')) {
        if (data[i].userRoleInfoList != null && data[i].userRoleInfoList.length !== 0) {
          childnode.children = this.tableTreeInitialize(data[i].userRoleInfoList);
        } else {
          childnode.children = [];
        }
      }
      childnode.data = datanode;
      oneChild.push(childnode);
    }
    return oneChild;
  }

  // 递归调用重组权限结构
  public checkTreeInitialize(data): any {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new TreeNode();
      if (data[i].hasOwnProperty('companyName')) {
        childnode.value = data[i].companyId;
        childnode.label = data[i].companyName;
        childnode.type = 1;
        childnode.selectable = false;
      } else if (data[i].hasOwnProperty('label')) {
        childnode.value = data[i].id;
        childnode.label = data[i].label;
        childnode.type = 1;
        childnode.selectable = false;
      } else if (data[i].hasOwnProperty('deptName')) {
        childnode.value = data[i].companyDeptId + 'd';
        childnode.label = data[i].deptName;
        childnode.type = 1;
        childnode.selectable = false;
      } else {
        childnode.value = data[i].companyDeptRoleId;
        childnode.label = data[i].roleName;
        childnode.type = 2;
        childnode.selectable = true;
      }
      childnode.check = false;
      // 追加子元素
      if (data[i].hasOwnProperty('children')) {
        if (data[i].children != null && data[i].children.length !== 0) {
          childnode.children = this.checkTreeInitialize(data[i].children);
        } else {
          childnode.children = [];
        }
      } else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }



  // 弹窗确定事件
  public  eventClick(e): void {
    if (e === 'false') {
      this.dialogOption.dialog = false;
      this.userSelect = [];
      this.formdata = [];
      this.form = [];
      this.formgroup.reset();
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            this.addUser[eKey] = e.value.value[eKey];
          }
          if (this.addUser.birthday){
            this.addUser.birthday = this.datePie.transform(this.addUser.birthday, 'yy-MM-dd');
          }
          this.addUserRequest(this.addUser);
        } else  {
          for (const eKey in e.value.value) {
            this.modifyUser[eKey] = e.value.value[eKey];
          }
          console.log(this.modifyUser);
          delete this.modifyUser['name'];
          this.modifyStoryRequest(this.modifyUser);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
  // 获取下拉框的信息
  public  getDrapData(e): void {
    this.companyID = e;
    this.queryUserData(this.pageNo, this.companyID);
  }

  // 设置数据中间层
  public  setTreeMiddleData(data): any {
      for (let i = 0; i < data.length; i++) {
        data[i]['children'] = [];
        const list = [
          {id: 0, label: 'deptList', name: '父级部门'},
          {id: 1, label: 'sonDeptList', name: '部门'},
          {id: 2, label: 'roleList', name: '角色'}
        ];
        list.forEach(value => {
         if (data[i].hasOwnProperty(value.label)) {
            if (data[i][value.label]) {
              data[i]['children'].push({id: value.id, label: value.name,  children: data[i][value.label]});
            }
          }
        });
        // 追加子元素
        if (data[i].hasOwnProperty('deptList')) {
          if (data[i].deptList != null && data[i].deptList.length !== 0) {
            this.setTreeMiddleData(data[i].deptList);
          }
        }
        if (data[i].hasOwnProperty('sonDeptList')) {
          if (data[i].sonDeptList != null && data[i].sonDeptList.length !== 0) {
            this.setTreeMiddleData(data[i].sonDeptList);
          }
        }
      }
      return data;
    }
}
