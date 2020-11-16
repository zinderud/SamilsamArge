import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';


@Component({
  selector: 'app-edit-ozgecmis',
  templateUrl: './edit-ozgecmis.component.html',
  styleUrls: ['./edit-ozgecmis.component.css']
})
export class EditOzgecmisComponent implements OnInit {

  editForm: FormGroup;
  loading = false;

  itemId: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({

      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      departmentId: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),]),
      isArchived: new FormControl(),
    });

    this.itemId = this.activatedRoute.snapshot.params.id;

    this.loading = true;

    this.httpClient.get(`${env.serverUrl}/ozgecmiss/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;

      this.editForm.patchValue({
        name: data.value.name,
        surname: data.value.surname,
        email: data.value.email,
        phone: data.value.phone,
        unit: data.value.unit,
        title: data.value.title,
        departmentId: data.value.departmentId,
        isArchived: data.value.isArchived

      });

    });

  }

  onEdit(): void {
    this.loading = true;

    if (this.editForm.valid) {
      this.editForm.disable();

      this.httpClient.patch(`${env.serverUrl}/ozgecmiss/${this.itemId}`, {
        name: this.editForm.value.name,
        surname: this.editForm.value.surname,
        email: this.editForm.value.email,
        phone: this.editForm.value.phone,
        unit: this.editForm.value.unit,
        title: this.editForm.value.title,
        departmentId: this.editForm.value.departmentId,
        isArchived: this.editForm.value.isArchived
      }).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`Ozgecmisel  ${this.editForm.value.name} düzenlendi`, 'X', { duration: 3000 });
          this.router.navigate(['ozgecmiss',]);
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
