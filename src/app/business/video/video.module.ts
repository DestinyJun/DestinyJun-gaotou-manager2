import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoComponent } from './video/video.component';
import { VideoGroupComponent } from './video-group/video-group.component';
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
  declarations: [VideoComponent, VideoGroupComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    SLoationModule,
    PagingModule,
    DialogModule,
    BasicTableModule,
    HeaderBtnModule,
    BasicDialogModule
  ]
})
export class VideoModule { }
