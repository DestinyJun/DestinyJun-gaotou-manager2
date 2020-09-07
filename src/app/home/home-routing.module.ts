import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'main' , loadChildren: () => import('../business/main/main.module').then(m => m.MainModule)},
      {path: 'area', loadChildren: () => import('../business/area/area.module').then(m => m.AreaModule)},
      {path: 'serarea', loadChildren: () => import('../business/serarea/serarea.module').then(m => m.SerareaModule)},
      {path: 'intercept', loadChildren: () => import('../business/intercept/intercept.module').then(m => m.InterceptModule)},
      {path: 'store', loadChildren: () => import('../business/store/store.module').then(m => m.StoreModule)},
      {path: 'video', loadChildren: () => import('../business/video/video.module').then(m => m.VideoModule)},
      {path: 'org', loadChildren: () => import('../business/organization/organization.module').then(m => m.OrganizationModule)},
      {path: 'user', loadChildren: () => import('../business/user/user.module').then(m => m.UserModule)},
      {path: 'role', loadChildren: () => import('../business/role/role.module').then(m => m.RoleModule)},
      {path: 'limit', loadChildren: () => import('../business/limit/limit.module').then(m => m.LimitModule)},
      {path: 'cash', loadChildren: () => import('../business/cash/cash.module').then(m => m.CashModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
