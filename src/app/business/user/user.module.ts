import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {SLoationModule} from '../../common/components/s-loation/s-loation.module';
import {PagingModule} from '../../common/components/paging/paging.module';
import {DialogModule} from 'primeng/dialog';
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {HeaderBtnModule} from '../../common/components/header-btn/header-btn.module';
import {BasicDialogModule} from '../../common/components/basic-dialog/basic-dialog.module';
import {PublicMethedService} from '../../common/tool/public-methed.service';
import {ConfirmationService, MessageService} from 'primeng/api';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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
  providers: [PublicMethedService, MessageService, ConfirmationService, DatePipe]
})
export class UserModule { }
