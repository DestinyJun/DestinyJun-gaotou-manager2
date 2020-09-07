import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'rbi-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  public error: any = null;
  public errorMessage: any;
  constructor(
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeInfo.queryParams.subscribe(
      (val) => {
        console.log(val.meg);
        this.errorMessage = val.msg + ',错误码：' + val.status;
        // console.log(val);
        // this.error = val.error;
      }
    );
  }
  public btnClick() {
    window.history.back();
  }
}
