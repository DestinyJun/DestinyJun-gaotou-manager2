import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import {AreaComponent} from './area/area.component';
import {SLoationModule} from '../../common/components/s-loation/s-loation.module';
import {ConfirmationService, ConfirmDialogModule, DialogModule, MessageModule, MessageService, MessagesModule} from 'primeng/primeng';
import {PagingModule} from '../../common/components/paging/paging.module';
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {PublicMethedService} from '../../common/tool/public-methed.service';
import {HeaderBtnModule} from '../../common/components/header-btn/header-btn.module';
import {BasicDialogModule} from '../../common/components/basic-dialog/basic-dialog.module';



@NgModule({
  declarations: [AreaComponent],
  imports: [
    CommonModule,
    AreaRoutingModule,
    SLoationModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    PagingModule,
    DialogModule,
    BasicTableModule,
    HeaderBtnModule,
    BasicDialogModule
  ],
  providers: [MessageService, ConfirmationService, PublicMethedService]
})
export class AreaModule { }
