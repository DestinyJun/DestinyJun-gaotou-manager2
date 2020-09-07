import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimitRoutingModule } from './limit-routing.module';
import { LimitAuthorityComponent } from './limit-authority/limit-authority.component';
import {AreaRoutingModule} from '../area/area-routing.module';
import {SLoationModule} from '../../common/components/s-loation/s-loation.module';
import {ConfirmDialogModule, DialogModule, MessageModule, MessagesModule} from 'primeng/primeng';
import {PagingModule} from '../../common/components/paging/paging.module';
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {HeaderBtnModule} from '../../common/components/header-btn/header-btn.module';
import {BasicDialogModule} from '../../common/components/basic-dialog/basic-dialog.module';


@NgModule({
  declarations: [LimitAuthorityComponent],
  imports: [
    CommonModule,
    LimitRoutingModule,
    SLoationModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    PagingModule,
    DialogModule,
    BasicTableModule,
    HeaderBtnModule,
    BasicDialogModule
  ]
})
export class LimitModule { }
