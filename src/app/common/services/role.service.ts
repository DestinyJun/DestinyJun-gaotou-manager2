import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 角色模块
   */
  // 获取角色配置信息
  public getRoleConfigData(pamars): Observable<any> {
    return this.http.post(`/roleManager/config`, pamars);
  }
  // 获取角色分页
  public queryRolePageData(pamars): Observable<any> {
    return this.http.post(`/roleManager/pageQueryCompanyDeptRoleInfo`, pamars);
  }
  // 添加角色信息
  public addRoleData(pamars): Observable<any> {
    return this.http.post(`/roleManager/insertCompanyDeptRole`, pamars);
  }
  // 修改角色信息
  public updateRoleData(pamars): Observable<any> {
    return this.http.post(`/roleManager/updateCompanyDeptRoleInfo`, pamars);
  }
  // 删除角色信息
  public delRoleData(pamars): Observable<any> {
    return this.http.post(`/roleManager/deleteCompanyDeptRole`, pamars);
  }
}
