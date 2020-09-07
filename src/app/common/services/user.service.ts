import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 用户模块
   */
  // 获取用户配置信息
  public getUserConfigData(pamars): Observable<any> {
    return this.http.post(`/userManager/config`, pamars);
  }
  // 获取用户分页
  public queryUserPageData(pamars): Observable<any> {
    return this.http.post(`/userManager/pageQueryUserInfo`, pamars);
  }
  // 添加用户信息
  public addUserData(pamars): Observable<any> {
    return this.http.post(`/userManager/insertUser`, pamars);
  }
  // 修改用户信息
  public updateUserData(pamars): Observable<any> {
    return this.http.post(`/userManager/updateUserInfo`, pamars);
  }
  // 删除用户信息
  public delUserData(pamars): Observable<any> {
    return this.http.post(`/userManager/deleteUser`, pamars);
  }
}
