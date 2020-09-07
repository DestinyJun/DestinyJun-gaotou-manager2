import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreComponent} from './store/store.component';
import {StoreTypeComponent} from './store-type/store-type.component';


const routes: Routes = [
  {path: 'storeInfo', component: StoreComponent},
  {path: 'storeType', component: StoreTypeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
