import { Component, OnInit } from '@angular/core';
import {BtnOption, DrapData, SearchData} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue, TreeClass} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {AddCompany, AddDepart} from '../../../common/model/org-model';
import {OrgService} from '../../../common/services/org.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'rbi-dapart',
  templateUrl: './dapart.component.html',
  styleUrls: ['./dapart.component.less']
})
export class DapartComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public dapartSelect: any[] = [];
  public dapartTableOption: any;
  public pageOption: PagingOption = new PagingOption();
  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public dapartTree: TreeClass = new TreeClass();
  public modifyDapart: AddDepart = new AddDepart();
  public addDapart: AddDepart = new AddDepart();
  public dapartOption: any[] = [];
  public searchData: SearchData = new SearchData();
  public drapData: DrapData = new DrapData();
  public pageNo = 1;
  public companyID: any;
  constructor(
    private dapartSrv: OrgService,
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
    this.searchData.width = '19vw';
    this.dapartTree.type = 'depart';
    this.searchData.searchHidden = false;
    this.btnOption.searchData = this.searchData;
    this.getdapartConfig();
  }
  // select data （选择数据）
  public  selectData(e): void {
    this.dapartSelect = e;
    console.log(e);
  }
  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.dapartTableOption = {
      width: '100%',
      header: [
        {field: 'deptName', header: '部门名称'},
        {field: 'companyDeptId', header: '部门ID'},
        {field: 'parentName', header: '父级部门'},
        {field: 'companyName', header: '公司名称'},
        {field: 'idt', header: '日期'},
      ],
      Content: data,
      btnHidden: false,
    };
  }
  // Paging query (分页查询)
  public querydapartData(data, id): void {
    this.dapartSrv.queryDapartPageData({currentPage: data, pageSize: 10, companyId: id}).subscribe(
      value => {
        console.log(value);
        // 判断状态码函数
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.dapartSelect = [];
          // 设置父级部门
          value.pagingQueryData.datas.forEach(v => {
            v.parentName  = v.parentName === null ? v.companyName : v.parentName;
          });
          this.setTableOption(value.pagingQueryData.datas);
          this.pageOption = {nowpage: value.pagingQueryData.currentPage, row: value.pagingQueryData.pageSize, total: value.pagingQueryData.totalRecord};
        });
      }
    );
  }
  public  getdapartConfig(): void {
    this.dapartSrv.getDapartConfigData({companyId: this.localSrv.get('companyId')}).subscribe(val => {
      this.toolSrv.setQuestJudgment(val.status, val.message, () => {
        val.organizationConfig.companyList.forEach(v => {
          this.dapartOption.push({label: v.companyName, value: v.companyId});
        });
        this.dapartTree.treeData = val.organizationConfig.companyList;
        this.drapData.option  = this.dapartOption;
        this.drapData.value = this.companyID = this.dapartOption[0].value;
        this.querydapartData(this.pageNo, this.companyID);
      });
    });
  }

  public  showAddDialog(): void {
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '800',
      dialog: true
    };
    const list = ['deptName', 'companyId', 'parentId', 'name'];
    list.forEach(val => {
        this.form.push({key: val, disabled: false, required: false, value: ''});
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '部门名称', type: 'input', name: 'deptName', option: '', placeholder: '请输入公司名称'},
      {label: '父级公司/部门', type: 'tree', name: 'name', option: '', placeholder: '请选择父级公司/部门'},
    ];
  }

  public  addDapartRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.dapartSrv.addDapartData(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.querydapartData(this.pageNo, this.companyID);
            this.dialogOption.dialog = false;
            this.dapartSelect = [];
            this.formdata = [];
            this.form = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }
  public  showmodifyDapartDialog(): void {
    if (this.dapartSelect.length === 0 || this.dapartSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if ( this.dapartSelect.length === 1) {
      console.log(this.dapartSelect);
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '800',
        dialog: true
      };
      const list = ['deptName', 'companyId', 'parentId', 'name'];
      list.forEach(val => {
        if (val === 'name'){
          this.form.push({key: val, disabled: false, required: false, value: this.dapartSelect[0]['parentName'] === null ? this.dapartSelect[0]['compayName'] : this.dapartSelect[0]['parentName']});
        }else {
          this.form.push({key: val, disabled: false, required: false, value: this.dapartSelect[0][val]});

        }
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '部门名称', type: 'input', name: 'deptName', option: '', placeholder: '请输入公司名称'},
        {label: '父级公司/部门', type: 'tree', name: 'name', option: '', placeholder: '请选择父级公司/部门'},
      ];
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  public  modifyStoryRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.dapartSrv.updateDapartData(data).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.querydapartData(this.pageNo, this.companyID);
            this.dialogOption.dialog = false;
            this.dapartSelect = [];
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
      case '修改': this.showmodifyDapartDialog(); break;
      case '删除': this.deletedapart() ; break;
      default: break;
    }
  }
  // Pagination (分页)
  public  nowPageClick(e): void {
    this.pageNo = e;
    this.querydapartData(this.pageNo, this.companyID);
  }
  // delete dapartInfo (删除公司信息)
  public  deletedapart(): void {
    if (this.dapartSelect.length === 1) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.dapartSrv.delDapartData({companyDeptId: this.dapartSelect[0].companyDeptId}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.querydapartData(this.pageNo, this.companyID);

              // this.formgroup.reset();
              this.dapartSelect = [];
            });
          }
        );
      });
    } else  {
      this.toolSrv.setToast('error', '操作失败', '请选择一项进行删除');
    }
  }
  public  eventClick(e): void {
    if (e === 'false') {
      this.dialogOption.dialog = false;
      this.dapartSelect = [];
      this.formdata = [];
      this.form = [];
      this.formgroup.reset();
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            this.addDapart[eKey] = e.value.value[eKey];
          }
          console.log(this.addDapart);
          delete this.addDapart['name'];
          this.addDapartRequest(this.addDapart);
        } else  {
          for (const eKey in e.value.value) {
            this.modifyDapart[eKey] = e.value.value[eKey];
          }
          console.log(this.modifyDapart);
          delete this.modifyDapart['name'];
          this.modifyStoryRequest(this.modifyDapart);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
  // 获取下拉框的信息
  public  getDrapData(e): void {
    this.companyID = e;
    this.querydapartData(this.pageNo, this.companyID);
  }
}
