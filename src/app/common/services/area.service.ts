import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  constructor(
    private http: HttpClient
  ) {}
  public  getAreaBaasicData(pamars): Observable<any> {
      return this.http.post('/config/common/allProvinceCurrencyInfo', pamars);
  }
  public  queryAreaDataPage(pamars): Observable<any> {
    return this.http.post('/AdministraionArea/paingQueryCMAInfo', pamars);
  }
  public  addAreaData(pamars): Observable<any> {
    return this.http.post('/AdministraionArea/insertManagerArea', pamars);
  }
  public  deleteAreaData(pamars): Observable<any> {
    return this.http.post('/AdministraionArea/deleteManagerArea', pamars);
  }
  public  modifyAreaData(pamars): Observable<any> {
    return this.http.post('/AdministraionArea/updataManagerArea', pamars);
  }
}
