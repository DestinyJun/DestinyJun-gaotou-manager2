import { Component, OnInit } from '@angular/core';
import {BtnOption, SearchData} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {OrgService} from '../../../common/services/org.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {AddCompany} from '../../../common/model/org-model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'rbi-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
})
export class CompanyComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public companySelect: any[] = [];
  public companyTableOption: any;
  public pageOption: PagingOption = new PagingOption();
  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public companyTree: any;
  public modifyCompany: AddCompany = new AddCompany();
  public addCompany: AddCompany = new AddCompany();
  public companyOption: any[] = [];
  public searchData: SearchData = new SearchData();
  public pageNo = 1;
  constructor(
    private companySrv: OrgService,
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
    this.searchData.searchHidden = false;
    this.btnOption.searchData = this.searchData;
    this.queryCompanyData(this.pageNo);
    this.getCompanyConfig();
  }
  // select data （选择数据）
  public  selectData(e): void {
    this.companySelect = e;
  }
  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.companyTableOption = {
      width: '100%',
      header: [
        {field: 'companyName', header: '公司名称'},
        {field: 'regNo', header: '注册号'},
        {field: 'legalPerson', header: '法人'},
        {field: 'fax', header: '传真'},
        {field: 'telNumber', header: '电话号码'},
        {field: 'email', header: '电子邮件'},
        {field: 'address', header: '地址'},
        {field: 'introduction', header: '介绍'},
        {field: 'scale', header: '规模'},
        {field: 'category', header: '类别'},
        {field: 'foundDate', header: '创建日期'},
      ],
      Content: data,
      btnHidden: false,
    };
  }
  // Paging query (分页查询)
  public queryCompanyData(data): void {
    this.companySrv.queryCompanyPageData({currentPage: data, pageSize: 10, companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.companySelect = [];
          this.setTableOption(value.pagingQueryData.datas);
          this.pageOption = {nowpage: value.pagingQueryData.currentPage, row: value.pagingQueryData.pageSize, total: value.pagingQueryData.totalRecord};
        });
      }
    );
  }
  public  getCompanyConfig(): void {
      this.companySrv.getCompanyConfigData({companyId: this.localSrv.get('companyId')}).subscribe(val => {
        this.toolSrv.setQuestJudgment(val.status, val.message, () => {
          val.companyData.forEach(v => {
            this.companyOption.push({label: v.companyName, value: v.companyId});
          });
          console.log( this.companyOption);
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
    const requirelist = ['companyName', 'foundDate'];
    const list = ['zipCode', 'regNo', 'latitude', 'longitude', 'legalPerson', 'address', 'companyName',  'foundDate'
   , 'fax', 'telNumber', 'email', 'scale', 'category', 'introduction', 'parentId'];
    list.forEach(val => {
      if (requirelist.includes(val)) {
        this.form.push({key: val, disabled: false, required: true, value: ''});
      } else {
        this.form.push({key: val, disabled: false, required: false, value: ''});
      }
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '公司名称', type: 'input', name: 'companyName', option: '', placeholder: '请输入公司名称'},
      {label: '父级公司', type: 'dropdown', name: 'parentId', option: this.companyOption, placeholder: '请选择父级公司'},
      {label: '注册号', type: 'input', name: 'regNo', option: '', placeholder: '请输入注册号'},
      {label: '公司法人', type: 'input', name: 'legalPerson', option: '', placeholder: '请输入公司法人'},
      {label: '电话号码', type: 'input', name: 'telNumber', option: '', placeholder: '请输入电话号码'},
      {label: '电子邮件', type: 'input', name: 'email', option: '', placeholder: '请输入电子邮件'},
      {label: '公司传真', type: 'input', name: 'fax', option: '', placeholder: '请输入公司传真'},
      {label: '邮政编码', type: 'input', name: 'zipCode', option: '', placeholder: '请输入邮政编码'},
      {label: '公司地址', type: 'input', name: 'address', option: '', placeholder: '请输入公司地址'},
      {label: '创建日期', type: 'date', name: 'foundDate', option: '', placeholder: '请输入创建日期'},
      {label: '公司规模', type: 'input', name: 'scale', option: '', placeholder: '请输入公司规模'},
      {label: '公司类别', type: 'input', name: 'category', option: '', placeholder: '请输入公司类别'},
      {label: '公司经度', type: 'input', name: 'latitude', option: '', placeholder: '请输入公司经度'},
      {label: '公司纬度', type: 'input', name: 'longitude', option: '', placeholder: '请输入公司纬度'},
      {label: '公司介绍', type: 'textbox', name: 'introduction', option: '', placeholder: '请输入公司介绍'},
    ];
  }

  public  addCompanyRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.companySrv.addCompanyData(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryCompanyData(this.pageNo);
            this.dialogOption.dialog = false;
            this.companySelect = [];
            this.formdata = [];
            this.form = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }
  public  showmodifyCompanyDialog(): void {
    if (this.companySelect.length === 0 || this.companySelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if ( this.companySelect.length === 1) {
      console.log(this.companySelect);
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '800',
        dialog: true
      };
      const requirelist = ['companyName', 'foundDate'];
      const list = ['zipCode', 'regNo', 'latitude', 'longitude', 'legalPerson', 'address', 'companyName',  'foundDate'
        , 'fax', 'telNumber', 'email', 'scale', 'category', 'introduction', 'parentId', 'companyId'];
      list.forEach(val => {
        if (requirelist.includes(val)) {
          this.form.push({key: val, disabled: false, required: true, value: this.companySelect[0][val]});
        } else {
          this.form.push({key: val, disabled: false, required: false, value: this.companySelect[0][val]});
        }
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '公司名称', type: 'input', name: 'companyName', option: '', placeholder: '请输入公司名称'},
        {label: '父级公司', type: 'dropdown', name: 'parentId', option: this.companyOption, placeholder: '请选择父级公司'},
        {label: '注册号', type: 'input', name: 'regNo', option: '', placeholder: '请输入注册号'},
        {label: '公司法人', type: 'input', name: 'legalPerson', option: '', placeholder: '请输入公司法人'},
        {label: '电话号码', type: 'input', name: 'telNumber', option: '', placeholder: '请输入电话号码'},
        {label: '电子邮件', type: 'input', name: 'email', option: '', placeholder: '请输入电子邮件'},
        {label: '公司传真', type: 'input', name: 'fax', option: '', placeholder: '请输入公司传真'},
        {label: '邮政编码', type: 'input', name: 'zipCode', option: '', placeholder: '请输入邮政编码'},
        {label: '公司地址', type: 'input', name: 'address', option: '', placeholder: '请输入公司地址'},
        {label: '创建日期', type: 'date', name: 'foundDate', option: '', placeholder: '请输入创建日期'},
        {label: '公司规模', type: 'input', name: 'scale', option: '', placeholder: '请输入公司规模'},
        {label: '公司类别', type: 'input', name: 'category', option: '', placeholder: '请输入公司类别'},
        {label: '公司经度', type: 'input', name: 'latitude', option: '', placeholder: '请输入公司经度'},
        {label: '公司纬度', type: 'input', name: 'longitude', option: '', placeholder: '请输入公司纬度'},
        {label: '公司介绍', type: 'textbox', name: 'introduction', option: '', placeholder: '请输入公司介绍'},
      ];
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  public  modifyStoryRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.companySrv.updateCompanyData(data).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryCompanyData(this.pageNo);
            this.dialogOption.dialog = false;
            this.companySelect = [];
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
      case '修改': this.showmodifyCompanyDialog(); break;
      case '删除': this.deleteCompany() ; break;
      default: break;
    }
  }
  // Pagination (分页)
  public  nowPageClick(e): void {
    this.pageNo = e;
    this.queryCompanyData(this.pageNo);
  }
  // delete companyInfo (删除公司信息)
  public  deleteCompany(): void {
    if (this.companySelect.length === 1) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.companySrv.delCompanyData({companyId: this.companySelect[0].companyId}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.queryCompanyData(this.pageNo);
              // this.formgroup.reset();
              this.companySelect = [];
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
      this.companySelect = [];
      this.formdata = [];
      this.form = [];
      this.formgroup.reset();
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            this.addCompany[eKey] = e.value.value[eKey];
          }
          // 判断父级Id
          this.addCompany.parentId = this.addCompany.parentId === '' ? 0 : this.addCompany.parentId;
          // 处理日期数据
          if (this.addCompany.foundDate) {
            this.addCompany.foundDate = this.datePie.transform(this.addCompany.foundDate, 'yy-MM-dd');
          }
          this.addCompanyRequest(this.addCompany);
        } else  {
          for (const eKey in e.value.value) {
            this.modifyCompany[eKey] = e.value.value[eKey];
          }
          // 判断父级Id
          this.modifyCompany.parentId = this.modifyCompany.parentId === '' ? 0 : this.modifyCompany.parentId;
          // 处理日期数据
          if (this.modifyCompany.foundDate) {
            this.modifyCompany.foundDate = this.datePie.transform(this.modifyCompany.foundDate, 'yy-MM-dd');
          }
          console.log(this.modifyCompany);
          this.modifyStoryRequest(this.modifyCompany);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
}
