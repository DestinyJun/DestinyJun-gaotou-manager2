import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PagingComponent} from './paging.component';
import {InputTextModule} from 'primeng/primeng';

@NgModule({
  declarations: [PagingComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [PagingComponent]
})
export class PagingModule { }
