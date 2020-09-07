import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EMPTY, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LocalStorageService} from './local-storage.service';
import {PublicMethedService} from '../tool/public-methed.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public clonedRequest: any;
  constructor(
    private router: Router,
    private localSessionStorage: LocalStorageService,
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return this.prod_http(req, next);
    if (environment.production) {
      return this.prod_http(req, next);
    } else {
      return this.debug_http(req, next);
    }
  }
  public debug_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url ===  '/login') {
      this.clonedRequest = req.clone({
        url: environment.loginUrl + req.url,
        headers: req.headers
        .set('Content-type', 'application/json; charset=UTF-8')
        // .set('Content-type', 'application/x-www-form-urlencoded')
        // .set('appkey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJBUFAiLCJpc3MiOiJTZXJ2aWNlIiwiZXhwIjoxNTU5MDU1NDQ0LCJ1c2VySWQiOiIxNTU4NDkyMzY0NDMzNTUiLCJpYXQiOjE1NTkwMTIyNDR9.uF14iNrkqX61cIBVxSq7wJ-GUwQAOUvpTSWdXiB_MGY')
      });
    } else {
      this.clonedRequest = req.clone({
        url: environment.url + req.url,
        headers: req.headers
        .set('Content-type', 'application/json; charset=UTF-8')
        .set('accessToken', this.localSessionStorage.get('appkey'))
        // .set('systemKey', 'c1fa8026-cfcf-4436-9f7e-ec2c8dd7d468')
        // .set('appkey', this.localSessionStorage.get('appkey'))
      });
    }
    return next.handle(this.clonedRequest).pipe(
      tap((event: any) => {
        if (event.status === 200) {
          // if (event.body.status === '1000') {
              return of(event);
          // } else if (event.body.status === 1017) {
            // this.router.navigate(['/error'], {
            //   queryParams: {
            //     msg: event.body.message,
            //     btn: '请重试',
            //     status: event.body.status,
            //   }
            // });
          // }
        }
        return EMPTY;
      },
        (err) => {
            this.router.navigate(['/error'], {
                queryParams: {
                  msg: '连接服务器失败，请检查网络！',
                  status: err.status,
                  btn: '请重试'
                }
              });
            return EMPTY;
          })
      );
  }
   public prod_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if (req.url ===  '/login') {
       this.clonedRequest = req.clone({
         url: environment.loginUrl + req.url,
         headers: req.headers
           .set('Content-type', 'application/json; charset=UTF-8')
         // .set('Content-type', 'application/x-www-form-urlencoded')
       });
     } else {
       this.clonedRequest = req.clone({
         url: environment.url + req.url,
         headers: req.headers
           .set('Content-type', 'application/json; charset=UTF-8')
           .set('accessToken', this.localSessionStorage.get('appkey'))
           // .set('appkey', this.localSessionStorage.get('appkey'))
       });
     }
     return next.handle(this.clonedRequest).pipe(
       tap((event: any) => {
           if (event.status === 200) {
               return of(event);
           }
           return EMPTY;
         },
         (err) => {
           if (err.status === 0) {
             this.router.navigate(['/error'], {
               queryParams: {
                 msg: '连接服务器失败，请检查网络！',
                 url: null,
                 btn: '请重试',
               }});
           }
           if (err.status === 400) {
             return of(err);
           }
           if (err.status === 500) {
             this.router.navigate(['/error'], {
               queryParams: {
                 msg: '服务器处理失败！请联系管理员',
                 url: null,
                 btn: '请重试',
               }});
           }
         })
     );
  }
}
