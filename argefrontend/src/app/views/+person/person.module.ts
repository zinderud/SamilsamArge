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



import { CoreModule } from '@app/core/core.module';
import { ListPersonComponent } from './list-person/list-person.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { PersonResolver } from './resolver/person.resolver';




const routes: Routes = [


  {
    path: '',
    component: ListPersonComponent,
    data: { title: 'Kullanıcı Listele', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
    resolve: {
      data: PersonResolver
    }
  },
  {
    path: 'add',
    component: AddPersonComponent,
    data: { title: 'Kullanıcı ekle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },

  {
    path: 'edit/:id',
    component: EditPersonComponent,
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
    NgxExcelTemplateModule.forRoot(),
    RouterModule.forChild(routes),
    SharedDirectivesModule

  ],
  declarations: [

    ListPersonComponent,
    AddPersonComponent,
    EditPersonComponent,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    PersonResolver,

  ]
})
export class PersonModule { }
