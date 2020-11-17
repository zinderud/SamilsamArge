import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { OzgecmisFormService } from '../services/ozgecmis-form.service';


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
    private httpClient: HttpClient,
    private ozgecmisFormService: OzgecmisFormService
  ) { }

  ngOnInit() {

    /*     this.editForm = this.formBuilder.group({
    
          name: new FormControl('', Validators.required),
          surname: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
          unit: new FormControl('', Validators.required),
          title: new FormControl('', Validators.required),
          departmentId: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),]),
          isArchived: new FormControl(),
        }); */
    this.ozgecmisFormService.ozgecmisForm$.subscribe(x => {
      this.editForm = x;
    });

    this.itemId = this.activatedRoute.snapshot.params.id;

    this.loading = true;

    this.httpClient.get(`${env.serverUrl}/ozgecmis/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;
      console.log("dsa" + data.value.tc);
      this.ozgecmisFormService.loaderOzgecmisForm(data);


    });

  }

  onEdit(): void {
    if (this.editForm.valid) {
      this.editForm.disable();
      const p = { ...this.editForm.value };
      console.log('save onEdit', p);
      this.httpClient.patch(`${env.serverUrl}/ozgecmis/${this.itemId}`, p
      ).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`ozgecmis  ${this.editForm.value.tc} düzenlendi`, 'X', { duration: 3000 });
          this.router.navigate(['admin', 'ozgecmis']);
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

  getUnvanControls() {
    return (this.editForm.get('unvans') as FormArray).controls;
  }
  addUnvan() {
    this.ozgecmisFormService.addUnvan();
  }
  deleteUnvan(index: number) {
    this.ozgecmisFormService.deleteUnvan(index);
  }
}
