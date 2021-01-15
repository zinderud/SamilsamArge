import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import { UserDetailComponent } from './user-detail.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import {
  NbCardModule,
  NbInputModule,
  NbIconModule,
  NbPopoverModule,
  NbButtonModule, NbCheckboxModule
} from '@nebular/theme';
@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    NbIconModule,
    NbButtonModule,
    NbPopoverModule,
    ReactiveFormsModule
  ]
})
export class UserDetailModule { }
