import { Component, OnInit } from '@angular/core';
import {BtnOption, SearchData} from '../../../common/components/header-btn/headerData.model';
import {PagingOption} from '../../../common/components/paging/paging.model';
import {FormValue} from '../../../common/components/basic-dialog/dialog.model';
import {FormGroup} from '@angular/forms';
import {PublicMethedService} from '../../../common/tool/public-methed.service';
import {VideoGroupService} from '../../../common/services/video-group.service';
import {AddVideoGroup, ModifyVideoGroup} from '../../../common/model/vide.model';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'rbi-video-group',
  templateUrl: './video-group.component.html',
  styleUrls: ['./video-group.component.less']
})
export class VideoGroupComponent implements OnInit {

  public btnOption: BtnOption = new BtnOption();
  public videoGroupSelect: any[] = [];
  public videoGroupTableOption: any;
  public pageOption: PagingOption = new PagingOption();
  public form: FormValue[] = [];
  public formgroup: FormGroup;
  public dialogOption: any;
  public formdata: any[];
  public companyTree: any;
  public modifyVideoGroup: ModifyVideoGroup = new ModifyVideoGroup();
  public addVideoGroup: AddVideoGroup = new AddVideoGroup();
  public searchData: SearchData = new SearchData();
  public pageNo = 1;
  constructor(
    private videoGroupSrv: VideoGroupService,
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
    this.queryvideoGroupData(this.pageNo);
  }
  // select data （选择数据）
  public  selectData(e): void {
    this.videoGroupSelect = e;
  }
  // set table data (设置表格数据)
  public setTableOption(data): void {
    this.videoGroupTableOption = {
      width: '100%',
      header: [
        {field: 'groupId', header: '摄像头组Id'},
        {field: 'groupName', header: '摄像头组名称'},
        {field: 'idt', header: '插入时间'},
      ],
      Content: data,
      btnHidden: false,
    };
  }
  // Paging query (分页查询)
  public queryvideoGroupData(data): void {
    this.videoGroupSrv.queryVideoGroupDataPage({currentPage: data, pageSize: 10, companyId: this.localSrv.get('companyId')}).subscribe(
      value => {
        console.log(value);
        this.toolSrv.setQuestJudgment(value.status, value.message, () => {
          this.videoGroupSelect = [];
          this.setTableOption(value.paingQueryData.datas);
          this.pageOption = {nowpage: value.paingQueryData.currentPage, row: value.paingQueryData.pageSize, total: value.paingQueryData.totalRecord};
        });
      }
    );
  }

  public  showAddDialog(): void {
    this.dialogOption = {
      type: 'add',
      title: '添加信息',
      width: '800',
      dialog: true
    };
    const list = ['groupName'];
    list.forEach(val => {
      this.form.push({key: val, disabled: false, required: true, value: ''});
    });
    this.formgroup = this.toolSrv.setFormGroup(this.form);
    this.formdata = [
      {label: '摄像头组名称', type: 'input', name: 'groupName', option: '', placeholder: '请输入摄像头组名称'},
    ];
  }

  public  addvideoGroupRequest(data): void {
    this.toolSrv.setConfirmation('添加', '添加', () => {
      this.videoGroupSrv.addVideoGroup(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryvideoGroupData(this.pageNo);
            this.dialogOption.dialog = false;
            this.videoGroupSelect = [];
            this.formdata = [];
            this.form = [];
            this.formgroup.reset();
          });
        }
      );
    });
  }
  public  showModifyvideoGroupDialog(): void {
    if (this.videoGroupSelect.length === 0 || this.videoGroupSelect.length === undefined) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if ( this.videoGroupSelect.length === 1) {
      this.modifyVideoGroup.groupId = this.videoGroupSelect[0].groupId;
      this.dialogOption = {
        type: 'add',
        title: '修改信息',
        width: '800',
        dialog: true
      };
      const list = ['groupName'];
      list.forEach(val => {
        this.form.push({key: val, disabled: false, required: true, value: this.videoGroupSelect[0][val]});
      });
      this.formgroup = this.toolSrv.setFormGroup(this.form);
      this.formdata = [
        {label: '摄像头组名称', type: 'input', name: 'groupName', option: '', placeholder: '请输入摄像头组名称'},
      ];
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  public  modifyStoryRequest(data): void {
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.videoGroupSrv.updateVideoGroup(data).subscribe(
        value => {
          console.log(value);
          this.toolSrv.setQuestJudgment(value.status, value.message, () => {
            this.queryvideoGroupData(this.pageNo);
            this.dialogOption.dialog = false;
            this.videoGroupSelect = [];
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
      case '修改': this.showModifyvideoGroupDialog(); break;
      case '删除': this.deletevideoGroup() ; break;
      default: break;
    }
  }
  // Pagination (分页)
  public  nowPageClick(e): void {
    this.pageNo = e;
    this.queryvideoGroupData(this.pageNo);
  }
  // delete videoGroupInfo (删除卡扣)
  public  deletevideoGroup(): void {
    if (this.videoGroupSelect.length === 1) {
      this.toolSrv.setConfirmation('删除', '删除', () => {
        this.videoGroupSrv.deleteVideoGroup({groupId: this.videoGroupSelect[0].groupId}).subscribe(
          value => {
            this.toolSrv.setQuestJudgment(value.status, value.message, () => {
              this.queryvideoGroupData(this.pageNo);
              // this.formgroup.reset();
              this.videoGroupSelect = [];
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
      this.videoGroupSelect = [];
      this.formdata = [];
      this.form = [];
      this.formgroup.reset();
    } else {
      if (e.invalid) {
        if (e.type === '添加信息') {
          for (const eKey in e.value.value) {
            this.addVideoGroup[eKey] = e.value.value[eKey];
          }
          this.addvideoGroupRequest(this.addVideoGroup);
        } else  {
          for (const eKey in e.value.value) {
            this.modifyVideoGroup[eKey] = e.value.value[eKey];
          }
          this.modifyStoryRequest(this.modifyVideoGroup);
        }
      } else {
        this.toolSrv.setToast('error', '操作错误', '信息未填完整');
      }
    }
  }
}
