import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InterceptComponent} from './intercept/intercept.component';


const routes: Routes = [
  {path: '', component: InterceptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterceptRoutingModule { }
