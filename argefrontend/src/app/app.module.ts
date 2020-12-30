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
    loadChildren: () => import('./views/+auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/+dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/+admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'persons',
    loadChildren: () => import('./views/+person/person.module').then(m => m.PersonModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'ozgecmis',
    loadChildren: () => import('./views/+ozgecmis/ozgecmis.module').then(m => m.OzgecmisModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'basvuru',
    loadChildren: () => import('./views/+basvuru/basvuru.module').then(m => m.BasvuruModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'inceleme',
    loadChildren: () => import('./views/+inceleme/inceleme.module').then(m => m.IncelemeModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./views/+error/error.module').then(m => m.ErrorModule),
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

    ServerTimeResolver,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
