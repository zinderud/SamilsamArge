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
import { UserAreaDetailComponent } from './user-area-detail/user-area-detail.component';
import { UserBasvuruListComponent } from './user-basvuru-list/user-basvuru-list.component';
import { UserAreaBasvuruResolver } from './resolver/user-area-basvuru-resolver';



const routes: Routes = [


  {
    path: '',
    component: UserAreaDetailComponent,
    data: { title: 'Kullanıcı  Alanı', expectedRole: ['Admin', 'Manager', 'User'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'basvuru-list',
    component: UserBasvuruListComponent,
    data: { title: 'Kullanıcı  Başvuruları', expectedRole: ['Admin', 'Manager', 'User'] },
    canActivate: [RoleGuard],

    resolve: {
      data: UserAreaBasvuruResolver
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


  ],
  declarations: [
    UserAreaDetailComponent,
    UserBasvuruListComponent


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    UserAreaBasvuruResolver


  ]
})
export class UserAreaModule { }
