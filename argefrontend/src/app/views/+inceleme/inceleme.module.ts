import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListIncelemeComponent } from './list-inceleme/list-inceleme.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '@app/core/guards/core';
import { SharedModule } from '@app/shared/shared.module';
import { NgxExcelTemplateModule } from 'ngx-excel-template';
import { EditorModule } from 'primeng/editor';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { BasvuruaddUserInceleResolver, BasvuruInceleResolver } from './resolver/basvuruIncele.resolver';
import { ApiInterceptor } from '@app/core/interceptors/api.interceptor';
import { BasvuruInceleComponent } from './basvuru-incele/basvuru-incele.component';


const routes: Routes = [
  {
    path: '',
    component: ListIncelemeComponent,
    data: { title: 'Basvuru İnceleme Listesi', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],
    resolve: {
      data: BasvuruInceleResolver
    }
  },
  {
    path: 'incele/:id',
    component: BasvuruInceleComponent,
    data: { title: 'Basvuru Düzenle', expectedRole: ['Admin'] },
    canActivate: [RoleGuard],

  }

];

@NgModule({
  declarations: [ListIncelemeComponent, BasvuruInceleComponent],
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    BasvuruInceleResolver,
    BasvuruaddUserInceleResolver

  ]
})
export class IncelemeModule { }
