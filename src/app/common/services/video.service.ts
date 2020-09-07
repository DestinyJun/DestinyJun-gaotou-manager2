import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(
    private http: HttpClient
  ) { }

  public  queryVideoDataPage(pamars): Observable<any> {
      return this.http.post('/CameraManager/paingQueryCamera', pamars);
  }
  // 获取摄像头配置信息
  public  getVideoConfigInfo(pamars): Observable<any> {
    return this.http.post('/config/common/getCompanyMngPrvcAreaServiceAreaStoreTree', pamars);
  }
  // 获取摄像头组信息
  public  getVideoGroupInfo(pamars): Observable<any> {
    return this.http.post('/CameraManager/getAllCameraGroup', pamars);
  }

  // 添加摄像头组信息
  public  addVideoInfo(pamars): Observable<any> {
    return this.http.post('/CameraManager/insertCamera', pamars);
  }

  // 更新摄像头组信息
  public  updateVideoInfo(pamars): Observable<any> {
    return this.http.post('/CameraManager/updateCamera', pamars);
  }

  // 删除摄像头组信息
  public  deleteVideoInfo(pamars): Observable<any> {
    return this.http.post('/CameraManager/deleteCamera', pamars);
  }

}
