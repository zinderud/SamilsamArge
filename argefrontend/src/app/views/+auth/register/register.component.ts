import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import { environment as env } from '@env/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  createForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {

    this.createForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      Tc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onCreateUser(): void {
    this.loading = true;

    if (this.createForm.valid) {
      this.createForm.disable();

      this.httpClient.post(`${env.serverUrl}/user/create`, {
        firstname: this.createForm.value.firstname,
        lastname: this.createForm.value.lastname,
        Tc: this.createForm.value.Tc,
        email: this.createForm.value.email,
        password: this.createForm.value.password,
      }).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`Kullanıcı   ${this.createForm.value.firstname} oluşturuldu`, 'X', { duration: 3000 });
          this.router.navigate(['admin']);
        }
        this.loading = false;

      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.createForm.enable();
        this.snackBar.open(error.error, 'X', { duration: 3000 });
      });

    } else {
      console.log('Form not valid');
    }
  }
}
