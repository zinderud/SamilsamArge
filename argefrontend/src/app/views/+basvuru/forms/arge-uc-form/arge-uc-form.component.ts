import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControlOptions, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ArastirmaBelgelerFormComponent } from '../arastirma-belgeler-form/arastirma-belgeler-form.component';
import { ArastirmaFormComponent } from '../arastirma-form/arastirma-form.component';
import { ArastirmaKapsamFormComponent } from '../arastirma-kapsam-form/arastirma-kapsam-form.component';
import { ArastirmacilarFormComponent } from '../arastirmacilar-form/arastirmacilar-form.component';
import { ArastirmacilarForm } from '../model/arastirmacilar';

import { environment as env } from '@env/environment';
import { Basvuru } from '@app/core/models/basvuru/basvuru';
type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ]
};

@Component({
  selector: 'app-arge-uc-form',
  templateUrl: './arge-uc-form.component.html',
  styleUrls: ['./arge-uc-form.component.scss']
})
export class ArgeUcFormComponent implements OnInit {
  itemId: string;
  arastirmacilarformGroup: FormGroup;
  aform: FormGroup;
  basvuru: Basvuru
  loading = false;
  @ViewChild(ArastirmaFormComponent, { static: true }) arastirmaform: ArastirmaFormComponent;
  @ViewChild(ArastirmaKapsamFormComponent, { static: true }) arastirmaKapsamForm: ArastirmaKapsamFormComponent;
  @ViewChild(ArastirmacilarFormComponent, { static: true }) arastirmacilarform: ArastirmacilarFormComponent;
  @ViewChild(ArastirmaBelgelerFormComponent, { static: true }) arastirmaBelgelerFormComponent: ArastirmaBelgelerFormComponent;
  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,) { }

  ngOnInit() {
    this.aform = this.fb.group({
      baslik: [''],
      arastirmaform: this.arastirmaform.createGroup(),
      arastirmaKapsam: this.arastirmaKapsamForm.createGroup(),
      arastirmacilarforms: this.fb.array([this.createArastirmacilarformGroupForm()]),
      arastirmaBelgelerForm: this.arastirmaBelgelerFormComponent.createGroup()

    });
    this.itemId = this.activatedRoute.snapshot.params.id;
    this.httpClient.get(`${env.serverUrl}/basvuru/${this.itemId}`).subscribe((data: any) => {

      this.loaderForm(data);


    });
  }
  onCreate(): void {
    if (this.aform.valid) {
      this.aform.disable();
      const d = JSON.stringify(this.aform.value);
      /*   console.log("json", d) */
      this.basvuru.basvuruForm = JSON.stringify(this.aform.value);

      const p = { ...this.basvuru };
      /*       console.log('save  this.basvuru', p); */
      this.httpClient.patch(`${env.serverUrl}/basvuru/${this.itemId}`, p
      ).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`basvuru  ${this.aform.value.baslik} düzenlendi`, 'X', { duration: 3000 });
          this.router.navigate(['basvuru']);
        }
        this.loading = false;

      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.aform.enable();
        this.snackBar.open(error.error, 'X', { duration: 3000 });
      });

    } else {
      console.log('Form not valid');
    }


  }

  get arastirmacilarforms(): FormArray {
    return this.aform.get("arastirmacilarforms") as FormArray
  }
  /*  set arastirmacilarforms(){
     this.aform.setValue['arastirmacilarforms']="";
   } */
  addArastirmacilarforms() {
    this.arastirmacilarforms.push(this.createArastirmacilarformGroupForm());
  }


  public createArastirmacilarformGroupForm() {
    const config: FormGroupConfig<ArastirmacilarForm> = {
      arastirmaciTuru: [''],
      ad: [''],
      soyad: [''],
      unvan: [''],
      uzmanlikAlani: [''],
      isAdresi: [''],
      eposta: [''],
      faks: [''],
    };


    this.arastirmacilarformGroup = this.fb.group(config);
    return this.arastirmacilarformGroup;

  }

  loaderForm(data) {


    console.log(" gelen data", data)
    if (data.value.basvuruForm === "") {
      this.basvuru = { ...data.value }
      console.log(" gelen this.basvuru", this.basvuru)
    } else {

      this.basvuru = { ...data.value }
      const basform = JSON.parse(data.value.basvuruForm);
      let k: any[] = basform.arastirmacilarforms
      console.log("da", k.length);

      for (let index = 1; index < k.length; index++) {
        this.addArastirmacilarforms()

      }

      this.aform.patchValue({
        baslik: basform.baslik,
        arastirmaform: basform.arastirmaform,
        arastirmaKapsam: basform.arastirmaKapsam,
        arastirmacilarforms: basform.arastirmacilarforms,
        arastirmaBelgelerForm: basform.arastirmaBelgelerForm,

      });

      //   this.aform.setValue['arastirmacilarforms'] = basform.arastirmacilarforms;
      //  this.arastirmacilarform.writeValue(basform.arastirmacilarforms);

    }
  }

}
