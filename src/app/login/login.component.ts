import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LocalStorageService} from '../common/services/local-storage.service';
import {LoginService} from '../common/services/login.service';
import {PublicMethedService} from '../common/tool/public-methed.service';

@Component({
  selector: 'rbi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
// 表单
  public myFromModule: FormGroup;
  public formUsername: any;
  public formPassword: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private localSessionStorage: LocalStorageService,
    private loginSrv: LoginService,
    private toolSrv: PublicMethedService,
  ) {
  }

  ngOnInit() {
    this.myFromModule = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['' , [Validators.required]]
    });
    this.formUsername = this.myFromModule.get('userName');
    this.formPassword = this.myFromModule.get('password');
  }

//  登陆
  public onSubmit() {
    if (this.myFromModule.valid) {
      this.loginSrv.getLogin({userName: this.formUsername.value, password: this.formPassword.value}).subscribe(
        value => {
          console.log(value);
          if (value.status === 1000) {
            this.toolSrv.setToast('success', '操作成功', '用户登录成功');
            this.localSessionStorage.set('companyId', value.companyId);
            this.localSessionStorage.set('appkey', value.key);
            setTimeout(() => {
              this.route.navigate(['/home/main']);
            }, 500);
          } else {
            this.toolSrv.judgeStatus(value.status);
          }
        }
      );
    } else {
      this.toolSrv.setToast('warn', '登陆失败', '请输入合法的用户名和密码');
    }

  }
}
