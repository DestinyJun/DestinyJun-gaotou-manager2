import { Component, OnInit } from '@angular/core';
import {BtnOption, SearchData} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {AddArea, Area, Data, ExpandedData, ModifyArea} from '../../../common/model/area-model';
import {FormValue, TreeClass} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {AreaService} from '../../../common/services/area.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {LimitService} from '../../../common/services/limit.service';
import {AddLimit, Limit, LimitData} from '../../../common/model/limit-model';

@Component({
  selector: 'rbi-limit-authority',
  templateUrl: './limit-authority.component.html',
  styleUrls: ['./limit-authority.component.less']
})
export class LimitAuthorityComponent implements OnInit {

  public limitSelect: any[] = [];
  public limitTableOption: any;
  public btnOption: BtnOption = new BtnOption();
  public pageOption: PagingOption = new PagingOption();
  public addlimitOption: any;
  // add area Entity
  public addLimit: AddLimit = new AddLimit();
  public modifyLimit: AddLimit = new AddLimit();
  // show dialog
  public addformData: any[];
  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public searchData: SearchData = new SearchData();
  public expandedData: ExpandedData = new ExpandedData();
  public limitTree: any[] = [];
  public treeLimitData: TreeClass = new TreeClass();
  public systemID: any;
  public pageNo = 1;
  constructor(
    private areaSrv: AreaService,
    private toolSrv: PublicMethedService,
    private limitSrv: LimitService
  ) {
  }

