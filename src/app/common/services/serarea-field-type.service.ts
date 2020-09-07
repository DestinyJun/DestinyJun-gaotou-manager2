import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerareaFieldTypeService {

  constructor(
    private http: HttpClient
  ) { }
  public  queryServiceAreaFiledDataPage(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/paingQueryFieldType', pamars);
  }
  // 添加字段类型信息
  public  addServiceAreaFiledTypeInfo(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/insertFieldtype', pamars);
  }
  // 修改字段类型信息
  public  updateServiceAreaFiledTypeInfo(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/updateFieldtype', pamars);
  }
  // 删除字段类型信息
  public  deleteServiceAreaFiledTypeInfo(pamars): Observable<any> {
    return this.http.post('/AdministraionServiceArea/deleteFieldtype', pamars);
  }
}
