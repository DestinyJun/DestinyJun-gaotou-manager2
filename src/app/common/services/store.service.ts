import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private http: HttpClient
  ) { }

  public  queryStoreDataPage(pamars): Observable<any> {
      return this.http.post('/StoreManager/paingQueryStore', pamars);
  }
  public  addStoreInfo(pamars): Observable<any> {
    return this.http.post('/StoreManager/insertStore', pamars);
  }
  public  deleteStoreInfo(pamars): Observable<any> {
      return this.http.post('/StoreManager/deleteStore', pamars);
  }
  public  updateStoreInfo(pamars): Observable<any> {
    return this.http.post('/StoreManager/updateStore', pamars);
  }
  public  queryStoreConfiginfo(pamars): Observable<any> {
    return this.http.post('/config/common/getStoreManangerConfigInfo', pamars);
  }
 public  getStoreTypeinfo(pamars): Observable<any> {
    return this.http.post('/StoreManager/getAllStoreType', pamars);
  }

  public  queryStoreDataPageByServiceId(pamars): Observable<any> {
    return this.http.post('/StoreManager/paingQueryStoreByServiceAreaId', pamars);
  }
}
