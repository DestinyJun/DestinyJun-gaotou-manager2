import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CashConfigComponent} from './cash-config/cash-config.component';


const routes: Routes = [
  {path: '', component: CashConfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRoutingModule { }
