import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { BasvuruFormService } from '../services/basvuru-form.service';


@Component({
  selector: 'app-edit-basvuru',
  templateUrl: './edit-basvuru.component.html',
  styleUrls: ['./edit-basvuru.component.css']
})
export class EditBasvuruComponent implements OnInit {

  editForm: FormGroup;
  loading = false;

  itemId: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private basvuruFormService: BasvuruFormService
  ) { }

  ngOnInit() {


    this.basvuruFormService.basvuruForm$.subscribe(x => {
      this.editForm = x;
    });

    this.itemId = this.activatedRoute.snapshot.params.id;

    this.loading = true;

    this.httpClient.get(`${env.serverUrl}/basvuru/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;
      console.log("dsa" + data.value.tc);
      this.basvuruFormService.loaderBasvuruForm(data);


    });

  }

  onEdit(): void {
    if (this.editForm.valid) {
      this.editForm.disable();
      const p = { ...this.editForm.value };
      console.log('save onEdit', p);
      this.httpClient.patch(`${env.serverUrl}/basvuru/${this.itemId}`, p
      ).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`basvuru  ${this.editForm.value.tc} düzenlendi`, 'X', { duration: 3000 });
          this.router.navigate(['basvuru']);
        }
        this.loading = false;

      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.editForm.enable();
        this.snackBar.open(error.error, 'X', { duration: 3000 });
      });

    } else {
      console.log('Form not valid');
    }


  }



}
