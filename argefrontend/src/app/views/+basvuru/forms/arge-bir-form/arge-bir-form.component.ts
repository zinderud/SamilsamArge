import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControlOptions, ValidatorFn } from '@angular/forms';
import { ArastirmaFormComponent } from '../arastirma-form/arastirma-form.component';
import { ArastirmaKapsamFormComponent } from '../arastirma-kapsam-form/arastirma-kapsam-form.component';
import { ArastirmacilarFormComponent } from '../arastirmacilar-form/arastirmacilar-form.component';
import { ArastirmacilarForm } from '../model/arastirmacilar';
type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ]
};
@Component({
  selector: 'app-arge-bir-form',
  templateUrl: './arge-bir-form.component.html',
  styleUrls: ['./arge-bir-form.component.scss']
})
export class ArgeBirFormComponent implements OnInit {

  arastirmacilarformGroup: FormGroup;
  aform: FormGroup;
  @ViewChild(ArastirmaFormComponent, { static: true }) arastirmaform: ArastirmaFormComponent;
  @ViewChild(ArastirmaKapsamFormComponent, { static: true }) arastirmaKapsamForm: ArastirmaKapsamFormComponent;
  @ViewChild(ArastirmacilarFormComponent, { static: true }) arastirmacilarform: ArastirmacilarFormComponent;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.aform = this.fb.group({
      baslik: [''],
      arastirmaform: this.arastirmaform.createGroup(),
      arastirmaKapsam: this.arastirmaKapsamForm.createGroup(),
      arastirmacilarforms: this.fb.array([this.createArastirmacilarformGroupForm()])

    });
  }
  onCreate() {

  }
  /*  get addDynamicElement() {
     return this.cuform.get('addDynamicElement') as FormArray
   }

   addItems() {
     this.addDynamicElement.push(this.adresform.createGroup())
   }
  */
  get arastirmacilarforms(): FormArray {
    return this.aform.get("arastirmacilarforms") as FormArray
  }
  addArastirmacilarforms() {
    this.arastirmacilarforms.push(this.createArastirmacilarformGroupForm());
  }


  createArastirmacilarformGroupForm() {
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

}
