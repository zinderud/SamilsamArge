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
import { ListOzgecmisComponent } from './list-ozgecmis/list-ozgecmis.component';
import { AddOzgecmisComponent } from './add-ozgecmis/add-ozgecmis.component';
import { EditOzgecmisComponent } from './edit-ozgecmis/edit-ozgecmis.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { OzgecmisResolver } from './resolver/ozgecmis.resolver';


import { EditorModule } from 'primeng/editor';
import { OzgecmisFormService } from './services/ozgecmis-form.service';

const routes: Routes = [


  {
    path: '',
    component: ListOzgecmisComponent,
    data: { title: 'Ozgecmis Listele', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
    resolve: {
      data: OzgecmisResolver
    }
  },
  {
    path: 'add',
    component: AddOzgecmisComponent,
    data: { title: 'Ozgecmis ekle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },

  {
    path: 'edit/:id',
    component: EditOzgecmisComponent,
    data: { title: 'Ozgecmis Düzenle', expectedRole: ['Admin'] },
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
    NgxExcelTemplateModule.forRoot(),
    EditorModule,
    RouterModule.forChild(routes),
    SharedDirectivesModule

  ],
  declarations: [

    ListOzgecmisComponent,
    AddOzgecmisComponent,
    EditOzgecmisComponent,



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    OzgecmisResolver,
    OzgecmisFormService,

  ]
})
export class OzgecmisModule { }
