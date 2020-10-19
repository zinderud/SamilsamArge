import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

import { IndexComponent } from './index/index.component';
import { AuthGuard } from '@app/core/guards/core';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
 


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
    data: {title: 'ana sayfa'},
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
     RouterModule.forChild(routes),
     SharedDirectivesModule
  ],
  declarations: [IndexComponent  ]
})
export class DashboardModule { }
