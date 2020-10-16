import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RoleGuard } from '@app/core/guards/role.guard';

 

import {
  Paginator
} from '@app/core/models/core';

import { NgxExcelTemplateModule } from 'ngx-excel-template';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '@app/core/interceptors/api.interceptor';

import { QueryBuilderModule } from 'src/app/lib/query-builder/query-builder.module';
 
import { CoreModule } from '@app/core/core.module';
import { EditPersonEducationComponent } from './edit-person-education/edit-person-education.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
 
const routes: Routes = [
 
 
  {
    path: 'edit/:id',
    component: EditPersonEducationComponent,
    data: { title: '  Kişi-Eğitim Tablosu Düzenle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  }

];
 



@NgModule({
  declarations: [EditPersonEducationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    QueryBuilderModule,
    NgxExcelTemplateModule.forRoot(),
    RouterModule.forChild(routes),
    SharedDirectivesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    } 
 
  ]
})
export class PersonEducationModule { }
