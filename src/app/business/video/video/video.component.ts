import {Component, OnInit} from '@angular/core';
import {BtnOption, SearchData} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue, TreeClass} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {VideoService} from '../../../common/services/video.service';
import {AddVideo, ModifyVideo} from '../../../common/model/vide.model';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'rbi-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less']
})
export class VideoComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public videoSelect: any[] = [];
  public videoTableOption: any;
  public pageOption: PagingOption = new PagingOption();

  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public addvideo: AddVideo = new AddVideo();
  public modifyvideo: ModifyVideo = new ModifyVideo();
  public companyTree: TreeClass = new TreeClass();
  public videoGroupOption = [];
  public searchData: SearchData = new SearchData();
  public ids = [];

  public pageNo = 1;

  constructor(
    private videoSrv: VideoService,
    private toolSrv: PublicMethedService,
    private localSrv: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.btnOption.btnlist = [
      {label: '新增', style: {background: '#55AB7F', marginLeft: '0'}},
      {label: '修改', style: {background: '#3A78DA', marginLeft: '1vw'}},
      {label: '删除', style: {background: '#A84847', marginLeft: '1vw'}},
    ];
    this.companyTree.type = 'video';
    this.searchData.searchHidden = false;
    this.btnOption.searchData = this.searchData;
    this.queryvideoData(this.pageNo);
    this.getvideoConfigInfo();
    this.getVideoGroupInfo();

    // this.getvideoTypeInfo();
  }

  // select data （选择数据）
  public selectData(e): void {
    this.videoSelect = e;
  }

  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.videoTableOption = {
      width: '100%',
      header: [
        {field: 'areaName', header: '片区名称'},
        {field: 'serviceAreaName', header: '服务区名称'},
        {field: 'orientation', header: '服务区方向'},
        {field: 'storeName', header: '店铺名称'},
        {field: 'cameraName', header: '摄像头名称'},
        {field: 'groupName', header: '摄像头组名称'},
        {field: 'videoUrl', header: '视频源地址'},
        {field: 'innerUrl', header: '视频源内网地址'},
        {field: 'outUrl', header: '视频源外网地址'},
      ],
      Content: data,
      btnHidden: false,
    };
  }

  // 摄像头分页查询
  public queryvideoData(data): void {
    this.videoSrv.queryVideoDataPage({currentPage: data, pageSize: 10, companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        if (value.status === 1000) {
          this.videoSelect = [];
          value.paingQueryData.datas.forEach(v => {
            // console.log(v);
            v.orientation = (v.orientation === 2) ? '上行' : (v.orientation === 3) ? '下行' : '无方向';
          });
          this.setTableOption(value.paingQueryData.datas);
          this.pageOption = {
            nowpage: value.paingQueryData.currentPage,
            row: value.paingQueryData.pageSize,
            total: value.paingQueryData.totalRecord
          };
        } else {
          this.toolSrv.setToast('error', '查询失败', value.message);
        }
      }
    );
  }

  // 获取摄像头组
  public getVideoGroupInfo(): void {
    this.videoSrv.getVideoGroupInfo({companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        if (value.status === 1000) {
          this.videoGroupOption.unshift({label: '无需分组', value: 0});
          value.data.forEach(v => {
            this.videoGroupOption.push({label: v.groupName, value: v.groupId});
          });
        }
      }
    );
  }

  // 摄像头添加弹窗
  public showAddDialog(): void {
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '1000',
      dialog: true
    };
    const list = ['cameraName', 'serviceAreaId', 'orientation', 'storeId', 'name', 'isInStore',
      'groupId', 'cameraType', 'videoUrl', 'outUrl', 'innerUrl'];
    list.forEach(val => {
      if (val === 'isInStore' || val === 'cameraType') {
        this.form.push({key: val, disabled: false, required: true, value: 1});
      } else if (val === 'orientation') {
        this.form.push({key: val, disabled: false, required: true, value: 2});
      } else if (val === 'storeId') {
        this.form.push({key: val, disabled: false, required: false, value: ''});
      } else if (val === 'groupId') {
        this.form.push({key: val, disabled: false, required: false, value: 0});
      } else {
        this.form.push({key: val, disabled: false, required: true, value: ''});
      }
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '服务区/店铺名称', type: 'tree', name: 'name', option: '', placeholder: '请选择服务区/店铺名称'},
      {label: '摄像头名称', type: 'input', name: 'cameraName', option: '', placeholder: '请输入摄像头名称'},
      {
        label: '方向',
        type: 'radio',
        name: 'orientation',
        option: '',
        placeholder: '',
        value: [
          {label: '无方向', name: 'orientation', value: 1, group: 'group'},
          {label: '上行', name: 'orientation', value: 2, group: 'group'},
          {label: '下行', name: 'orientation', value: 3, group: 'group'},
          ]
      },
      {
        label: '是否在店铺内',
        type: 'radio',
        name: 'isInStore',
        option: '',
        placeholder: '',
        value: [{label: '是', name: 'isInStore', value: 1, group: 'group1'}, {label: '否', name: 'isInStore', value: 2, group: 'group1'}]
      },
      {label: '摄像头组', type: 'dropdown', name: 'groupId', option: this.videoGroupOption, placeholder: '请选择摄像头组'},
      {
        label: '摄像头类型',
        type: 'radio',
        name: 'cameraType',
        option: this.videoGroupOption,
        placeholder: '请选择摄像头组',
        value: [{label: '球机', name: 'cameraType', value: 1, group: 'group2'}, {
          label: '半球',
          name: 'cameraType',
          value: 2,
          group: 'group2'
        }, {label: '枪机', name: 'cameraType', value: 3, group: 'group2'}]
      },
      {label: '视频源地址', type: 'input', name: 'videoUrl', option: '', placeholder: '请输入视频源地址'},
      {label: '外网URL', type: 'input', name: 'outUrl', option: '', placeholder: '请输入视频外网URL'},
      {label: '内网URL', type: 'input', name: 'innerUrl', option: '', placeholder: '请输入视频内网URL'},
    ];
  }

  // 摄像头添加
  public addvideoRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.videoSrv.addVideoInfo(data).subscribe(
        value => {
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryvideoData(this.pageNo);
            this.dialogOption.dialog = false;
            this.videoSelect = [];
            this.formdata = [];
            this.form = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }

  public showModifyvideoDialog(): void {
    if (this.videoSelect.length === 0 || this.videoSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if (this.videoSelect.length === 1) {
      this.modifyvideo.cameraId = this.videoSelect[0].cameraId;
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '900',
        dialog: true
      };
      const list = ['cameraName', 'name', 'serviceAreaId', 'orientation', 'storeId', 'isInStore',
        'groupId', 'cameraType', 'videoUrl', 'outUrl', 'innerUrl'];
      list.forEach(val => {
        if (val === 'name') {
          if (this.videoSelect[0].storeName) {
            this.form.push({key: val, disabled: false, required: false, value: this.videoSelect[0].storeName});
          } else {
            this.form.push({key: val, disabled: false, required: false, value: this.videoSelect[0].serviceAreaName});
          }
        } else if (val === 'orientation') {
          this.form.push({key: val, disabled: false, required: true, value: this.videoSelect[0].orientation === '上行' ? 2 : 3});
        } else {
          this.form.push({key: val, disabled: false, required: false, value: this.videoSelect[0][val]});
        }
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '服务区/店铺名称', type: 'tree', name: 'name', option: '', placeholder: '请选择服务区/店铺名称'},
        // {label: '摄像头组', type: 'dropdown', name: 'storeId', option: this.videoGroupOption, placeholder: '请选择摄像头组'},
        {label: '摄像头名称', type: 'input', name: 'cameraName', option: '', placeholder: '请输入摄像头名称'},
        {
          label: '方向',
          type: 'radio',
          name: 'orientation',
          option: '',
          placeholder: '',
          value: [
            {label: '无方向', name: 'orientation', value: 1, group: 'group'},
            {label: '上行', name: 'orientation', value: 2, group: 'group'},
            {label: '下行', name: 'orientation', value: 3, group: 'group'},
          ]
        },
        {
          label: '是否在店铺内',
          type: 'radio',
          name: 'isInStore',
          option: '',
          placeholder: '',
          value: [{label: '是', name: 'isInStore', value: 1, group: 'group1'}, {label: '否', name: 'isInStore', value: 2, group: 'group1'}]
        },
        {label: '摄像头组', type: 'dropdown', name: 'groupId', option: this.videoGroupOption, placeholder: '请选择摄像头组'},
        {
          label: '摄像头类型',
          type: 'radio',
          name: 'cameraType',
          option: this.videoGroupOption,
          placeholder: '',
          value: [{label: '球机', name: 'cameraType', value: 1, group: 'group2'}, {
            label: '半球',
            name: 'cameraType',
            value: 2,
            group: 'group2'
          }, {label: '枪机', name: 'cameraType', value: 3, group: 'group2'}]
        },
        {label: '视频源地址', type: 'input', name: 'videoUrl', option: '', placeholder: '请输入视频源地址'},
        {label: '外网URL', type: 'input', name: 'outUrl', option: '', placeholder: '请输入视频外网URL'},
        {label: '内网URL', type: 'input', name: 'innerUrl', option: '', placeholder: '请输入视频内网URL'},
      ];
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  public modifyStoryRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.videoSrv.updateVideoInfo(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryvideoData(this.pageNo);
            this.dialogOption.dialog = false;
            this.videoSelect = [];
            this.formdata = [];
            this.form = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }

  // btn click event  (button点击事件)
  public btnEvent(e): void {
    switch (e) {
      case '新增':
        this.showAddDialog();
        break;
      case '修改':
        this.showModifyvideoDialog();
        break;
      case '删除':
        this.deletevideo();
        break;
      default:
        break;
    }
  }

  // Pagination (分页)
  public nowPageClick(e): void {
    this.pageNo = e;
    this.queryvideoData(this.pageNo);
  }

  // delete videoInfo (删除卡扣)
  public deletevideo(): void {
    if (this.videoSelect.length === 0 || this.videoSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作失败', '请选择一项进行删除');
    } else {
      this.ids = [];
      this.videoSelect.forEach(v => {
        this.ids.push(v.cameraId);
      });
      this.ids.join(',');
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.videoSrv.deleteVideoInfo(this.ids).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.queryvideoData(this.pageNo);
              // this.formgroup.reset();
              this.videoSelect = [];
            });
          }
        );
      });

    }
  }

  // 获取属性结构
  public getvideoConfigInfo(): void {
    this.videoSrv.getVideoConfigInfo({companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
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
          this.companyTree.treeData = value.companyComboBoxTreeList;
        });
      }
    );
  }

  // 修改、添加操作事件
  public eventClick(e): void {
    if (e === 'false') {
      this.dialogOption.dialog = false;
      this.videoSelect = [];
      this.formdata = [];
      this.form = [];
      this.formgroup.reset();
    }
    else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            if (eKey === 'storeId') {
              if (e.value.value[eKey] === '') {
                this.addvideo[eKey] = 0;
              } else {
                this.addvideo[eKey] = e.value.value[eKey];
              }
            } else if (eKey !== 'name') {
              this.addvideo[eKey] = e.value.value[eKey];

            }
          }
          this.addvideoRequest(this.addvideo);
        }
        else {
          for (const eKey in e.value.value) {
            if (eKey === 'storeId') {
              if (e.value.value[eKey] === '') {
                this.modifyvideo[eKey] = 0;
              } else {
                this.modifyvideo[eKey] = e.value.value[eKey];
              }
            } else if (eKey !== 'name') {
              this.modifyvideo[eKey] = e.value.value[eKey];

            }
          }
          this.modifyStoryRequest(this.modifyvideo);
        }
      }
      else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }

}
