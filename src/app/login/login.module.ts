import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {PersonComponent} from '../person/person.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MessageModule, MessagesModule} from 'primeng/primeng';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
  ],
  exports: [
    LoginComponent
  ],
  providers: [MessageService, ConfirmationService]
})
export class LoginModule { }
