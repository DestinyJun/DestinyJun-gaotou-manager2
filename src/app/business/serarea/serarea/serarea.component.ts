import { Component, OnInit } from '@angular/core';
import {SerareaService} from '../../../common/services/serarea.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {BtnOption, SearchData} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {AddSerarea, FiledData, ModifySerarea} from '../../../common/model/serarea-model';
import {validateComponent} from 'codelyzer/walkerFactory/walkerFn';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'rbi-serarea',
  templateUrl: './serarea.component.html',
  styleUrls: ['./serarea.component.less']
})
export class SerareaComponent implements OnInit {

  public serareaPageOption: PagingOption = new PagingOption();
  public serareaSelect: any[] = [];
  public serareaTableOption: any;
  public btnOption: BtnOption = new BtnOption();

  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any;
  public companyTree: any;

  // 属性名字 列表
  public FieldName: any[] = [];
  // 属性input框列表
  public FiledList = [];
  public filedData: FiledData = new FiledData();
  public searchData: SearchData = new SearchData();
  public addSerarea: AddSerarea = new AddSerarea();
  public modifySerarea: ModifySerarea = new ModifySerarea();
  // 必填字段
  public listRequire = ['areaCode', 'areaName', 'serviceAreaName'];

  // 修改相关
  public modifyOption = [];

  public pageNo = 1;
  constructor(
    private serareaSrv: SerareaService,
    private toolSrv: PublicMethedService,
    private localSrv: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.btnOption.btnlist = [
      // {label: '新增', src: 'assets/images/ic_add.png', style: {background: '#55AB7F', marginLeft: '2vw'} },
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'}},
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'}},
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'}},
    ];
    this.searchData.searchHidden = false;
    this.btnOption.searchData = this.searchData;
    this.queryServiceAreaData(this.pageNo);
    this.getServiceConfig();
    this.getServiceUseField();
  }

