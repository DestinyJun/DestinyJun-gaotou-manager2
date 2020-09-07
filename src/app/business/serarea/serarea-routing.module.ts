import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SerareaComponent} from './serarea/serarea.component';
import {SerareaFieldComponent} from './serarea-field/serarea-field.component';
import {SerareaFieldTypeComponent} from './serarea-field-type/serarea-field-type.component';


const routes: Routes = [
{path: 'info', component: SerareaComponent},
{path: 'field', component: SerareaFieldComponent},
{path: 'fieldType', component: SerareaFieldTypeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerareaRoutingModule { }
