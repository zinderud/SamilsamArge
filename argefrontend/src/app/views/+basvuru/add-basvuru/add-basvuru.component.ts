import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { BasvuruFormService } from '../services/basvuru-form.service';
import { Basvuru } from '@app/core/models/basvuru/basvuru';


@Component({
  selector: 'app-add-basvuru',
  templateUrl: './add-basvuru.component.html',
  styleUrls: ['./add-basvuru.component.css']
})
export class AddBasvuruComponent implements OnInit {

  createForm: FormGroup;
  loading = false;
  basvuru: Basvuru;
  prod: boolean = env.production;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,

  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({


      basvuruTuru: new FormControl(''),
      basvuruBaslangicTarih: new FormControl(''),
      basvuruBitisTarih: new FormControl(''),
    });

  }

  onCreate(): void {
    this.loading = true;

    if (this.createForm.valid) {
      this.createForm.disable();
      // const p = { ...this.basvuru, ...this.createForm.value };

      this.httpClient.post(`${env.serverUrl}/basvuru`, this.createForm.value).subscribe((data: any) => {

        if (data.succeeded) {
          // tslint:disable-next-line:max-line-length
          this.snackBar.open(`başvuru ${this.createForm.value.basvuruTuru}   oluşturuldu`, 'X', { duration: 3000 });
          this.router.navigate(['basvuru']);
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

  getUnvanControls() {
    return (this.createForm.get('unvans') as FormArray).controls;
  }

}
