import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RoleGuard } from '@app/core/guards/role.guard';

import { NgxExcelTemplateModule } from 'ngx-excel-template';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '@app/core/interceptors/api.interceptor';

import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { ManagerAreaDetailComponent } from './manager-area-detail/manager-area-detail.component';


const routes: Routes = [


  {
    path: 'manager-area',
    component: ManagerAreaDetailComponent,
    data: { title: 'Manager  Alanı', expectedRole: ['Admin', 'Manager'] },
    canActivate: [RoleGuard],
  }

];

@NgModule({
  imports: [

    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxExcelTemplateModule.forRoot(),
    RouterModule.forChild(routes),
    SharedDirectivesModule,
    ManagerAreaDetailComponent

  ],
  declarations: [
    ManagerAreaDetailComponent


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }


  ]
})
export class ManagerAreaModule { }
