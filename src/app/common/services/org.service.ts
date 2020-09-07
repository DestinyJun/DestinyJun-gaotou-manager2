import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 公司模块
   * @param pamars
   */
  // 获取公司配置信息
  public getCompanyConfigData(pamars): Observable<any> {
    return this.http.post(`/config/common/companConfig`, pamars);
  }
  // 获取公司分页列表
  public queryCompanyPageData(pamars): Observable<any> {
    return this.http.post(`/companyManager/pageQueryCompanyInfo`, pamars);
  }
  // 添加公司信息
  public addCompanyData(pamars): Observable<any> {
    return this.http.post(`/companyManager/insertCompany`, pamars);
  }
  // 修改公司信息
  public updateCompanyData(pamars): Observable<any> {
    return this.http.post(`/companyManager/updateCompanyInfo`, pamars);
  }
  // 删除公司信息
  public delCompanyData(pamars): Observable<any> {
    return this.http.post(`/companyManager/deleteCompany`, pamars);
  }


  /**
   * 部门模块
   * @param pamars
   */
  // 获取部门配置信息
  public getDapartConfigData(pamars): Observable<any> {
    return this.http.post(`/deptManager/config`, pamars);
  }
  // 获取部门分页列表
  public queryDapartPageData(pamars): Observable<any> {
    return this.http.post(`/deptManager/pageQueryDeptInfo`, pamars);
  }
  // 添加部门信息
  public addDapartData(pamars): Observable<any> {
    return this.http.post(`/deptManager/insertDept`, pamars);
  }
  // 修改部门信息
  public updateDapartData(pamars): Observable<any> {
    return this.http.post(`/deptManager/updateDeptInfo`, pamars);
  }
  // 删除部门信息
  public delDapartData(pamars): Observable<any> {
    return this.http.post(`/deptManager/deleteDept`, pamars);
  }
}
