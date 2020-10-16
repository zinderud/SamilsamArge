import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';

import { Education } from '@app/core/models/educations';
import { EducationShareService } from '../education-share.service';


@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {
 
 /*    education: Education; */
  editForm: FormGroup;
  loading = false;

  itemId: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
/*     private educationShareService: EducationShareService */
  ) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({

      subject: new FormControl('', Validators.required),
      management: new FormControl('', Validators.required),
      renewalPeriod: new FormControl('', Validators.required),
      educationPlace: new FormControl('', Validators.required),
    /*   educationDate: new FormControl(''), */
      educationTime: new FormControl('', Validators.required),
      educator: new FormControl('', Validators.required),
      titles: new FormControl('', Validators.required),
      educationOfficer: new FormControl('', Validators.required),
      educationType: new FormControl('', Validators.required),
      certification: new FormControl('', Validators.required),
    });

    this.itemId = this.activatedRoute.snapshot.params.id;

    this.loading = true;

    this.httpClient.get(`${env.serverUrl}/educations/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;
/*       this.education = data.value;
      this.educationShareService.updateApprovalMessage(this.education); */
      this.editForm.patchValue({
        subject: data.value.subject,
        management: data.value.management,
        renewalPeriod: data.value.renewalPeriod,
        educationPlace: data.value.educationPlace,
   /*      educationDate: new Date(data.value.educationDate), */
        educationTime: data.value.educationTime,
        educator: data.value.educator,
        titles: data.value.titles.split(','),
        educationOfficer: data.value.educationOfficer,
        educationType: data.value.educationType,
        certification: data.value.certification,

      });

    });

  }

  onEdit(): void {
    this.loading = true;

    if (this.editForm.valid) {
      this.editForm.disable();

      this.httpClient.patch(`${env.serverUrl}/educations/${this.itemId}`, {
        subject: this.editForm.value.subject,
        department: this.editForm.value.department,
        renewalPeriod: this.editForm.value.renewalPeriod,
        educationPlace: this.editForm.value.educationPlace,
     /*    educationDate: new Date(this.editForm.value.educationDate), */
        educationTime: this.editForm.value.educationTime,
        educator: this.editForm.value.educator,
        titles: this.editForm.value.titles.toString(),
        educationOfficer: this.editForm.value.educationOfficer,
        educationType: this.editForm.value.educationType,
        certification: this.editForm.value.certification,
      }).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`Educationel  ${this.editForm.value.subject} düzenlendi`, 'X', { duration: 3000 });
          this.router.navigate(['educations']);
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

  listPerson() {

    this.httpClient.post(`${env.serverUrl}/educations/listpersontitles/${this.itemId}`, {
      subject: this.editForm.value.subject,
      department: this.editForm.value.department,
      renewalPeriod: this.editForm.value.renewalPeriod,
      educationPlace: this.editForm.value.educationPlace,
     /*  educationDate: new Date(this.editForm.value.educationDate), */
      educationTime: this.editForm.value.educationTime,
      educator: this.editForm.value.educator,
      titles: this.editForm.value.titles.toString(),
      educationOfficer: this.editForm.value.educationOfficer,
      educationType: this.editForm.value.educationType,
      certification: this.editForm.value.certification,
    }).subscribe((data: any) => {
      console.log(data);
    }

    );

  }
  /*   //  eğitim datasını gönderiyoruz
    updateParent(){
      this.childMessage.emit(this.education);
    } */


}
