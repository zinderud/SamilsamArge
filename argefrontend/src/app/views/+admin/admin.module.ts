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


import { NgxExcelTemplateModule } from 'ngx-excel-template';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '@app/core/interceptors/api.interceptor';
import { UserResolver } from './resolvers/user.resolver';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

import { UserDetailModule } from './user-detail/user-detail.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { KontrolAtamaComponent } from './kontrol/kontrol-atama/kontrol-atama.component';
import { BasvuruResolver } from '../+basvuru/resolver/basvuru.resolver';
import { UserRoleResolver } from './resolvers/userrole.resolver';
import { KontrolListComponent } from './kontrol/kontrol-list/kontrol-list.component';
import { KontrolResolver } from './resolvers/kontrol.resolver';


const routes: Routes = [

  {
    path: 'user',
    component: ListUserComponent,
    data: { title: 'Kullanıcı Listele', expectedRole: ['Admin', 'Manager'] },
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
  },
  {
    path: 'user/detail',
    component: UserDetailComponent,
    data: { title: 'Kullanıcı e-Detay', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'kontrol-atama',
    component: KontrolAtamaComponent,
    data: { title: 'Kontrol Atama', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
    resolve: {
      data: BasvuruResolver,
      usersrole: UserRoleResolver,
      kontrol: KontrolResolver

    }
  },
  {
    path: 'kontrol-list',
    component: KontrolListComponent,
    data: { title: 'Kontrol List', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
    resolve: {
      kontrol: KontrolResolver
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
    UserDetailModule

  ],
  declarations: [
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    UserAddRoleComponent,
    KontrolAtamaComponent,
    KontrolListComponent,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    UserResolver,
    BasvuruResolver,
    UserRoleResolver,
    KontrolResolver

  ]
})
export class AdminModule { }
