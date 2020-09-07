import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptService {

  constructor(
    private http: HttpClient
  ) { }

  // 分页查询
  public queryInterceptDataPage(pamars): Observable<any> {
      return this.http.post('/BayonetManager/paingQueryBayonet', pamars);
  }
  // 获取卡口配置信息
  public getInterceptConfigData(pamars): Observable<any> {
    return this.http.post('/config/common/getCompanyMngPrvcAreaServiceAreaTree', pamars);
  }
  // 新增卡口
  public addInterceptInfo(pamars): Observable<any> {
    return this.http.post('/BayonetManager/insertBayonet', pamars);
  }
  // 修改卡口
  public modifyInterceptInfo(pamars): Observable<any> {
    return this.http.post('/BayonetManager/updateBayonet', pamars);
  }
  // 删除卡口
  public  deleteIntercept(pamars): Observable<any> {
    return this.http.post('/BayonetManager/deleteBayonet', pamars);
  }
}
