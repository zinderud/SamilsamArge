import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment as env } from '@env/environment';


@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

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


      subject: new FormControl('', Validators.required),
      management: new FormControl('', Validators.required),
      renewalPeriod: new FormControl('', Validators.required),
      educationPlace: new FormControl('', Validators.required),
     /*  educationDate: new FormControl(''), */
      educationTime: new FormControl('', Validators.required),
      educator: new FormControl('', Validators.required),
      titles: new FormControl('', Validators.required),
      educationOfficer: new FormControl('', Validators.required),
      educationType: new FormControl('', Validators.required),
      certification: new FormControl('', Validators.required),


    });
  }

  onCreate(): void {
    this.loading = true;

    if (this.createForm.valid) {
      this.createForm.disable();

      this.httpClient.post(`${env.serverUrl}/educations`, {

        subject: this.createForm.value.subject,
        management: this.createForm.value.management,
        renewalPeriod: this.createForm.value.renewalPeriod,
        educationPlace: this.createForm.value.educationPlace,
    /*     educationDate: new Date(this.createForm.value.educationDate), */
        educationTime: this.createForm.value.educationTime,
        educator: this.createForm.value.educator,
        titles: this.createForm.value.titles.toString(),
        educationOfficer: this.createForm.value.educationOfficer,
        educationType: this.createForm.value.educationType,
        certification: this.createForm.value.certification,

      }).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`  ${this.createForm.value.subject}  Konulu Eğitim oluşturuldu`, 'X', { duration: 3000 });
          this.router.navigate(['educations']);
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

  ConvertToTitles(){
    let k : [] = this.createForm.value.titles;
    console.log(k.toString());
    return k.toString();
  }
}
