import { Component, OnInit } from '@angular/core';
import {AreaService} from '../../../common/services/area.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {AddArea, Area, Data, ExpandedData, ModifyArea} from '../../../common/model/area-model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {BtnOption, SearchData} from '../../../common/components/header-btn/headerData.model';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'rbi-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.less']
})
export class AreaComponent implements OnInit {

  public areaSelect: any[] = [];
  public areaTableOption: any;
  public searchData: SearchData = new SearchData();
  public btnOption: BtnOption = new BtnOption();
  public pageOption: PagingOption = new PagingOption();
  public addDialogOption: any;
  // add area Entity
  public addArea: AddArea = new AddArea();
  public modifyArea: ModifyArea = new ModifyArea();
  // show dialog
  public addformData: any[];
  public companyOption: any[] = [];
  public prvinceOption: any[] = [];
  public form: FormValue[] = [];
  public formgroup: FormGroup;

  public expandedData: ExpandedData = new ExpandedData();
  public pageNo = 1;
  constructor(
    private areaSrv: AreaService,
    private toolSrv: PublicMethedService,
    private localSrv: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.btnOption.btnlist = [
        // {label: '新增', src: 'assets/images/ic_add.png', style: {background: '#55AB7F', marginLeft: '2vw'} },
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
   ];
    this.searchData.searchHidden = false;
    this.btnOption.searchData = this.searchData;
    console.log(this.btnOption.searchData);
    this.areaInitialization();
  }
  // areainfo Initialization
  public  areaInitialization(): void {
     this.queryAreaDataPage(this.pageNo);
     this.queryAreaBasicData();
  }
  // select table  data
  public selectData(e): void {
    this.areaSelect = e;
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
  public queryAreaDataPage(data): void {
    this.areaSrv.queryAreaDataPage({pageSize: 10, currentPage: data, companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        if (value.status === 1000) {
          this.areaSelect = [];
          this.setTableOption(this.tableTreeInitialize(value.paingQueryData.datas));
          this.pageOption = {nowpage: value.paingQueryData.currentPage, row: value.paingQueryData.pageSize, total: value.paingQueryData.totalPage};
        }
        // this.toolSrv.setQuestJudgment(value.status, value.message, () => {
        //
        // });
        // this.setTableOption(value)
      });
  }
  // quera area basic data
  public  queryAreaBasicData(): void {
    this.areaSrv.getAreaBaasicData({companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          // value.
          value.companyData.forEach( v => {
            this.companyOption.push({label: v.companyName, value: v.companyId});
          });
          value.prvinceData.forEach( v => {
            this.prvinceOption.push({label: v.areaName, value: v.areaCode});
          });
        });
      });
  }
  // set table option
  public  setTableOption(data): void {
    this.areaTableOption = {
      width: '100%',
      header: [
        {field: 'areaName', header: '区域名称'},
        {field: 'companyName', header: '公司名称'},
        {field: 'companyLevel', header: '公司级别'},
        {field: 'idt', header: '添加时间'},
      ],
      Content: data,
      btnHidden: false,
      // tableList: [{label: '详情', color: '#6A72A1'}]
    };
  }
  // show add area dialog
  public  areaAddDialogClick(): void {
    this.addDialogOption = {
        type: 'add',
        title: '添加信息',
        width: '800',
        dialog: true
      };
    const list = ['areaCode', 'companyId', 'level', 'areaName'];
    list.forEach(val => {
      if (val === 'level')  {
        this.form.push({key: val, disabled: false, required: true, value: 3});
      } else {
        this.form.push({key: val, disabled: false, required: true, value: ''});

      }
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    console.log(this.formgroup);
    this.addformData = [
      {label: '区划', type: 'dropdown', name: 'areaCode', option: this.prvinceOption, placeholder: '请选择区划'},
      {label: '公司', type: 'dropdown', name: 'companyId', option: this.companyOption, placeholder: '请选择公司'},
      {label: '片区名称', type: 'input', name: 'areaName', option: '', placeholder: '请输入片区名称'},
      // {label: '级别', type: 'input', name: 'areaName', option: '', placeholder: '请输入级别'},
    ];
  }
  // add area request
  public  areaAddRequest(): void {
    this.expandedData.id = this.addArea.areaCode;
    this.expandedData.type = '1';
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.areaSrv.addAreaData(this.addArea).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.addDialogOption.dialog = false;
            this.formgroup.reset();
            this.queryAreaDataPage(this.pageNo);
          });
        }
      );
    });
  }
  // delete area info
  public  areaInfoDeleteClick(): void {
    if (this.areaSelect.length === 0 ) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要删除的项');

    } else if (this.areaSelect.length === 1) {
      if (this.areaSelect[0].parent === null) {
        this.toolSrv.setToast('error', '操作错误', '不能对省进行修改');

      } else {
        this.toolSrv.setConfirmation('删除', '删除', () => {
          // console.log(this.areaSelect[0]);
          this.areaSrv.deleteAreaData({targetId: this.areaSelect[0].data.areaCode, areaLevel: this.areaSelect[0].data.areaLevel}).subscribe(
            value => {
              this.toolSrv.setQuestJudgment(value.status, value.message, () => {
                this.queryAreaDataPage(this.pageNo);
                this.areaSelect = [];
              });
            }
          );
        });
      }
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行删除');
    }

  }
  // modify area info
  public  areaModifyDialogClick(): void {
    console.log(this.areaSelect);
    if (this.areaSelect.length === 0 ) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');

    } else if (this.areaSelect.length === 1) {
      if (this.areaSelect[0].parent === null) {
        this.toolSrv.setToast('error', '操作错误', '不能对省进行修改');

      } else {
        this.addDialogOption = {
          type: 'add',
          title: '修改信息',
          width: '800',
          dialog: true
        };
        const list = ['companyPrvcId', 'areaCode', 'provinceId', 'companyId', 'areaName', 'areaLevel'];
        list.forEach(val => {
          if (val === 'areaLevel') {
            this.form.push({key: val, disabled: false, required: false, value: 3});
          } else if (val === 'companyPrvcId' ) {
            console.log(this.areaSelect[0].parent.data);
            this.form.push({key: val, disabled: false, required: false, value: this.areaSelect[0].parent.data.areaCode});
          } else if (val === 'provinceId') {
              this.form.push({key: val, disabled: false, required: false, value: this.areaSelect[0].parent.data[val]});
          } else {
            this.form.push({key: val, disabled: false, required: false, value: this.areaSelect[0].data[val]});
          }
        });
        this.formgroup = this.toolSrv.setFormGroup(this.form);
        let provinceName = null;
        // console.log(this.areaSelect[0].hasOwnProperty('prent'));
        console.log(this.areaSelect[0].parent);
        if (this.areaSelect[0].parent === null) {
          provinceName = this.areaSelect[0].data.areaName;
        } else {
          provinceName = this.areaSelect[0].parent.data.areaName;
        }
        // const  data = this.areaSelect[0].prent === null ? this.areaSelect[0].data.areaName : this.areaSelect[0].prent.data.areaName;
        this.addformData = [
          {label: '区划', type: 'dropdown', name: 'provinceId', option: this.prvinceOption, placeholder: provinceName},
          {label: '公司', type: 'dropdown', name: 'companyId', option: this.companyOption, placeholder: this.areaSelect[0].data.companyName},
          {label: '片区名称', type: 'input', name: 'areaName', option: '', placeholder: '请输入片区名称'},
          // {label: '级别', type: 'input', name: 'areaName', option: '', placeholder: '请输入级别'},
        ];
      }

    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  // modify area request
  public  areaModifyRequest(): void {
      this.toolSrv.setConfirmation('修改', '修改', () => {
        this.areaSrv.modifyAreaData(this.modifyArea).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.msg, () => {
              this.queryAreaDataPage(this.pageNo);
              this.addDialogOption.dialog = false;
              this.formgroup.reset();
              this.areaSelect = [];
            });
          }
        );
      });
  }
  // btn click Event
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.areaAddDialogClick(); break;
      case '修改': this.areaModifyDialogClick(); break;
      case '删除': this.areaInfoDeleteClick(); break;
      default: break;
      // case '上传': this.uploadFileClick(); break;
    }
  }

  public  eventClick(e): void {
    console.log(e);
    if (e === 'false') {
      this.addDialogOption.dialog = false;
      this.areaSelect = [];
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            this.addArea[eKey] = e.value.value[eKey];
          }
          this.areaAddRequest();
        } else  {
          for (const eKey in e.value.value) {
            if (e.value.value[eKey] === '') {
              if (eKey === 'provinceId') {
                this.modifyArea[eKey] = this.areaSelect[0].parent.data['areaCode'];

              }else {
                this.modifyArea[eKey] = this.areaSelect[0].data[eKey];

              }
            } else  {
              this.modifyArea[eKey] = e.value.value[eKey];

            }
          }
          this.areaModifyRequest();
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
      const childnode = new Area();
      const datanode  = new Data();
       if (!data[i].hasOwnProperty('areaName')) {
         datanode.areaName  = data[i].provinceName;
         datanode.provinceId = data[i].provinceId;

       } else {
         datanode.areaName  = data[i].areaName;
       }
       if (!data[i].hasOwnProperty('areaCode')) {
         datanode.areaCode  = data[i].companyPrvcId;
       } else  {
         datanode.areaCode  = data[i].areaCode;
       }
      datanode.areaLevel = data[i].areaLevel;
      datanode.companyName = data[i].companyName;
      datanode.companyLevel = data[i].companyLevel;
      datanode.companyId = data[i].companyId;
      datanode.idt = data[i].idt;
      childnode.data = datanode;
      childnode.parent = null;
      childnode.id = i;
      if (this.expandedData.type === '2') {
         if (this.expandedData.id === i) {
           childnode.expanded = true;
         } else {
           childnode.expanded = false;
         }
      } else {
        if (this.expandedData.id === childnode.data.provinceId) {
          childnode.expanded = true;
        } else {
          childnode.expanded = false;
        }
      }
      if (data[i].companyAreaInfoList === undefined) {
        childnode.children = [];
      } else {
        childnode.children = this.tableTreeInitialize(data[i].companyAreaInfoList);
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }

  public  nowPageClick(e): void {
      this.pageNo = e;
      this.queryAreaDataPage(this.pageNo)
  }
}
