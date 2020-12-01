import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { OzgecmisFormService } from '../services/ozgecmis-form.service';
import { Ozgecmis } from '@app/core/models/ozgecmis/ozgecmis';


@Component({
  selector: 'app-add-ozgecmis',
  templateUrl: './add-ozgecmis.component.html',
  styleUrls: ['./add-ozgecmis.component.css']
})
export class AddOzgecmisComponent implements OnInit {

  createForm: FormGroup;
  loading = false;
  ozgecmis: Ozgecmis;
  prod: boolean = env.production;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private ozgecmisFormService: OzgecmisFormService
  ) { }

  ngOnInit() {

    this.ozgecmisFormService.ozgecmisForm$.subscribe(x => {
      this.createForm = x;
    });
  }

  onCreate(): void {
    this.loading = true;

    if (this.createForm.valid) {
      this.createForm.disable();
      const p = { ...this.ozgecmis, ...this.createForm.value };

      this.httpClient.post(`${env.serverUrl}/ozgecmis`, p).subscribe((data: any) => {

        if (data.succeeded) {
          // tslint:disable-next-line:max-line-length
          this.snackBar.open(`Ozgeçmis ${this.createForm.value.tc}   oluşturuldu`, 'X', { duration: 3000 });
          this.router.navigate([ 'ozgecmis']);
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
