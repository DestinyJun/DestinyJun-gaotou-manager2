import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store/store.component';
import {InterceptRoutingModule} from '../intercept/intercept-routing.module';
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
import { StoreTypeComponent } from './store-type/store-type.component';


@NgModule({
  declarations: [StoreComponent, StoreTypeComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
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
  providers: [PublicMethedService, MessageService, ConfirmationService]
})
export class StoreModule { }
