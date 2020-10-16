import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, LOCALE_ID } from '@angular/core';



import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ServerTimeResolver } from './views/common/server-time.resolver';
import { CommonModule } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './@theme/theme.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './views/+auth/auth.module#AuthModule',
  },
  {
    path: 'dashboard',
    loadChildren: './views/+dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './views/+admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'persons',
    loadChildren: './views/+person/person.module#PersonModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'educations',
    loadChildren: './views/+educations/educations.module#EducationsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'personeducation',
    loadChildren: './views/+person-education/personEducation.module#PersonEducationModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'department',
    loadChildren: './views/+department/department.module#DepartmentModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: './views/+error/error.module#ErrorModule',
  },
  { path: '**', redirectTo: 'error/unauthorized' }
];



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ThemeModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules
      }),
    BrowserAnimationsModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  providers: [

    ServerTimeResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
