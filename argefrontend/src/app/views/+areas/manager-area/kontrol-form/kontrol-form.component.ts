import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { KontrolFormService } from '../services/kontrol-form.service';
import { Kontrol } from '@app/core/models/kontrol/kontrol';

@Component({
  selector: 'app-kontrol-form',
  templateUrl: './kontrol-form.component.html',
  styleUrls: ['./kontrol-form.component.scss']
})
export class KontrolFormComponent implements OnInit {

  createForm: FormGroup;
  loading = false;
  kontrol: Kontrol;
  prod: boolean = env.production;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private kontrolFormService: KontrolFormService
  ) { }

  ngOnInit() {

    this.kontrolFormService.kontrolForm$.subscribe(x => {
      this.createForm = x;
    });
  }

  onCreate(): void {
    this.loading = true;

    if (this.createForm.valid) {
      this.createForm.disable();
      const p = { ...this.kontrol, ...this.createForm.value };

      this.httpClient.post(`${env.serverUrl}/kontrol`, p).subscribe((data: any) => {

        if (data.succeeded) {
          // tslint:disable-next-line:max-line-length
          this.snackBar.open(`Ozgeçmis ${this.createForm.value.tc}   oluşturuldu`, 'X', { duration: 3000 });
          this.router.navigate(['kontrol']);
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
