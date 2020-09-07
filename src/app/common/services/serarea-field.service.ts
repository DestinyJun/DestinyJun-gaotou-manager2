import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerareaFieldService {

  constructor(
    private http: HttpClient
  ) { }
  public  queryServiceAreaFiledDataPage(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/paingQueryField', pamars);
  }
  // 添加服务区字段
  public  addServiceAreaFiled(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/insertField', pamars);
  }

  // 添加服务区字段
  public  updateServiceAreaFiled(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/updateField', pamars);
  }
   // 删除服务区字段信息
  public  deleteServiceAreaFiled(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/deleteField', pamars);
  }

  public  getServiceTypeConfig(pamars): Observable<any> {
    return this.http.post('/config/common/getFieldTypeComboBox', pamars);
  }
}
