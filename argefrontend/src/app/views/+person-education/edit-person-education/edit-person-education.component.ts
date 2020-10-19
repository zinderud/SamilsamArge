import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

import { environment as env } from '@env/environment';
import { Education } from '@app/core/models/educations';
import { Person } from '@app/core/models/person';
@Component({
  selector: 'app-edit-person-education',
  templateUrl: './edit-person-education.component.html',
  styleUrls: ['./edit-person-education.component.scss']
})
export class EditPersonEducationComponent implements OnInit {

  editForm: FormGroup;
  loading = false;

  itemId: string;
  person: Person;
  education: Education

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private location: Location
  ) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
 
      check: new FormControl('', Validators.required),
      educationDate: new FormControl('', Validators.required),
      renewalDate: new FormControl('', Validators.required),
      isArchived: new FormControl(),

    });

    this.itemId = this.activatedRoute.snapshot.params.id;

    this.loading = true;

    this.httpClient.get(`${env.serverUrl}/personeducation/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;

      this.person = data.value.person;
      this.education = data.value.education;
      this.editForm.patchValue({
      
        check: data.value.check,
        educationDate: data.value.educationDate,
        renewalDate: data.value.renewalDate,
        isArchived: data.value.isArchived,


      });

    });

  }

  onEdit(): void {
    this.loading = true;

    if (this.editForm.valid) {
      this.editForm.disable();

      this.httpClient.patch(`${env.serverUrl}/personeducation/${this.itemId}`, {
       
        check: this.editForm.value.check,
        educationDate: this.editForm.value.educationDate,
        renewalDate: this.editForm.value.renewalDate,
        isArchived: this.editForm.value.isArchived,
        person:{...this.person},
        education:{...this.education}
      }).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`PersonelEducation   düzenlendi`, 'X', { duration: 3000 });
          /* this.router.navigate(['persons',]); */
          this.location.back();
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
