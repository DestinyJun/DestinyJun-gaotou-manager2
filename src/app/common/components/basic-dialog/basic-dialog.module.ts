import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPopComponent } from './detail-pop/detail-pop.component';
import {
  CalendarModule, CheckboxModule,
  DialogModule,
  DropdownModule,
  FileUploadModule, InputTextareaModule,
  InputTextModule,
  RadioButtonModule,
  ScrollPanelModule, TreeModule
} from 'primeng/primeng';
import {BasicTableModule} from '../basic-table/basic-table.module';
import { FilePopComponent } from './file-pop/file-pop.component';
import { UploadFileRecordComponent } from './upload-file-record/upload-file-record.component';
import { ReviewPopComponent } from './review-pop/review-pop.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogPopComponent } from './dialog-pop/dialog-pop.component';
import { ServicePopComponent } from './service-pop/service-pop.component';
import {PublicMethedService} from '../../tool/public-methed.service';

@NgModule({
  declarations: [
    DetailPopComponent,
    FilePopComponent,
    UploadFileRecordComponent,
    ReviewPopComponent,
    DialogPopComponent,
    ServicePopComponent
  ],
  imports: [
    CommonModule,
    ScrollPanelModule,
    DialogModule,
    BasicTableModule,
    FileUploadModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    InputTextareaModule,
    TreeModule,
  ],
  exports: [
    DetailPopComponent,
    FilePopComponent,
    UploadFileRecordComponent,
    ReviewPopComponent,
    DialogPopComponent,
    ServicePopComponent
  ],
  providers:[PublicMethedService]
})
export class BasicDialogModule { }
