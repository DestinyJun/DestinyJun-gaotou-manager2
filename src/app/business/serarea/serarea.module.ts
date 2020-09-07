import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { SerareaRoutingModule } from './serarea-routing.module';
import {SerareaComponent} from './serarea/serarea.component';
import {SLoationModule} from '../../common/components/s-loation/s-loation.module';
import {ConfirmationService, ConfirmDialogModule, DialogModule, MessageModule, MessageService, MessagesModule} from 'primeng/primeng';
import {PagingModule} from '../../common/components/paging/paging.module';
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {HeaderBtnModule} from '../../common/components/header-btn/header-btn.module';
import {BasicDialogModule} from '../../common/components/basic-dialog/basic-dialog.module';
import {PublicMethedService} from '../../common/tool/public-methed.service';
import { SerareaFieldComponent } from './serarea-field/serarea-field.component';
import { SerareaFieldTypeComponent } from './serarea-field-type/serarea-field-type.component';


@NgModule({
  declarations: [SerareaComponent, SerareaFieldComponent, SerareaFieldTypeComponent],
  imports: [
    CommonModule,
    SerareaRoutingModule,
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
export class SerareaModule { }
