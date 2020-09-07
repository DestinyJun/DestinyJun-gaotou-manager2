import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoGroupService {
  constructor(
    private http: HttpClient
  ) { }
  // 摄像头组列表
  public  queryVideoGroupDataPage(pamars): Observable<any> {
    return this.http.post('/CameraManager/paingQueryCameraGroup', pamars);
  }
  // 添加摄像组
  public  addVideoGroup(pamars): Observable<any> {
    return this.http.post('/CameraManager/insertCameraGroup', pamars);
  }
  // 更新摄像组
  public  updateVideoGroup(pamars): Observable<any> {
    return this.http.post('/CameraManager/updateCameraGroup', pamars);
  }

  // 删除摄像组
  public  deleteVideoGroup(pamars): Observable<any> {
    return this.http.post('/CameraManager/deleteCameraGroup', pamars);
  }
}
