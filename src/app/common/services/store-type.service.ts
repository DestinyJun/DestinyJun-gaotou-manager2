import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreTypeService {

  constructor(
    private http: HttpClient
  ) { }
  public  queryStoreTypeDataPage(pamars): Observable<any> {
    return this.http.post('/StoreManager/paingQueryStoreType', pamars);
  }
  public  addStoreType(pamars): Observable<any> {
    return this.http.post('/StoreManager/insertStoreType', pamars);
  }
  public  deleteStoreType(pamars): Observable<any> {
    return this.http.post('/StoreManager/deleteStoreType', pamars);
  }
  public  upadteStoreType(pamars): Observable<any> {
    return this.http.post('/StoreManager/updateStoreType', pamars);
  }
}
