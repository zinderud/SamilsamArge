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
import { ListBasvuruComponent } from './list-basvuru/list-basvuru.component';
import { AddBasvuruComponent } from './add-basvuru/add-basvuru.component';
import { EditBasvuruComponent } from './edit-basvuru/edit-basvuru.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { BasvuruResolver } from './resolver/basvuru.resolver';


import { EditorModule } from 'primeng/editor';

import { BasvuruFormService } from './services/basvuru-form.service';
import { ArgeBirFormService } from './services/arge-form.service';
import { ArastirmaFormComponent } from './forms/arastirma-form/arastirma-form.component';
import { ArastirmacilarFormComponent } from './forms/arastirmacilar-form/arastirmacilar-form.component';
import { ArastirmaKapsamFormComponent } from './forms/arastirma-kapsam-form/arastirma-kapsam-form.component';
import { ArastirmaBelgelerFormComponent } from './forms/arastirma-belgeler-form/arastirma-belgeler-form.component';
import { ArgeBirFormComponent } from './forms/arge-bir-form/arge-bir-form.component';

const routes: Routes = [


  {
    path: '',
    component: ListBasvuruComponent,
    data: { title: 'Basvuru Listele', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
    resolve: {
      data: BasvuruResolver
    }
  },
  {
    path: 'add',
    component: AddBasvuruComponent,
    data: { title: 'Basvuru ekle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },

  {
    path: 'edit/:id',
    component: EditBasvuruComponent,
    data: { title: 'Basvuru Düzenle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'argeform',
    component: ArgeBirFormComponent,
    data: { title: 'Arge Form Düzenle', expectedRole: ['Admin'] },
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
    EditorModule,
    RouterModule.forChild(routes),
    SharedDirectivesModule

  ],
  declarations: [

    ListBasvuruComponent,
    AddBasvuruComponent,
    EditBasvuruComponent,
    ArastirmaFormComponent,
    ArastirmacilarFormComponent,
    ArastirmaKapsamFormComponent,
    ArastirmaBelgelerFormComponent,
    ArgeBirFormComponent,




  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    BasvuruResolver,
    BasvuruFormService,
    ArgeBirFormService,

  ]
})
export class BasvuruModule { }