  public queryServiceAreaData(pageNo): void {
    this.serareaSrv.queryServiceAreaDataPage({currentPage: pageNo, pageSize: 10, companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.setTableOption(value.paingQueryData.datas);
          this.serareaPageOption = {
            nowpage: value.paingQueryData.currentPage,
            row: value.paingQueryData.pageSize,
            total: value.paingQueryData.totalRecord
          };
        });
      }
    );
  }

  public getServiceConfig(): void {
    this.serareaSrv.queryServiceAreaConfig({companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        if (value.status === 1000) {
          this.companyTree = value.companyComboBoxTreeList;
        }
      }
    );
  }

  public getServiceUseField(): void {
    this.serareaSrv.queryServiceAreaField({}).subscribe(
      value => {
        if (value.status === 1000) {
          value.fieldTreeList.forEach(v => {
            const list = [];
            v.field.forEach(val => {
              list.push({fieldId: val.fieldId, fieldName: val.fieldName, status: val.status});
            });
            this.filedData.data.push({title: v.fieldTypeName, fielddatas: list});
          });
        }
      }
    );
  }

  public selectData(e): void {
    this.serareaSelect = e;
  }

  public setTableOption(data): void {
    this.serareaTableOption = {
      width: '100%',
      header: [
        {field: 'provinceName', header: '省份名称'},
        {field: 'areaName', header: '区域名称'},
        {field: 'companyName', header: '公司名称'},
        {field: 'serviceAreaName', header: '服务区名称'},
      ],
      Content: data,
      btnHidden: false,
    };
  };

  // show add Serarea
  public showAddSerareaDialog(): void {
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '1000',
      dialog: true
    };
    this.filedData.data.forEach(value => {
      // this.FieldName.push();\
      const formList = [];
      console.log(value);
      value.fielddatas.forEach(v => {
        this.FieldName.push('fieldName-' + v.fieldId);
        if (v.status === 0) {
          this.listRequire.push('fieldName-' + v.fieldId);
        }
        formList.push({
          label: v.fieldName,
          type: 'input',
          name: 'fieldName-' + v.fieldId,
          option: '',
          placeholder: '请输入' + v.fieldName,
          status: v.status
        });
      });
      this.FiledList.push(
        {
          title: value.title,
          data: formList,
          drop: [],
        }
      );
    });
    const list = ['areaCode', 'areaName', 'serviceAreaName', 'founder'].concat(this.FieldName);
    list.forEach(val => {
      if (this.listRequire.includes(val)) {
        this.form.push({key: val, disabled: false, required: true, value: ''});
      } else {
        this.form.push({key: val, disabled: false, required: false, value: ''});
      }
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = {
      formList: [
        {label: '片区名称', type: 'tree', name: 'areaName', option: '', placeholder: '请选择片区名称'},
        {label: '服务区名称', type: 'input', name: 'serviceAreaName', option: '', placeholder: '请输入服务区名称'},
        {label: '创建人', type: 'input', name: 'founder', option: '', placeholder: '请输入字段名称'},
      ],
      dataList: this.FiledList,
    };
  }

  public addSerareaRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.serareaSrv.addServiceInfo(data).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.dialogOption.dialog = false;
            this.queryServiceAreaData(this.pageNo);
            this.clearData();
          });
        }
      );
    });
  }

  public showModifySerareaDialog(): void {
    if (this.serareaSelect.length === 0 || this.serareaSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择一项进行修改');
    } else if (this.serareaSelect.length === 1) {
      this.modifySerarea.serviceAreaId = this.serareaSelect[0].serviceAreaId;
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '1000',
        dialog: true
      };
      this.getServiceNoUseFiled();
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  public  modifySerareaRequest(data): void {
      this.toolSrv.setConfirmation('修改', '修改', () => {
        this.serareaSrv.updateServiceInfo(data).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.dialogOption.dialog = false;
              this.queryServiceAreaData(this.pageNo);
              this.clearData();
            });
          }
        );
      });
  }

  public  deleteSerareaInfo(): void {
    if (this.serareaSelect.length === 0 || this.serareaSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择一项进行删除');
    } else if (this.serareaSelect.length === 1) {
       this.toolSrv.setConfirmation('删除', '删除', () => {
         this.serareaSrv.deleteServiceInfo({serviceAreaId: this.serareaSelect[0].serviceAreaId}).subscribe(
           value => {
             this.toolSrv.setQuestJudgment(value.status, value.message, () => {
               this.queryServiceAreaData(this.pageNo);
               this.clearData();
             });
           }
         );
       })
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行删除');
    }
  }
  public clearData(): void {
    this.serareaSelect = [];
    this.FieldName = [];
    this.formdata = [];
    this.FiledList = [];
    this.modifyOption = [];
    this.form = [];
    this.formgroup.reset();
    this.listRequire = ['areaCode', 'areaName', 'serviceAreaName'];
  }

  public btnEvent(e): void {
    switch (e) {
      case '新增':
        this.showAddSerareaDialog();
        break;
      case '修改':
        this.showModifySerareaDialog();
        break;
      case  '删除': this.deleteSerareaInfo();
        break;
      default:
        break;
    }
  }
  public  nowPageClick(e): void {
      this.pageNo = e;
      this.queryServiceAreaData(this.pageNo);
  }

  public eventClick(e): void {
    console.log(e);
    if (e === 'false') {
      this.dialogOption.dialog = false;
      this.clearData();
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          const list = {};
          for (const eKey in e.value.value) {
            if (!this.FieldName.includes(eKey)) {
              if (eKey !== 'areaName') {
                this.addSerarea[eKey] = e.value.value[eKey];
              }
            } else {
              list[eKey.substring(eKey.indexOf('-') + 1, eKey.length)] = e.value.value[eKey];
            }
          }
          this.addSerarea.fieldVaulesMap = list;
          this.addSerareaRequest(this.addSerarea);
        } else {
          const list = {};
          for (const eKey in e.value.value) {
            if (eKey.includes('-d')) {
              delete e.value.value[eKey];
            }
          }
          for (const eKey1 in e.value.value) {
            if (!this.FieldName.includes(eKey1)) {
              if (eKey1 !== 'areaName') {
                this.modifySerarea[eKey1] = e.value.value[eKey1];
              }
            } else {
              list[eKey1.substring(eKey1.indexOf('-') + 1, eKey1.length)] = e.value.value[eKey1];
            }
          }
          console.log(e.value.value);
          console.log(this.FieldName);
          this.modifySerarea.fieldVaulesMap = list;
          console.log(list);
          this.modifySerareaRequest(this.modifySerarea);
          // console.log(this.mdofiySerarea);
        }
      } else {
        let data = '信息';
        console.log(this.FiledList);
        for (const eKey in e.value.value) {
          // const list = [];

          if (this.listRequire.includes(eKey)) {
            if (e.value.value[eKey] === '') {
              this.formdata.formList.forEach(v => {
                console.log(v);
                if (v.name === eKey) {
                  data = data.concat(v.label, '、');
                }
              });
              this.FiledList.forEach(val => {
                val.data.forEach(value => {
                  if (value.name === eKey) {
                    data = data.concat(val.title, ':', value.label, '、');
                  }
                });
              });
            }
          }
          this.toolSrv.setToast('error', '操作错误', data + '等信息未填');
        }

      }
    }
  }

  public delBtnClick(e): void {
    if (e.title === '添加信息') {
      this.FiledList.forEach(v => {
        if (v.title === e.type) {
          v.data.splice(e.index, 1);
        }
      });
    } else {
      let filedeId = '';
      this.FiledList.forEach(v => {
        if (v.title === e.type) {
          filedeId = v.data[e.index].id;
        }
      });
      this.serareaSrv.updateServiceInfoDeleteField({id: filedeId}).subscribe(vf => {
        this.toolSrv.setQuestJudgment(vf.status, vf.message, () => {
            this.serareaSrv.getSerareaNoUseFiled({serviceAreaId: this.serareaSelect[0].serviceAreaId}).subscribe(
              vdata => {
                if (vdata.status === 1000) {
                  this.modifyOption = [];
                  vdata.data.forEach(v => {
                    if (v.field.length === 0) {
                      this.modifyOption.push([]);
                    } else {
                      const data = [];
                      v.field.forEach( val => {
                        data.push({label: val.fieldName, value: val.fieldId});
                      });
                      this.modifyOption.push(data);
                    }
                  });
                  this.serareaSrv.getServiceInfoById({serviceAreaId: this.serareaSelect[0].serviceAreaId}).subscribe(
                    value => {
                      if (value.status === 1000) {
                        value.serviceAreaDetailedInfo.fieldTreeList.forEach((v, index) => {
                          if (v.field.length < this.FiledList[index].data.length) {
                            this.form.forEach( (vform, vindex) => {
                              if (vform.key === this.FiledList[index].data[this.FiledList[index].data.length - 1].name) {
                                this.form.splice(vindex, 1);
                              }
                            });
                            this.FiledList[index].data.splice(this.FiledList[index].data.length - 1, 1);
                            if (this.modifyOption[index].length >= 0) {
                                 this.FiledList[index].drop.push({lable: '', type: 'dropdown', name: 'fieldName-d' + index, option: this.modifyOption[index], placeholder: '请选择未添加的' + v.fieldTypeName});
                                 this.form.push({key: 'fieldName-d' + index, disabled: false, required: false, value: ''});
                                 if (this.FiledList[index].drop.length > 1) {
                                   this.FiledList[index].drop.splice(0, 1);
                                 }
                              } else {
                                 this.FiledList[index].drop.splice(0, 1);
                            }
                            this.formgroup = this.toolSrv.setFormGroup(this.form);
                          }
                        });
                      }
                    }
                  );
                }
              });
        });
      });
    }
  }
  // 获取服务区详细信息
  public getServiceNoUseFiled(): void {
    this.serareaSrv.getSerareaNoUseFiled({serviceAreaId: this.serareaSelect[0].serviceAreaId}).subscribe(
      vdata => {
        if (vdata.status === 1000) {
          vdata.data.forEach(v => {
            if (v.field.length === 0) {
              this.modifyOption.push([]);
            } else {
              const data = [];
              v.field.forEach(val => {
                data.push({label: val.fieldName, value: val.fieldId});
              });
              this.modifyOption.push(data);
            }
          });
          this.serareaSrv.getServiceInfoById({serviceAreaId: this.serareaSelect[0].serviceAreaId}).subscribe(
            value => {
              console.log(value);
              if (value.status === 1000) {
                value.serviceAreaDetailedInfo.fieldTreeList.forEach((v, index) => {
                  const modifyformList = [];
                  const modifydropList = [];
                  v.field.forEach(val => {
                    this.FieldName.push('fieldName-' + val.id);
                    if (val.status === 0) {
                      this.listRequire.push('fieldName-' + val.id);
                    }
                    modifyformList.push({
                      label: val.fieldName,
                      type: 'input',
                      name: 'fieldName-' + val.id,
                      option: '',
                      placeholder: '请输入' + val.fieldName,
                      status: val.status,
                      fieldValues: val.fieldValues,
                      id: val.id
                    });
                  });
                  if (this.modifyOption[index].length > 0) {
                    this.FieldName.push('fieldName-d' + index);
                    modifydropList.push({
                      lable: '',
                      type: 'dropdown',
                      name: 'fieldName-d' + index,
                      option: this.modifyOption[index],
                      placeholder: '请选择未添加的' + v.fieldTypeName
                    });
                  }
                  this.FiledList.push(
                    {
                      title: v.fieldTypeName,
                      data: modifyformList,
                      drop: modifydropList,
                    }
                  );
                });
                const modifylist = ['areaCode', 'areaName', 'serviceAreaName', 'founder'].concat(this.FieldName);
                modifylist.forEach(val => {
                  if (this.listRequire.includes(val)) {
                    if (val === 'areaName') {
                      this.form.push({key: val, disabled: false, required: true, value: this.serareaSelect[0][val]});
                    } else if (val === 'areaCode' || val === 'serviceAreaName' || val === 'founder') {
                      this.form.push({key: val, disabled: false, required: true, value: value.serviceAreaDetailedInfo[val]});
                    } else {
                      this.FiledList.forEach(value1 => {
                        value1.data.forEach(value2 => {
                          if (val === value2.name) {
                            this.form.push({key: val, disabled: false, required: true, value: value2.fieldValues});
                          }
                        });
                      });
                    }
                  } else {
                    if (val === 'founder') {
                      this.form.push({key: val, disabled: false, required: true, value: value.serviceAreaDetailedInfo[val]});
                    } else {
                      this.FiledList.forEach(value1 => {
                          value1.data.forEach(value2 => {
                            if (val === value2.name) {
                              this.form.push({key: val, disabled: false, required: true, value: value2.fieldValues});
                            }
                          });
                          value1.drop.forEach(value3 => {
                            if (val === value3.name) {
                              this.form.push({key: val, disabled: false, required: false, value: value3.fieldValues});
                            }
                          });
                      });
                    }
                  }
                });
                this.formgroup = this.toolSrv.setFormGroup(this.form);
                this.formdata = {
                  formList: [
                    {label: '片区名称', type: 'tree', name: 'areaName', option: '', placeholder: '请选择片区名称'},
                    {label: '服务区名称', type: 'input', name: 'serviceAreaName', option: '', placeholder: '请输入服务区名称'},
                    {label: '创建人', type: 'input', name: 'founder', option: '', placeholder: '请输入字段名称'},
                  ],
                  dataList: this.FiledList,
                };
              }
            }
          );
        }
      }
    );
  }

  public chageData(e): void {
    this.serareaSrv.addSerareaNoUseFiled({serviceAreaId: this.serareaSelect[0].serviceAreaId, fieldId: e.form.value[e.name]}).subscribe(
      val => {
        if (val.status === 1000) {
          this.serareaSrv.getSerareaNoUseFiled({serviceAreaId: this.serareaSelect[0].serviceAreaId}).subscribe(
            vdata => {
              console.log(vdata);
              if (vdata.status === 1000) {
                this.modifyOption = [];
                vdata.data.forEach(v => {
                  if (v.field.length === 0) {
                    this.modifyOption.push([]);
                  } else {
                    const data = [];
                    v.field.forEach( val => {
                      data.push({label: val.fieldName, value: val.fieldId});
                    });
                    this.modifyOption.push(data);
                  }
                });
                this.serareaSrv.getServiceInfoById({serviceAreaId: this.serareaSelect[0].serviceAreaId}).subscribe(
                  value => {
                    console.log(value);
                    if (value.status === 1000) {
                      value.serviceAreaDetailedInfo.fieldTreeList.forEach((v, index) => {
                        if (v.field.length > this.FiledList[index].data.length) {
                          const name = 'fieldName-' + v.field[this.FiledList[index].data.length].id;
                          this.FieldName.push(name);
                          this.FiledList[index].data.push(
                             {
                               label: v.field[this.FiledList[index].data.length].fieldName,
                               type: 'input',
                               name: 'fieldName-' + v.field[this.FiledList[index].data.length].id,
                               option: '',
                               placeholder: '请输入' + v.field[this.FiledList[index].data.length].fieldName,
                               status: v.field[this.FiledList[index].data.length].status,
                               fieldValues: v.field[this.FiledList[index].data.length].fieldValues,
                               id: v.field[this.FiledList[index].data.length].id
                             }
                           );
                          this.form.push({key: name, disabled: false, required: false, value: ''});
                          if (this.modifyOption[index].length > 0) {
                           this.FiledList[index].drop[0].option = this.modifyOption[index];
                         } else {
                           this.FiledList[index].drop[0] = [];
                         }
                          this.formgroup = this.toolSrv.setFormGroup(this.form);
                        }
                      });
                    }
                  }
                );
              }
            });
        } else {
          this.toolSrv.setToast('error', '请求错误', '添加失败');
        }
      }
    );
  }
}
