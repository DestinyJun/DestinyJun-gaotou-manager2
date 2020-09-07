import { Component, OnInit } from '@angular/core';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {BtnOption, SearchData} from '../../../common/components/header-btn/headerData.model';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {SerareaFieldService} from '../../../common/services/serarea-field.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {environment} from '../../../../environments/environment';
import {SerareaFieldTypeService} from '../../../common/services/serarea-field-type.service';
import {ModifySerareaFiledType} from '../../../common/model/serarea-model';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'rbi-serarea-field-type',
  templateUrl: './serarea-field-type.component.html',
  styleUrls: ['./serarea-field-type.component.less']
})
export class SerareaFieldTypeComponent implements OnInit {

  public serareaFieldTypePageOption: PagingOption = new PagingOption();
  public serareaFieldTypeSelect: any[] = [];
  public serareaFieldTypeTableOption: any;
  public btnOption: BtnOption = new BtnOption();

  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public addSerareaFiledType: any;
  public searchData: SearchData = new SearchData();
  public modifySerareaFiledType: ModifySerareaFiledType = new ModifySerareaFiledType();
  public pageNo = 1;
  constructor(
    private serareaFieldTypeSrv: SerareaFieldTypeService,
    private toolSrv: PublicMethedService,
    private localSrv: LocalStorageService
  ) { }

  ngOnInit() {
    this.btnOption.btnlist = [
      // {label: '新增', src: 'assets/images/ic_add.png', style: {background: '#55AB7F', marginLeft: '2vw'} },
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
    ];
    this.searchData.searchHidden  = false;
    this.btnOption.searchData = this.searchData;
    this.queryServiceAreaData(this.pageNo);
    // this.getServiceConfig();
    // this.getServiceUseField();
  }

  public  queryServiceAreaData(pageSize): void {
    this.serareaFieldTypeSrv.queryServiceAreaFiledDataPage({currentPage: pageSize, pageSize: 10, companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          value.fieldType.datas.forEach( v => {
             v.enabled = (v.enabled === 1) ? '启用' : '禁用';
          });
          this.serareaFieldTypeSelect = [];
          this.setTableOption(value.fieldType.datas);
          this.serareaFieldTypePageOption = {nowpage: value.fieldType.currentPage, row: value.fieldType.pageSize, total: value.fieldType.totalRecord};
        });
      }
    );
  }

  // public  getServiceConfig(): void {
  //   this.serareaFieldTypeSrv.queryServiceAreaConfig({companyId: environment.companyId}).subscribe(
  //     value => {
  //       console.log(value);
  //     }
  //   );
  // }
  public  selectData(e): void {
    this.serareaFieldTypeSelect = e;
  }
  public setTableOption(data): void {
    this.serareaFieldTypeTableOption = {
      width: '100%',
      header: [
        {field: 'fieldTypeId', header: '字段类型Id'},
        {field: 'fieldTypeName', header: '字段类型名称'},
        {field: 'enabled', header: '是否启用'},
        {field: 'idt', header: '添加时间'},
      ],
      Content: data,
      btnHidden: false,
    };
  }
  // show add serareaFieldType
  public  showAddserareaFieldTypeDialog(): void {
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '800',
      dialog: true
    };
    const list = ['fieldTypeName'];
    list.forEach( val => {
      console.log(val);
      this.form.push({key: val, disabled: false, required: true, value: ''});
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '字段类型名称', type: 'input', name: 'fieldTypeName', option: '', placeholder: '请输入字段类型名称'},
    ];
  }

  public  addSerareaFiledTypesRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.serareaFieldTypeSrv.addServiceAreaFiledTypeInfo({fieldTypeName: data}).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.dialogOption.dialog = false;
            this.queryServiceAreaData(this.pageNo);
            this.formdata = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }

  public  showModifySerareaFilesTypeDialog(): void {
    if (this.serareaFieldTypeSelect.length === 0 || this.serareaFieldTypeSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if (this.serareaFieldTypeSelect.length === 1 ) {
      this.modifySerareaFiledType.fileTypeId  = this.serareaFieldTypeSelect[0].fieldTypeId;
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '800',
        dialog: true
      };
      const list = ['fieldTypeName'];
      list.forEach( val => {
        console.log(val);
        this.form.push({key: val, disabled: false, required: false, value: this.serareaFieldTypeSelect[0][val]});
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '字段类型名称', type: 'input', name: 'fieldTypeName', option: '', placeholder: '请输入字段类型名称'},
      ];
    } else {
      this.toolSrv.setToast('error', '操作错误', '请选择一项进行修改');
    }
  }

  public  modifySerareaFiledTypeInfo(data): void {
      this.toolSrv.setConfirmation('修改', '修改', () => {
         this.serareaFieldTypeSrv.updateServiceAreaFiledTypeInfo(data).subscribe(
           value =>  {
             this.toolSrv.setQuestJudgment(value.status, value.message, () => {
                this.dialogOption.dialog = false;
                this.queryServiceAreaData(this.pageNo);
                this.serareaFieldTypeSelect = [];
                this.formgroup.reset();
                this.formdata = [];
             });
           }
         );
      });
  }

  public  deleteSerareaFieldTypeInfo(): void {
    if (this.serareaFieldTypeSelect.length === 0 || this.serareaFieldTypeSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要删除的项');
    } else if (this.serareaFieldTypeSelect.length === 1 ) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.serareaFieldTypeSrv.deleteServiceAreaFiledTypeInfo({fileTypeId: this.serareaFieldTypeSelect[0].fieldTypeId}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.queryServiceAreaData(this.pageNo);
            });
          }
        );
      });
    } else {
      this.toolSrv.setToast('error', '操作错误', '请选择一项进行删除');
    }
  }
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.showAddserareaFieldTypeDialog(); break;
      case '修改': this.showModifySerareaFilesTypeDialog(); break;
      case '删除': this.deleteSerareaFieldTypeInfo(); break;
      default: break;
    }
  }

  public  eventClick(e): void {
    console.log(e);
    if (e === 'false') {
      this.dialogOption.dialog = false;
      // this.addDialogOption.dialog = false;
      this.serareaFieldTypeSelect = [];
      this.formdata = [];
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            this.addSerareaFiledType = e.value.value[eKey];
          }
          this.addSerareaFiledTypesRequest(this.addSerareaFiledType);
        } else  {
          for (const eKey in e.value.value) {
            this.modifySerareaFiledType[eKey] = e.value.value[eKey];
          }
          console.log(this.modifySerareaFiledType);
          this.modifySerareaFiledTypeInfo(this.modifySerareaFiledType);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }

  public  pageClick(e): void {
      this.pageNo = e;

      this.queryServiceAreaData(this.pageNo);
  }

}
