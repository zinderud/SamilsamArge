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
import { KontrolFormComponent } from './kontrol-form/kontrol-form.component';
import { EditorModule } from 'primeng/editor';
import { ManagerKontrolListComponent } from './manager-kontrol-list/manager-kontrol-list.component';
import { KontrolResolver } from '../../+admin/resolvers/kontrol.resolver';
import { KontrolFormService } from './services/kontrol-form.service';


const routes: Routes = [


  {
    path: '',
    component: ManagerAreaDetailComponent,
    data: { title: 'Manager  Alanı', expectedRole: ['Admin', 'Manager'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'kontrol/:id',
    component: KontrolFormComponent,
    data: { title: 'Manager  Alanı', expectedRole: ['Admin', 'Manager'] },
    canActivate: [RoleGuard],
  }
  ,
  {
    path: 'kontrol-list',
    component: ManagerKontrolListComponent,
    data: { title: 'Kontrol List', expectedRole: ['Admin', 'Manager'] },
    canActivate: [RoleGuard],
    resolve: {
      data: KontrolResolver
    }
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
    EditorModule,


  ],
  declarations: [
    ManagerAreaDetailComponent,
    KontrolFormComponent,
    ManagerKontrolListComponent


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    KontrolResolver,
    KontrolFormService


  ]
})
export class ManagerAreaModule { }
