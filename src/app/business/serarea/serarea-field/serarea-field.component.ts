import { Component, OnInit } from '@angular/core';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {BtnOption, SearchData} from '../../../common/components/header-btn/headerData.model';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {SerareaService} from '../../../common/services/serarea.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {SerareaFieldService} from '../../../common/services/serarea-field.service';
import {AddSerareaFiled, ModifySerareaFiled} from '../../../common/model/serarea-model';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'rbi-serarea-field',
  templateUrl: './serarea-field.component.html',
  styleUrls: ['./serarea-field.component.less']
})
export class SerareaFieldComponent implements OnInit {

  public serareaFieldPageOption: PagingOption = new PagingOption();
  public serareaFieldSelect: any[] = [];
  public serareaFieldTableOption: any;
  public btnOption: BtnOption = new BtnOption();

  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public searchData: SearchData = new SearchData();
  public fieldTypeOption: any[] = [];

  public addSerareaField: AddSerareaFiled = new  AddSerareaFiled;
  public modifySerareaField: ModifySerareaFiled = new  ModifySerareaFiled;

  public pageNo = 1;
  constructor(
    private serareaFieldSrv: SerareaFieldService,
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
    this.searchData.searchHidden = false;
    this.btnOption.searchData = this.searchData;
    this.queryServiceAreaData(this.pageNo);
    this.getServiceTypeConfig();
    // this.getServiceUseField();
  }

  public  queryServiceAreaData(pageSize): void {
    this.serareaFieldSrv.queryServiceAreaFiledDataPage({currentPage: pageSize, pageSize: 10, companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        if (value.status === 1000) {
            value.fieldInfo.datas.forEach( v => {
              v.status = (v.status === 1) ? '可删' : '不可删';
            });
            this.serareaFieldSelect = [];
            this.setTableOption(value.fieldInfo.datas);
            this.serareaFieldPageOption = {nowpage: value.fieldInfo.currentPage, row: value.fieldInfo.pageSize, total: value.fieldInfo.totalRecord};
          // });
        }
      }
    );
  }
  public  getServiceTypeConfig(): void {
      this.serareaFieldSrv.getServiceTypeConfig({}).subscribe(
        value => {
          console.log(value);
          if (value.status === 1000) {
            value.fieldTypeComboBoxList.forEach( v => {
              this.fieldTypeOption.push({label: v.fieldTypeName, value: v.fieldTypeId});
            });
          }
        }
      );
  }
  // public  getServiceConfig(): void {
  //   this.serareaFieldSrv.queryServiceAreaConfig({companyId: environment.companyId}).subscribe(
  //     value => {
  //       console.log(value);
  //     }
  //   );
  // }

  // public  getServiceUseField(): void {
  //   this.serareaFieldSrv.queryServiceAreaField({}).subscribe(
  //     value => {
  //       console.log(value);
  //     }
  //   );
  // }

