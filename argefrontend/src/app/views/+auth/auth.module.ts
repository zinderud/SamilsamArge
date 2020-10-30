import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Giriş Ekranı' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Giriş Ekranı' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'Profil' },
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Kayıt' }
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
    data: { title: 'Sifirlama' }
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, ProfileComponent, RegisterComponent, ForgotPasswordComponent]
})
export class AuthModule { }
