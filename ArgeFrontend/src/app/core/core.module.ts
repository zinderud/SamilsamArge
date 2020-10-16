import {
  NgModule,
  SkipSelf,
  Optional,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HttpClientModule, HTTP_INTERCEPTORS, HttpClient,
} from '@angular/common/http';

import { AuthGuard, RoleGuard } from '@app/core/guards/core';
import { ApiInterceptor } from './interceptors/api.interceptor';
import {
  LocalStorageService,
  AuthService,
} from './services/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutService } from './services/layout.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    LocalStorageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }, 
     LayoutService

  ],
 
})
export class CoreModule {

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
