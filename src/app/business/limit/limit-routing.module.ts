import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LimitAuthorityComponent} from './limit-authority/limit-authority.component';


const routes: Routes = [
  {path: '', component: LimitAuthorityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimitRoutingModule { }
