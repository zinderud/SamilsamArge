import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { environment as env } from '@env/environment';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {

    this.forgotForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]]
    });
  }

  onForgot(): void {
    this.loading = true;

    if (this.forgotForm.valid) {
      this.forgotForm.disable();

      this.httpClient.post(`${env.serverUrl}/user/ForgotPassword`, {

        email: this.forgotForm.value.email
      }).subscribe((data: any) => {
        console.log(data);

        if (data.succeeded) {
          this.snackBar.open(`Kullanıcı   ${this.forgotForm.value.email}   sıfırlama adresi gönderildi`, 'X', { duration: 3000 });
          this.router.navigate(['admin']);
        }
        this.loading = false;

      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.forgotForm.enable();
        this.snackBar.open(error.error, 'X', { duration: 3000 });
      });

    } else {
      console.log('Form not valid');
    }
  }
}
