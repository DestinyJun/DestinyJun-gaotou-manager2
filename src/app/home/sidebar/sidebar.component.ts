import { Component, OnInit } from '@angular/core';
import {NavList, NavListChild} from '../../common/model/home-model';
import {Router} from '@angular/router';

@Component({
  selector: 'rbi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  public logoShow = false;
  public navLists: NavList[] = [
    new NavList('系统首页', 'main', 'fa fa-university', true, [] , true),
    new NavList('区域管理', 'area', 'fa fa-car', false, [
      /* new NavListChild('数据采集', false, 'department/organization-management'),
       new NavListChild('部门管理', false, 'department/organization')*/
    ] , true),
    new NavList('组织机构', 'org/company', 'fa fa-car', false, [
      new NavListChild('公司管理', false, 'org/company', 'fa fa-snowflake-o'),
      new NavListChild('部门管理', false, 'org/depart', 'fa fa-snowflake-o'),
      // new NavListChild('职位管理', false, 'org/duty', 'fa fa-snowflake-o'),
    ] , true),
    // new NavList('用户管理', 'user', 'fa fa-bar-chart', false, [
    //   /*new NavListChild('生产线', false, 'device/proline'),
    //   new NavListChild('模块数据', false, 'device/prolicm'),
    //   new NavListChild('设备数据', false, 'device/proldata'),
    //   new NavListChild('传感器', false, 'device/prolsen'),*/
    // ] , true),
    new NavList('权限管理', 'limit', 'fa fa-bar-chart', false, [
      // new NavListChild('角色管理', false, 'limit/role', 'fa fa-snowflake-o'),
      /* new NavListChild('菜单权限', false, 'limit/menu', 'fa fa-snowflake-o'),
       new NavListChild('按钮管理', false, 'limit/button', 'fa fa-snowflake-o'),*/
      // new NavListChild('路由权限', false, 'limit/route', 'fa fa-snowflake-o'),
    ] , true),
    new NavList('用户管理', 'user', 'fa fa-user-circle', false, [
      // new NavListChild('角色管理', false, 'limit/role', 'fa fa-snowflake-o'),
      /* new NavListChild('菜单权限', false, 'limit/menu', 'fa fa-snowflake-o'),
       new NavListChild('按钮管理', false, 'limit/button', 'fa fa-snowflake-o'),*/
      // new NavListChild('路由权限', false, 'limit/route', 'fa fa-snowflake-o'),
    ] , true),
    new NavList('角色管理', 'role', 'fa fa-snowflake-o', false, [
      // new NavListChild('角色管理', false, 'limit/role', 'fa fa-snowflake-o'),
      /* new NavListChild('菜单权限', false, 'limit/menu', 'fa fa-snowflake-o'),
       new NavListChild('按钮管理', false, 'limit/button', 'fa fa-snowflake-o'),*/
      // new NavListChild('路由权限', false, 'limit/route', 'fa fa-snowflake-o'),
    ] , true),
    new NavList('服务区管理', 'serarea/info', 'fa fa-cog', false, [
      new NavListChild('服务区', false, 'serarea/info', 'fa fa-snowflake-o'),
      new NavListChild('服务区字段', false, 'serarea/field', 'fa fa-snowflake-o'),
      new NavListChild('服务区字段类型', false, 'serarea/fieldType', 'fa fa-snowflake-o'),
    ] , true),
    new NavList('商铺管理', 'store/storeInfo', 'fa fa-address-card-o', false, [
      new NavListChild('店铺信息', false, 'store/storeInfo', 'fa fa-cc-stripe'),
      new NavListChild('店铺类型', false, 'store/storeType', 'fa fa-meanpath'),
    ] , true),
    new NavList('卡口管理', 'intercept', 'fa fa-desktop', false, [] , true),
    // new NavList('WIFI管理', 'wifi', 'fa fa-desktop', false, [] , true),
    new NavList('视频管理', 'video/video', 'fa fa-cog', false, [
      new NavListChild('视频信息', false, 'video/video', 'fa fa-desktop'),
      new NavListChild('视频组信息', false, 'video/video-group', 'fa fa-desktop'),
    ] , true),
    // new NavList('SHOU ', 'apply', 'fa fa-desktop', false, [] , true),
    new NavList('收银机配置', 'cash', 'fa fa-id-card', false, [] , true),
    // new NavList('字典管理', '', 'fa fa-cog', false, [
    //   new NavListChild('字典', false, 'dict', 'fa fa-snowflake-o'),
    //   new NavListChild('字典词条', false, 'dict/word', 'fa fa-snowflake-o'),
    // ] , true),
    // new NavList('系统配置', '', 'fa fa-cog', false, [
    //   new NavListChild('事件类型', false, 'system/eventtype', 'fa fa-snowflake-o'),
    // ] , true),
  ];
  public slidinghight: number;
  public slidingTop: number;
  public difulHeight: number;
  constructor(private router: Router) {}
  ngOnInit() {}
  // public menuOnMousEnter(element): void {
  //   console.log(element);
  //   element.srcElement.style.left = '0';
  //   this.logoShow = true;
  // }
  // public onMouseleave(element): void {
  //   this.slidingTop = -120;
  //   element.srcElement.style.left = '-143px';
  //   this.logoShow = false;
  // }
  public mainLiMouseEnter(element): void {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
  }
  public mainLiClick(mainul, element, list): void {
    if (list.routers) {
      this.router.navigate(['/home/' + list.routers]);
      console.log(list.routers);
    }
    this.difulHeight = 0;
    if (!(list.children.length > 0)) {
      // this.router.navigate(['/home']);
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      console.log(list);
      this.navLists.forEach((item) => {

        item.open = true;
        item.clsstate = false;
        if (item.children.length > 0) {
          item.children.forEach((itemchild) => {
              itemchild.setState = false;
          });
        }
      });
      list.clsstate = true;
      // if (list.children.length > 0) {
      //   list.children.forEach( (v, index) => {
      //      if (index === 0) {
      //        v.setState = true;
      //      } else {
      //        v.setState = false;
      //      }
      //   });
      // }else {
      //   list.setState = true;
      // }
      return;
    } else {
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      console.log(list);
      this.navLists.forEach((item) => {

        item.open = true;
        item.clsstate = false;
        if (item.children.length > 0) {
          item.children.forEach((itemchild) => {
            itemchild.setState = false;
          });
        }
      });
      list.children.forEach( (v, index) => {
           if (index === 0) {
             v.setState = true;
           } else {
             v.setState = false;
           }
        });
      list.clsstate = false;
    }
    if (element.offsetHeight === 0) {
      this.navLists.forEach((item) => {
        item.open = true;
      });
      list.open = false;
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      for (let i = 0; i < list.children.length; i++) {
        this.difulHeight = this.difulHeight + 40;
      }
      element.style.height = this.difulHeight.toString() + 'px';
    }
    else {
      list.open = true;
      this.difulHeight = 0;
      element.style.height = this.difulHeight.toString() + 'px';
      setTimeout(() => {
        list.open = true;
      }, 200);
    }
  }
  public menuliMouseEnter(element): void {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
    element.setState = true;
  }
  public menuliClick(element): void {
    this.navLists.forEach((item) => {
      item.clsstate = false;
      item.children.forEach((itemchild) => {
        itemchild.setState = false;
      });
    });
    element.setState = true;
  }
}
