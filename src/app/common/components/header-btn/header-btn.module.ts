import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicBtnComponent } from './basic-btn/basic-btn.component';
import {DialogModule, DropdownModule, InputTextModule, ScrollPanelModule, TreeModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [BasicBtnComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TreeModule,
    ScrollPanelModule,
    DialogModule,
    InputTextModule,
  ],
  exports: [BasicBtnComponent]
})
export class HeaderBtnModule { }
