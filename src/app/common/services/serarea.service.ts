import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerareaService {

  constructor(
    private http: HttpClient
  ) { }
  public  queryServiceAreaDataPage(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/paingQueryServiceArea', pamars);
  }

  // 获取服务区配置细信息
  public  queryServiceAreaConfig(pamars): Observable<any> {
    return this.http.post('/config/common/getCompanyMngPrvcAreaTree', pamars);
  }
  // 获取服务区添加字段
  public  queryServiceAreaField(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/getServiceAreaField', pamars);
  }
  //  删除服务区
  public  deleteServiceInfo(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/deleteServiceArea', pamars);
  }
  // 添加服务区
  public  addServiceInfo(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/insertServiceArea', pamars);
  }
  //  更新服务区
  public  updateServiceInfo(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/updateServiceArea', pamars);
  }
  // 更新信息删除字段
  public  updateServiceInfoDeleteField(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/deleteServiceAreaField', pamars);
  }
  // 根据服务区ID获取服务区信息
  public  getServiceInfoById(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/getServiceAreaDetailedInfo', pamars);
  }

  // 获取服务区未拥有字段
  public  getSerareaNoUseFiled(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/getServiceAreaNotOwnedField', pamars);
  }

  // 在更新服务器信息界面添加服务区未拥有字段
  public  addSerareaNoUseFiled(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/insertServiceAreaNotOwnedField', pamars);
  }
}
