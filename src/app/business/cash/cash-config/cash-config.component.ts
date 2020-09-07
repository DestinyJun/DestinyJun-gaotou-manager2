import { Component, OnInit } from '@angular/core';
import {BtnOption, DrapData, SearchData} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue, TreeClass} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {OrgService} from '../../../common/services/org.service';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {CashConfigService} from '../../../common/services/cash-config.service';
import {VideoService} from '../../../common/services/video.service';
import {CashConfigAddModel} from '../../../common/model/cash-model';

@Component({
  selector: 'rbi-cash-config',
  templateUrl: './cash-config.component.html',
  styleUrls: ['./cash-config.component.less']
})
export class CashConfigComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public cashSelect: any[] = [];
  public cashTableOption: any;
  public pageOption: PagingOption = new PagingOption();
  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public cashTree: TreeClass = new TreeClass();
  public addCash: CashConfigAddModel = new CashConfigAddModel();
  public dapartOption: any[] = [];
  public searchData: SearchData = new SearchData();
  public drapData: DrapData = new DrapData();
  public pageNo = 1;
  public companyID: any;
  constructor(
    private dapartSrv: OrgService,
    private cashSrv: CashConfigService,
    private videoSrv: VideoService,
    private toolSrv: PublicMethedService,
    private localSrv: LocalStorageService,
    private datePie: DatePipe
  ) { }

  ngOnInit() {
    this.btnOption.btnlist = [
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'} },
      // {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'} },
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'} },
    ];
    this.cashTree.type = 'cash';
    this.searchData.searchHidden = false;
    this.searchData.width = '13vw';
    this.btnOption.searchData = this.searchData;
    this.getCashConfig();
  }
  // select data （选择数据）
  public  selectData(e): void {
    this.cashSelect = e;
    console.log(e);
  }
  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.cashTableOption = {
      width: '100%',
      header: [
        {field: 'areaName', header: '区域名称'},
        {field: 'cashRegisterCode', header: '收银机编号'},
        {field: 'serviceAreaName', header: '服务区名称'},
        {field: 'orientation', header: '上下行'},
        {field: 'storeName', header: '店铺名称'},
        {field: 'manage', header: '管理员'},
        {field: 'manageTelephone', header: '管理员电话'},
      ],
      Content: data,
      btnHidden: false,
    };
  }
  // Paging query (分页查询)
  public queryCashData(data, id): void {
    this.cashSrv.queryCashPageData({currentPage: data, pageSize: 10, companyId: id}).subscribe(
      value => {
        console.log(value);
        // 判断状态码函数
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.cashSelect = [];
          value.paingQueryData.datas.forEach( v => {
            v.orientation = (v.orientation === 2) ? '上行' : (v.orientation === 3) ? '下行' : '无方向';
          });
          // 设置父级部门
          this.setTableOption(value.paingQueryData.datas);
          this.pageOption = {nowpage: value.paingQueryData.currentPage, row: value.paingQueryData.pageSize, total: value.paingQueryData.totalRecord};
        });
      }
    );
  }
  //
  public  getCashConfig(): void {
    this.dapartSrv.getDapartConfigData({companyId: this.localSrv.get('companyId')}).subscribe(val => {
      this.toolSrv.setQuestJudgment(val.status, val.message, () => {
        console.log(val);
        val.organizationConfig.companyList.forEach(v => {
          this.dapartOption.push({label: v.companyName, value: v.companyId});
          if (v.companyName === '贵州高投服务管理有限公司') {
            this.drapData.value = this.companyID = v.companyId;
          }
        });
        this.cashTree.treeData = val.organizationConfig.companyList;
        this.drapData.option  = this.dapartOption;
        this.queryCashData(this.pageNo, this.companyID);
      });
    });
  }

  public  showAddDialog(): void {
    this.getvideoConfigInfo();
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '800',
      dialog: true
    };
    const list = ['storeId', 'cashRegisterCode', 'name'];
    list.forEach(val => {
      this.form.push({key: val, disabled: false, required: false, value: ''});
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '店铺名称', type: 'tree', name: 'name', option: '', placeholder: '请输选择店铺名称'},
      {label: '收银机编号', type: 'input', name: 'cashRegisterCode', option: '', placeholder: '请输入收银机编号'},
    ];
  }

  public  addCashRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.cashSrv.addCashConfig(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryCashData(this.pageNo, this.companyID);
            this.dialogOption.dialog = false;
            this.cashSelect = [];
            this.formdata = [];
            this.form = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }
  // public  showmodifyDapartDialog(): void {
  //   if (this.cashSelect.length === 0 || this.cashSelect.length === undefined) {
  //     this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
  //   } else if ( this.cashSelect.length === 1) {
  //     console.log(this.cashSelect);
  //     this.dialogOption = {
  //       type: 'add',
  //       title: '修改信息',
  //       width: '800',
  //       dialog: true
  //     };
  //     const list = ['deptName', 'companyId', 'parentId', 'name'];
  //     list.forEach(val => {
  //       if (val === 'name'){
  //         this.form.push({key: val, disabled: false, required: false, value: this.cashSelect[0]['parentName'] === null ? this.cashSelect[0]['compayName'] : this.cashSelect[0]['parentName']});
  //       }else {
  //         this.form.push({key: val, disabled: false, required: false, value: this.cashSelect[0][val]});
  //
  //       }
  //     });
  //     this.formgroup = this.toolSrv.setFormGroup(this.form);
  //     this.formdata = [
  //       {label: '部门名称', type: 'input', name: 'deptName', option: '', placeholder: '请输入公司名称'},
  //       {label: '父级公司/部门', type: 'tree', name: 'name', option: '', placeholder: '请选择父级公司/部门'},
  //     ];
  //   } else {
  //     this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
  //   }
  // }
  //
  // public  modifyStoryRequest(data): void {
  //   this.toolSrv.setConfirmation('修改', '修改', () => {
  //     this.dapartSrv.updateDapartData(data).subscribe(
  //       value => {
  //         this.toolSrv.setQuestJudgment(value.status, value.message, () => {
  //           this.queryCashData(this.pageNo, this.companyID);
  //           this.dialogOption.dialog = false;
  //           this.cashSelect = [];
  //           this.formdata = [];
  //           this.form = [];
  //           this.formgroup.reset();
  //         });
  //       }
  //     );
  //   });
  // }
  // btn click event  (button点击事件)
  public  btnEvent(e): void {
    switch (e) {
      case '新增': this.showAddDialog(); break;
      // case '修改': this.showmodifyDapartDialog(); break;
      case '删除': this.deleteCash() ; break;
      default: break;
    }
  }
  // Pagination (分页)
  public  nowPageClick(e): void {
    this.pageNo = e;
    this.queryCashData(this.pageNo, this.companyID);
  }
  // delete dapartInfo (删除公司信息)
  public  deleteCash(): void {
    if (this.cashSelect.length === 1) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.cashSrv.delCashConfig({id: this.cashSelect[0].id}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.queryCashData(this.pageNo, this.companyID);
              this.cashSelect = [];
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
      this.cashSelect = [];
      this.formdata = [];
      this.form = [];
      this.formgroup.reset();
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          console.log(e.value.value);
          for (const eKey in e.value.value) {
            this.addCash[eKey] = e.value.value[eKey];
          }
          console.log(this.addCash);
          delete this.addCash['name'];
          this.addCashRequest(this.addCash);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
  // 获取下拉框的信息
  public  getDrapData(e): void {
    this.companyID = e;
    this.queryCashData(this.pageNo, this.companyID);
  }

  // 获取属性结构
  public getvideoConfigInfo(): void {
    this.videoSrv.getVideoConfigInfo({companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          value.companyComboBoxTreeList.forEach(v => {
            if (v.companyMngPrvcTreeList) {
              v.companyMngPrvcTreeList.forEach(val => {
                if (val.companyAreaInfoList) {
                  val.companyAreaInfoList.forEach(vdata => {
                    if (vdata.serviceAreaBasisInfoList) {
                      vdata.serviceAreaBasisInfoList.forEach(vh => {
                        if (vh.operatorInfoList){
                          vh.operatorInfoList.forEach(operator => {
                            const down = operator.downStoreList;
                            const nodownUp = operator.sysStoreList;
                            const up = operator.upstreamStoreList;
                            operator.children = [
                              {
                                id: 2,
                                label: '上行',
                                children: up
                              },
                              {
                                id: 3,
                                label: '下行',
                                children: down
                              },
                              {
                                id: 0,
                                label: '无方向',
                                children: nodownUp
                              }];
                            delete operator.downStoreList;
                            delete operator.upstreamStoreList;
                            delete operator.sysStoreList;
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
          this.cashTree.treeData = value.companyComboBoxTreeList;
        });
      }
    );
  }
}
