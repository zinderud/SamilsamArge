import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment as env } from '@env/environment';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  createForm: FormGroup;
  loading = false;
  prod: boolean = env.production;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {

    this.createForm = this.formBuilder.group({


      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      departmentId: new FormControl('', [  Validators.required, Validators.pattern("^[0-9]*$"), ])
    });
  }

  onCreate(): void {
    this.loading = true;

    if (this.createForm.valid) {
      this.createForm.disable();

      this.httpClient.post(`${env.serverUrl}/persons`, {
        name: this.createForm.value.name,
        surname: this.createForm.value.surname,
        email: this.createForm.value.email,
        phone: this.createForm.value.phone,
        unit: this.createForm.value.unit,
        title: this.createForm.value.title,
        departmentId: this.createForm.value.departmentId
      }).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`Kişi ${this.createForm.value.name} oluşturuldu`, 'X', { duration: 3000 });
          this.router.navigate(['persons']);
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
