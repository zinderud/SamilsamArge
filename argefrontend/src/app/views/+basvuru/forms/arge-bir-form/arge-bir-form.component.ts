import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ArastirmaFormComponent } from '../arastirma-form/arastirma-form.component';
import { ArastirmaKapsamFormComponent } from '../arastirma-kapsam-form/arastirma-kapsam-form.component';

@Component({
  selector: 'app-arge-bir-form',
  templateUrl: './arge-bir-form.component.html',
  styleUrls: ['./arge-bir-form.component.scss']
})
export class ArgeBirFormComponent implements OnInit {


  aform: FormGroup;
  @ViewChild(ArastirmaFormComponent, { static: true }) arastirmaform: ArastirmaFormComponent;
  @ViewChild(ArastirmaKapsamFormComponent, { static: true }) arastirmaKapsamForm: ArastirmaKapsamFormComponent;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.aform = this.fb.group({
      baslik: [''],
      arastirmaform: this.arastirmaform.createGroup(),
      arastirmaKapsam: this.arastirmaKapsamForm.createGroup(),

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

}
