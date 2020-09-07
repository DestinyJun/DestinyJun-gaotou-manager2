import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyComponent} from './company/company.component';
import {DapartComponent} from './dapart/dapart.component';


const routes: Routes = [
  {path: 'company', component: CompanyComponent},
  {path: 'depart', component: DapartComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