  ngOnInit() {
    this.btnOption.btnlist = [
      // {label: '新增', src: 'assets/images/ic_add.png', style: {background: '#55AB7F', marginLeft: '2vw'} },
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
    ];
    this.treeLimitData.type = 'limit';
    this.searchData.width = '19vw';
    this.searchData.searchHidden = true;
    this.searchData.searchPlc = '请选择区域';
    this.btnOption.searchData = this.searchData;
    this.btnOption.searchData.type = 'limit';
    this.limitInitialization();
  }
  // areainfo Initialization
  public  limitInitialization(): void {
    this.queryLimitBasicData();
  }
  // select table  data
  public selectData(e): void {
    this.limitSelect = e;
    if (e.length !== 0) {
      if (e[0].parent !== null) {
        this.expandedData.id = e[0].parent.id;
        this.expandedData.type = '2';
      } else {
        this.expandedData.id = e[0].id;
        this.expandedData.type = '2';
      }
    }
  }
  // query area data page
  public queryLimitDataPage(data, systemID): void {
    this.limitSrv.queryLimitData({pageSize: 10, currentPage: data, systemId: systemID}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.limitSelect = [];
          this.setTableOption(this.tableTreeInitialize(value.pagingQueryData.datas));
          this.pageOption = {nowpage: value.pagingQueryData.currentPage, row: value.pagingQueryData.pageSize, total: value.pagingQueryData.totalPage};
        });
        // this.setTableOption(value)
      });
  }
  // query area basic data
  public  queryLimitBasicData(): void {
    this.limitSrv.queryLimitConfigData({}).subscribe(value => {
      // console.log(value);
      this.toolSrv.setQuestJudgment(value.status, value.msg, () => {
        this.limitTree = value.systemMenuPermissonList;
        this.treeLimitData.treeData = this.limitTree;
        this.systemID =  this.limitTree[0].systemId;
        this.queryLimitDataPage(this.pageNo,  this.systemID);
      });
    });
    // this.areaSrv.getLimitBaasicData({companyId: environment.companyId}).subscribe(
    //   value => {
    //     console.log(value);
    //     this.toolSrv.setQuestJudgment(value.status, value.message, () => {
    //       // value.
    //       value.companyData.forEach( v => {
    //         this.companyOption.push({label: v.companyName, value: v.companyId});
    //       });
    //       value.prvinceData.forEach( v => {
    //         this.prvinceOption.push({label: v.areaName, value: v.areaCode});
    //       });
    //     });
    //   });
  }
  // set table option
  public  setTableOption(data): void {
    console.log(data);
    this.limitTableOption = {
      width: '100%',
      header: [
        {field: 'permissionId', header: '权限id'},
        {field: 'permissionName', header: '权限名称'},
        {field: 'operateCode', header: '权限标识'},
        {field: 'enabled', header: '是否启用'},
        {field: 'idt', header: '添加时间'},
      ],
      Content: data,
      btnHidden: false,
      // tableList: [{label: '详情', color: '#6A72A1'}]
    };
  }
  // show add Limit dialog
  public  limitAddDialogClick(): void {
    console.log(123);
    this.addlimitOption = {
      type: 'add',
      title: '添加信息',
      width: '800',
      dialog: true
    };
    const list = ['permissionName', 'operateCode', 'parentId', 'systemId', 'enabled', 'name'];
    list.forEach(val => {
      if (val === 'enabled')  {
        this.form.push({key: val, disabled: false, required: true, value: 1});
      } else {
        this.form.push({key: val, disabled: false, required: true, value: ''});
      }
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.addformData = [
      {label: '权限名称', type: 'input', name: 'permissionName', option: '', placeholder: '请输入权限名称'},
      {label: '权限标识码', type: 'input', name: 'operateCode', option: '', placeholder: '请输入权限标识码'},
      {label: '父级权限', type: 'tree', name: 'name', option: '', placeholder: '请选择父级权限'},
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
    ];
  }
  // add area request
  public  limitAddRequest(): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.limitSrv.addLimitData(this.addLimit).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.clearData();
            this.queryLimitDataPage(this.pageNo, this.systemID);
          });
        }
      );
    });
  }
  // delete area info
  public  delLimitInfoClick(): void {
    if (this.limitSelect.length === 0 ) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要删除的项');

    } else if (this.limitSelect.length === 1) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        // console.log(this.areaSelect[0]);
        this.limitSrv.delLimitData({permissionId: this.limitSelect[0].data.permissionId}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.queryLimitDataPage(this.pageNo, this.systemID);
              // this.clearData();
              this.limitSelect = [];
            });
          }
        );
      });
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行删除');
    }

  }
  // modify Limit info
  public  limitModifyDialogClick(): void {
    if (this.limitSelect.length === 0 ) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');

    } else if (this.limitSelect.length === 1) {
      this.addlimitOption = {
        type: 'add',
        title: '修改信息',
        width: '800',
        dialog: true
      };
      const list = ['permissionId', 'permissionName', 'operateCode', 'parentId', 'systemId', 'enabled', 'name'];
      list.forEach(val => {
        if (val === 'enabled') {
          this.form.push({key: val, disabled: false, required: false, value: this.limitSelect[0].data[val] === '启用' ? 1 : 0});
        } else if (val === 'name') {
          this.form.push({key: val, disabled: false, required: false, value: this.limitSelect[0].data.parentName});
        } else if (val === 'parentId') {
          console.log(this.limitSelect[0].data.parentId);
          this.form.push({key: val, disabled: false, required: false, value: this.limitSelect[0].data.parentId});
        } else {
          this.form.push({key: val, disabled: false, required: false, value: this.limitSelect[0].data[val]});
        }
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.addformData = [
        {label: '权限名称', type: 'input', name: 'permissionName', option: '', placeholder: '请输入权限名称'},
        {label: '权限标识码', type: 'input', name: 'operateCode', option: '', placeholder: '请输入权限标识码'},
        {label: '父级权限', type: 'tree', name: 'name', option: '', placeholder: '请选择父级权限'},
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
      ];
      console.log(this.formgroup);

    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  // modify Limit request
  public  limitModifyRequest(): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.limitSrv.updateLimitData(this.modifyLimit).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryLimitDataPage(this.pageNo, this.systemID);
            this.clearData();
            this.limitSelect = [];
          });
        }
      );
    });
  }
  // btn click Event
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.limitAddDialogClick(); break;
      case '修改': this.limitModifyDialogClick(); break;
      case '删除': this.delLimitInfoClick(); break;
      default: break;
      // case '上传': this.uploadFileClick(); break;
    }
  }

  public  eventClick(e): void {
    console.log(e);
    if (e === 'false') {
      this.clearData();
      // this.formgroup.reset();
      // this.form = [];
      this.limitSelect = [];
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            this.addLimit[eKey] = e.value.value[eKey];
          }
          delete  this.addLimit[name];
          this.limitAddRequest();
        } else  {
          for (const eKey in e.value.value) {
            this.modifyLimit[eKey] = e.value.value[eKey];
          }
          delete this.modifyLimit['name'];
          console.log(this.modifyLimit);
          this.limitModifyRequest();
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
  // 递归调用重组数据结构
  public tableTreeInitialize(data): any {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode = new Limit();
      const datanode  = new LimitData();
      if (data[i].hasOwnProperty('permissionName')) {
        datanode.permissionName = data[i].permissionName;
        datanode.permissionId = data[i].permissionId;
        datanode.enabled = data[i].enabled === 1 ? '启用' : '禁用';
        datanode.parentId = data[i].parentId;
        datanode.systemId = data[i].systemId;
        // }
        datanode.operateCode = data[i].operateCode;

        if (data[i].systemName === null) {
          datanode.parentName = data[i].parentName;
        }else {
          datanode.parentName = data[i].systemName;
        }
        datanode.idt = data[i].idt;
      }
      if (data[i].hasOwnProperty('sysPermissionList')) {
        if (data[i].sysPermissionList != null && data[i].sysPermissionList.length !== 0) {
          childnode.children = this.tableTreeInitialize(data[i].sysPermissionList);
        }
      }else {
        childnode.children = [];
      }
      childnode.data = datanode;
      oneChild.push(childnode);
    }
    return oneChild;
  }

  public  nowPageClick(e): void {
    this.pageNo = e;
    this.queryLimitDataPage(this.pageNo, this.systemID);
  }
  // 树赛选
  public  treeClick(e): void {
      // console.log(e);
      this.systemID = e;
      this.queryLimitDataPage(this.pageNo, this.systemID);
  }
  // 清除数据
  public clearData(): void {
    this.addlimitOption.dialog = false;
    this.addformData = [];
    this.form = [];
    this.formgroup.reset();
  }
}
