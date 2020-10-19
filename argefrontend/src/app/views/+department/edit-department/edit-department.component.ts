import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';


@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {

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
      name: ['', Validators.required],
      code: ['', Validators.required]
    });

    this.itemId = this.activatedRoute.snapshot.params.id;

    this.loading = true;

    this.httpClient.get(`${env.serverUrl}/department/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;

      this.editForm.patchValue({
        name: data.value.name,
        code: data.value.code
      });

    });

  }

  onEdit(): void {
    this.loading = true;

    if (this.editForm.valid) {
      this.editForm.disable();

      this.httpClient.patch(`${env.serverUrl}/department/${this.itemId}`, {
        name: this.editForm.value.name,
        code: this.editForm.value.code
      }).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`Department ${this.editForm.value.name} düzenlendi`, 'X', {duration: 3000});
          this.router.navigate(['department']);
        }
        this.loading = false;

      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.editForm.enable();
        this.snackBar.open(error.error, 'X', {duration: 3000});
      });

    } else {
      console.log('Form not valid');
    }
  }
}
