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
import { UploadDownloadService } from '@app/core/services/upload-download.service';
import { ArgeFormOnizlemeComponent } from './forms/arge-form-onizleme/arge-form-onizleme.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ArgeDortFormComponent } from './forms/SosyalProje/arge-dort-form/arge-dort-form.component';
import { ArgeUcFormComponent } from './forms/DonerDestek/arge-uc-form/arge-uc-form.component';
import { ArgeIkiFormComponent } from './forms/ArastirmaCalisKovid/arge-iki-form/arge-iki-form.component';
import { ArgeBirFormComponent } from './forms/ArastirmaCalis/arge-bir-form/arge-bir-form.component';



const routes: Routes = [


  {
    path: '',
    component: ListBasvuruComponent,
    data: { title: 'Basvuru Listele', expectedRole: ['Admin', 'User', 'Manager'] },
    canActivate: [RoleGuard],
    resolve: {
      data: BasvuruResolver
    }
  },
  {
    path: 'add',
    component: AddBasvuruComponent,
    data: { title: 'Basvuru ekle', expectedRole: ['Admin', 'User'] },
    canActivate: [RoleGuard],
  },

  {
    path: 'edit/:id',
    component: EditBasvuruComponent,
    data: { title: 'Basvuru Düzenle', expectedRole: ['Admin', 'User'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'argebirform/:id',
    component: ArgeBirFormComponent,
    data: { title: 'Arge Form Düzenle', expectedRole: ['Admin', 'User'] },
    canActivate: [RoleGuard],
  }
  ,
  {
    path: 'argeikiform/:id',
    component: ArgeIkiFormComponent,
    data: { title: 'Arge Form Düzenle', expectedRole: ['Admin', 'User'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'argeucform/:id',
    component: ArgeUcFormComponent,
    data: { title: 'Donersermaye Arge Form Düzenle', expectedRole: ['Admin', 'User'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'onizleme/:id',
    component: ArgeFormOnizlemeComponent,
    data: { title: ' Arge Form onizleme', expectedRole: ['Admin', 'User'] },
    canActivate: [RoleGuard],
  },
  {
    path: 'argedortform/:id',
    component: ArgeUcFormComponent,
    data: { title: 'Sosyal Arge Form Düzenle', expectedRole: ['Admin', 'User'] },
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
    PdfViewerModule,
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
    ArgeIkiFormComponent,
    ArgeUcFormComponent,
    ArgeFormOnizlemeComponent,
    ArgeDortFormComponent




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
    UploadDownloadService

  ]
})
export class BasvuruModule { }
