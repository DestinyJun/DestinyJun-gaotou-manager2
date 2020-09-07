import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CashConfigService {

  constructor(
    private http: HttpClient
  ) { }
  // 分页请求
  queryCashPageData(pamars): Observable<any> {
    return this.http.post(`/paingQueryCashRegister`, pamars);
  }

  addCashConfig(pamars): Observable<any> {
    return  this.http.post(`/insertCashRegister`, pamars);
  }

  delCashConfig(pamars): Observable<any> {
    return  this.http.post(`/deleteCashRegister`, pamars);
  }
}

