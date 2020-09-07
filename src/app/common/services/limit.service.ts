import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LimitService {

  constructor(
    private http: HttpClient
  ) {}
  // 分页查询
  public queryLimitData(pamars): Observable<any> {
    return this.http.post(`/PermissionManager/pageQueryPermissionInfo`, pamars);
  }
  // 查询配置信息
  public queryLimitConfigData(pamars): Observable<any> {
    return this.http.post(`/PermissionManager/config`, pamars);
  }

  // 添加权限
  public addLimitData(pamars): Observable<any> {
      return this.http.post(`/PermissionManager/insertPermission`, pamars);
  }
  // 更新权限
  public updateLimitData(pamars): Observable<any> {
    return this.http.post(`/PermissionManager/updatePermissionInfo`, pamars);
  }
 // 删除权限
  public delLimitData(pamars): Observable<any> {
    return this.http.post(`/PermissionManager/deletePermission`, pamars);
  }
}