  public  selectData(e): void {
    this.serareaFieldSelect = e;
  }
  public setTableOption(data): void {
    console.log(data);
    this.serareaFieldTableOption = {
      width: '100%',
      header: [
        {field: 'fieldId', header: '字段Id'},
        {field: 'fieldName', header: '字段名称'},
        {field: 'fieldTypeName', header: '字段类型名称'},
        {field: 'status', header: '是否可删'},
        {field: 'idt', header: '添加时间'},
      ],
      Content: data,
      btnHidden: false,
    };
  };
  // show add serareaField
  public  showAddserareaFieldDialog(): void {
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '800',
      dialog: true
    };
    const list = ['fieldTypeId', 'fieldName', 'status'];
    list.forEach( val => {
      // console.log(val);
      this.form.push({key: val, disabled: false, required: true, value: ''});
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '字段类型', type: 'dropdown', name: 'fieldTypeId', option: this.fieldTypeOption, placeholder: '请选择字段类型名称'},
      {label: '字段名称', type: 'input', name: 'fieldName', option: this.fieldTypeOption, placeholder: '请输入字段名称'},
      {label: '是否可删除状态', type: 'radio', name: 'status', option: '', placeholder: '', value: [{label: '是', name: 'status', value: 2, group: 'group'}, {label: '否', name: 'status', value: 1, group: 'group'}]},
    ];
    // const list = ['storeName', 'orientation', 'storeTypeId', 'manage', 'manageTelephone'];
    // list.forEach(val => {
    //   this.form.push({key: val, disabled: false, required: true, value: ''});
    // });
  }

  public  addServiceFieldRequest(data): void {
      this.toolSrv.setConfirmation('添加', '添加', () => {
            this.serareaFieldSrv.addServiceAreaFiled(data).subscribe(
              value => {
                console.log(value);
                this.toolSrv.setQuestJudgment(value.status, value.message, () => {
                    this.dialogOption.dialog = false;
                    this.queryServiceAreaData(this.pageNo);
                    this.formdata = [];
                    this.formgroup.reset();
                 });
            });
      });
  }

  public  showModifyserareaFieldDialog(): void {
    if (this.serareaFieldSelect.length === 0 || this.serareaFieldSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if (this.serareaFieldSelect.length === 1) {
      this.modifySerareaField.fieldId = this.serareaFieldSelect[0].fieldId;
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '800',
        dialog: true
      };
      const list = ['fieldTypeId', 'fieldName', 'status'];
      list.forEach( val => {
        // console.log(val);
        if (val === 'status') {

          this.form.push({key: val, disabled: false, required: true, value: this.serareaFieldSelect[0].status === '可删' ? 1 + 1 : 0 + 1});
        } else {
          this.form.push({key: val, disabled: false, required: true, value: this.serareaFieldSelect[0][val]});

        }
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '字段类型', type: 'dropdown', name: 'fieldTypeId', option: this.fieldTypeOption, placeholder: '请选择字段类型名称'},
        {label: '字段名称', type: 'input', name: 'fieldName', option: this.fieldTypeOption, placeholder: '请输入字段名称'},
        {label: '是否可删除状态', type: 'radio', name: 'status', option: '', placeholder: '', value: [{label: '是', name: 'status', value: 2, group: 'group'}, {label: '否', name: 'status', value: 1, group: 'group'}]},
      ];
    } else  {
      this.toolSrv.setToast('error', '操作错误', '请选择一项进行修改');
    }
  }

  public  modifyServiceFieldRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.serareaFieldSrv.updateServiceAreaFiled(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.dialogOption.dialog = false;
            this.queryServiceAreaData(this.pageNo);
            this.serareaFieldSelect = [];
            this.formdata = [];
            this.formgroup.reset();
          });
        });
    });
  }

  public  deleteServiceFieldInfo(): void {
    if (this.serareaFieldSelect.length === 0 || this.serareaFieldSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要删除的项');
    } else if (this.serareaFieldSelect.length === 1) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.serareaFieldSrv.deleteServiceAreaFiled({fieldId: this.serareaFieldSelect[0].fieldId}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
                this.queryServiceAreaData(this.pageNo);
                this.serareaFieldSelect = [];
            });
          }
        );
      });
    } else  {
      this.toolSrv.setToast('error', '操作错误', '请选择一项删除修改');
    }
  }
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.showAddserareaFieldDialog(); break;
      case '修改': this.showModifyserareaFieldDialog(); break;
      case '删除': this.deleteServiceFieldInfo(); break;
      default: break;
    }
  }

  public  eventClick(e): void {
    console.log(e);
    if (e === 'false') {
      this.dialogOption.dialog = false;
      this.serareaFieldSelect = [];
      this.formdata = [];
    } else {
      if (e.invalid) {
        console.log(e.type === '添加信息');
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            if (eKey === 'status') {
              this.addSerareaField[eKey] = e.value.value[eKey] - 1 ;
            } else  {
              this.addSerareaField[eKey] = e.value.value[eKey];
            }
          }
          this.addServiceFieldRequest(this.addSerareaField);
        } else  {
          for (const eKey in e.value.value) {
            if (eKey === 'status') {
              this.modifySerareaField[eKey] = e.value.value[eKey] - 1 ;
            } else  {
              this.modifySerareaField[eKey] = e.value.value[eKey];
            }
          }
          console.log(this.modifySerareaField);
          this.modifyServiceFieldRequest(this.modifySerareaField);
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
