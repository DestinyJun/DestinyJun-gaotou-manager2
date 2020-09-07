import { Injectable } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {GlobalService} from '../services/global.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PublicMethedService {

  private cleanTimer: any;
  private dataList: any[] = [];
  private dataName = null;
  public esDate = {
    firstDayOfWeek: 0,
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    clear: '清除'
  };
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private globalSrv: GlobalService) { }
  // set Toast
  public setToast(type, title, message): void {
    if (this.cleanTimer) {
      clearTimeout(this.cleanTimer);
    }
    this.messageService.clear();
    this.messageService.add({severity: type, summary: title, detail: message});
    this.cleanTimer = setTimeout(() => {
      this.messageService.clear();
    }, 3000);
  }


  /**
   * Set the data format
   * @param list  (getNatiuveStatus(getAdminStatus) result list)
   * @param status (Status value)
   * @param callback
   */
  public  setDataFormat(list: any[], status: any, callback: (...args: any[]) => any): void {
    this.dataList = [];
    list.forEach( v => {
       this.dataList.push({label: v.settingName, value: v.settingCode});
       if (status !== '' && status !== null) {
         if (status.toString() === v.settingCode) {
           this.dataName = v.settingName;
         }
       } else {
         this.dataName = null;
       }
       if (list.indexOf(v) === list.length - 1) {
          callback(this.dataList, this.dataName);
        }
     });
  }

  public  setConfirmation(title, message, callback: (...args: any[]) => any): void {
    this.confirmationService.confirm({
      message: `确认要${message}吗？`,
      header: `${title}` + `提醒`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        callback();
      },
      reject: () => {
      }
    });
  }

  /**
   *   Create formGroup
   * @param data
   */
  public  setFormGroup(data): any {
    const group: any = {};
    data.forEach( val => {
      if (val.disabled) {
        group[val.key] = new FormControl({value: val.value || '', disabled: true});
      } else {
        group[val.key] = new FormControl({value: val.value === 0 ? 0 : val.value  || '', disabled: false});
      }
      if (val.required) {
        group[val.key].validator = Validators.required;
      }
    });
    return new FormGroup(group);
  }

  /**
   * set Toast
   * @param status
   * @param message
   * @param callback
   */
  public setQuestJudgment(status, message, callback: (...args: any[]) => any): void {
    if (status === 1000) {
      this.setToast('success', '操作成功', message);
      callback();
    } else {
      // this.setToast('error', '操作失败', message);
      this.judgeStatus(status);
    }
  }

  /**
   * 判断状态码
   */

  public  judgeStatus(data): void {
    switch (data) {
      case 1001:   this.setToast('error', '请求失败', '失败'); break;
      case 1007:   this.setToast('error', '请求失败', '无此账号'); break;
      case 1017:   this.setToast('error', '请求失败', '密码错误'); break;
      case 1014:   this.setToast('error', '请求失败', '会话失败'); break;
      case 1012:   this.setToast('error', '请求失败', '您的登录状态已失效，请重新登录'); break;
      case 1015:   this.setToast('error', '请求失败', '无权访问'); break;
      case 1013:   this.setToast('error', '请求失败', '账号被其他人登录'); break;
      case 1018:   this.setToast('error', '请求失败', '账号已锁定'); break;
      default:
        break;
    }
  }
}
