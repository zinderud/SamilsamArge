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

import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { ListEducationComponent } from './list-education/list-education.component';
import { EducationResolver } from '../+admin/resolvers/educations.resolver';
import { AddEducationComponent } from './add-education/add-education.component';
import { EditEducationComponent } from './edit-education/edit-education.component';
import { EducationPersonComponent } from './education-person/education-person.component';



const routes: Routes = [


  {
    path: '',
    component: ListEducationComponent,
    data: { title: 'Kullanıcı Listele', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
    resolve: {
      data: EducationResolver
    }
  },

  {
    path: 'add',
    component: AddEducationComponent,
    data: { title: 'Kullanıcı ekle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'edit/:id',
    component: EditEducationComponent,
    data: { title: 'Kullanıcı Düzenle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'person/:id',
    component: EducationPersonComponent,
    data: { title: 'Eğtim Atama Düzenle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },


];

@NgModule({
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
  declarations: [

    ListEducationComponent,
    AddEducationComponent,
    EditEducationComponent,
    EducationPersonComponent

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },

    EducationResolver

  ]
})
export class EducationsModule { }
