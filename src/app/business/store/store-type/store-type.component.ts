import { Component, OnInit } from '@angular/core';
import {BtnOption, SearchData} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {StoreService} from '../../../common/services/store.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {StoreTypeService} from '../../../common/services/store-type.service';
import {AddStoreType, ModifyStoreType} from '../../../common/model/store.model';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'rbi-store-type',
  templateUrl: './store-type.component.html',
  styleUrls: ['./store-type.component.less']
})
export class StoreTypeComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public storeTypeSelect: any[] = [];
  public storeTypeTableOption: any;
  public pageOption: PagingOption = new PagingOption();
  public searchData: SearchData = new SearchData();
  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public addStoreType: AddStoreType = new AddStoreType();
  public modifyStoreType: ModifyStoreType = new ModifyStoreType();
  public pageNo = 1;
  constructor(
    private storeTypeSrv: StoreTypeService,
    private toolSrv: PublicMethedService,
    private localSrv: LocalStorageService
  ) { }

  ngOnInit() {
    this.btnOption.btnlist = [
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
    ];
    this.searchData.searchHidden = false;
    this.btnOption.searchData = this.searchData;
    this.querystoreTypeData(this.pageNo);
  }
  // select data （选择数据）
  public  selectData(e): void {
    this.storeTypeSelect = e;
  }
  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.storeTypeTableOption = {
      width: '100%',
      header: [
        {field: 'storeTypeId', header: '店铺类型Id'},
        {field: 'storeTypeName', header: '店铺类型名称'},
        {field: 'enabled', header: '是否启用'},
        {field: 'idt', header: '添加时间'},
      ],
      Content: data,
      btnHidden: false,
    };
  }
  // Paging query (分页查询)
  public querystoreTypeData(data): void {
    this.storeTypeSrv.queryStoreTypeDataPage({currentPage: data, pageSize: 10, companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          value.paingQueryData.datas.forEach( v => {
            v.enabled = (v.enabled === 1) ? '启用' : '禁用';
          });
          this.storeTypeSelect = [];
          this.setTableOption(value.paingQueryData.datas);
          this.pageOption = {nowpage: value.paingQueryData.currentPage, row: value.paingQueryData.pageSize, total: value.paingQueryData.totalRecord};

        });
      }
    );
  }
  public  showAddStoreTypeDialog(): void {
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '800',
      dialog: true
    };
    const list = ['storeTypeName'];
    list.forEach(val => {
      this.form.push({key: val, disabled: false, required: true, value: ''});
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '店铺类型名称', type: 'input', name: 'storeTypeName', option: '', placeholder: '请输入店铺类型名称'},
    ];
  }

  public  addStoreTypeRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.storeTypeSrv.addStoreType(data).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.querystoreTypeData(this.pageNo);
            this.dialogOption.dialog = false;
          });
        }
      );
    });
  }

  public  showModifyStoreTypeDialog(): void {
    if (this.storeTypeSelect.length === 0 || this.storeTypeSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择一项进行修改');
    } else if (this.storeTypeSelect.length === 1) {
      this.modifyStoreType.storeTypeId = this.storeTypeSelect[0].storeTypeId;
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '800',
        dialog: true
      };
      const list = ['storeTypeName'];
      list.forEach(val => {
        this.form.push({key: val, disabled: false, required: true, value: this.storeTypeSelect[0][val]});
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '店铺类型名称', type: 'input', name: 'storeTypeName', option: '', placeholder: '请输入店铺类型名称'},
      ];
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  public  modifyStoreTypeRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.storeTypeSrv.upadteStoreType(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.querystoreTypeData(this.pageNo);
            this.dialogOption.dialog = false;
            this.storeTypeSelect = [];
            this.formdata = [];
          });
        }
      );
    });
  }

  // btn click event  (button点击事件)
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.showAddStoreTypeDialog(); break;
      case '修改': this.showModifyStoreTypeDialog(); break;
      case '删除': this.deletestoreType() ; break;
      default: break;
    }
  }
  // Pagination (分页)
  public  nowPageClick(e): void {
    this.pageNo = e;
    this.querystoreTypeData(this.pageNo);
  }
  // delete interceot (删除卡扣)
  public  deletestoreType(): void {
    if (this.storeTypeSelect.length === 1) {
     this.toolSrv.setConfirmation('删除', '删除', () => {
       this.storeTypeSrv.deleteStoreType({storeTypeId: this.storeTypeSelect[0].storeTypeId}).subscribe(
         value => {
           this.toolSrv.setQuestJudgment(value.status, value.message, () => {
             this.querystoreTypeData(this.pageNo);
           });
         }
       );
     });
    } else  {
      this.toolSrv.setToast('error', '操作失败', '请选择一项进行删除');
    }
  }

  public  eventClick(e): void {
    console.log(e);
    if (e === 'false') {
      this.dialogOption.dialog = false;
      // this.addDialogOption.dialog = false;
      // this.areaSelect = [];
    } else {
      if (e.invalid) {
        console.log(e.type === '添加信息');
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            this.addStoreType[eKey] = e.value.value[eKey];
          }
          this.addStoreTypeRequest(this.addStoreType);
        } else  {
          for (const eKey in e.value.value) {
            this.modifyStoreType[eKey] = e.value.value[eKey];
          }
          // console.log(this.modifyStoreType);
          this.modifyStoreTypeRequest(this.modifyStoreType);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
}
