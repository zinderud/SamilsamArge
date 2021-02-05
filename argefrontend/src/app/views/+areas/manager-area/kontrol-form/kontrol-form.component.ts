import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  itemId: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private kontrolFormService: KontrolFormService
  ) { }

  ngOnInit() {

    this.kontrolFormService.kontrolForm$.subscribe(x => {
      this.createForm = x;
    });
    this.itemId = this.activatedRoute.snapshot.params.id;

    this.loading = true;

    this.httpClient.get(`${env.serverUrl}/kontrol/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;

      this.kontrolFormService.loaderKontrolForm(data);


    });
  }

  onCreate(): void {
    this.loading = true;

    if (this.createForm.valid) {
      this.createForm.disable();
      const p = { ...this.kontrol, ...this.createForm.value };

      this.httpClient.patch(`${env.serverUrl}/kontrol/${this.itemId}`, p).subscribe((data: any) => {

        if (data.succeeded) {
          // tslint:disable-next-line:max-line-length
          this.snackBar.open(`Kontrol formu      oluşturuldu`, 'X', { duration: 3000 });
          this.router.navigate(['manager', 'kontrol-list']);
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
  onBasvuruformLoad() {
    this.kontrolFormService.onBasvuruformLoad(this.itemId)

  }
}
