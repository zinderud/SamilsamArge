import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RoleGuard } from '@app/core/guards/role.guard';
 
import { NgxExcelTemplateModule } from 'ngx-excel-template';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '@app/core/interceptors/api.interceptor';

import { QueryBuilderModule } from 'src/app/lib/query-builder/query-builder.module';

import { CoreModule } from '@app/core/core.module';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { DepartmentResolver } from './resolver/department.resolver';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
  

const routes: Routes = [

     
    {
        path: '',
        component: ListDepartmentComponent,
        data: { title: 'Bölüm Listesi', expectedRole: ['Admin'] },
        canActivate: [RoleGuard],
        resolve: {
            data: DepartmentResolver
        }
    },
    {
        path: 'add',
        component: AddDepartmentComponent,
        data: { title: 'Bölüm ekle', expectedRole: ['Admin'] },
        canActivate: [RoleGuard],
    },
    {
        path: 'edit/:id',
        component: EditDepartmentComponent,
        data: { title: 'Bölüm Düzenle', expectedRole: ['Admin'] },
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

        ListDepartmentComponent,
        AddDepartmentComponent,
        EditDepartmentComponent



    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        }, 
        DepartmentResolver

    ]
})
export class DepartmentModule { }
