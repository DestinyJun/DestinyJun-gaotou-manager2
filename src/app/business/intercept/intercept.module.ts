import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterceptRoutingModule } from './intercept-routing.module';
import { InterceptComponent } from './intercept/intercept.component';
import {PublicMethedService} from '../../common/tool/public-methed.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {SLoationModule} from '../../common/components/s-loation/s-loation.module';
import {PagingModule} from '../../common/components/paging/paging.module';
import {DialogModule} from 'primeng/dialog';
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {HeaderBtnModule} from '../../common/components/header-btn/header-btn.module';
import {BasicDialogModule} from '../../common/components/basic-dialog/basic-dialog.module';


@NgModule({
  declarations: [InterceptComponent],
  imports: [
    CommonModule,
    InterceptRoutingModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    SLoationModule,
    PagingModule,
    DialogModule,
    BasicTableModule,
    HeaderBtnModule,
    BasicDialogModule
  ],
  providers: [PublicMethedService, MessageService, ConfirmationService, ]
})
export class InterceptModule { }
