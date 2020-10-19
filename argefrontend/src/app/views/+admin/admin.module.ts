import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RoleGuard } from '@app/core/guards/role.guard';



import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UserAddRoleComponent } from './user/user-add-role/user-add-role.component';


import {
  Paginator
} from '@app/core/models/core';

import { NgxExcelTemplateModule } from 'ngx-excel-template';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '@app/core/interceptors/api.interceptor';

import { QueryBuilderModule } from 'src/app/lib/query-builder/query-builder.module';
import { UserResolver } from './resolvers/user.resolver';
import { CoreModule } from '@app/core/core.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
 
import { EducationResolver } from './resolvers/educations.resolver';


const routes: Routes = [

  {
    path: 'user',
    component: ListUserComponent,
    data: { title: 'Kullanıcı Listele', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
    resolve: {
      data: UserResolver
    }
  },
  {
    path: 'user/add',
    component: AddUserComponent,
    data: { title: 'Kullanıcı ekle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'user/add_role/:id',
    component: UserAddRoleComponent,
    data: { title: 'Kullanıcı rol ekle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'user/edit/:id',
    component: EditUserComponent,
    data: { title: 'Kullanıcı Düzenle', expectedRole: ['Admin'] },
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
    QueryBuilderModule,
    NgxExcelTemplateModule.forRoot(),
    RouterModule.forChild(routes),
    SharedDirectivesModule

  ],
  declarations: [
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    UserAddRoleComponent,
 

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }, 
    UserResolver

  ]
})
export class AdminModule { }
