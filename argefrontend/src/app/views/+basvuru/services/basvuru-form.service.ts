import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';


import { environment as env } from '@env/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArgeBirFormService } from './arge-form.service';
import { AttachSession } from 'protractor/built/driverProviders';
/* import { Unvan } from '@app/core/models/basvuru/unvan'; */

@Injectable()
export class BasvuruFormService {
    argebirForm : FormGroup = this.fb.group({})

    private addBasvuruForm: BehaviorSubject<FormGroup | null> = new BehaviorSubject(this.addBasvuru());
    addBasvuruForm$: Observable<FormGroup> = this.addBasvuruForm.asObservable();

    constructor(private fb: FormBuilder, 
        private httpClient: HttpClient, 
        private dialog: MatDialog, 
        private snackBar: MatSnackBar,
         private argeBirFormFormService: ArgeBirFormService) {
            this.argeBirFormFormService.addArgeBirFormForm$.subscribe(x => {
                this.argebirForm= x;
               });
    }
  get ArgebirForm(){
      return this.argebirForm;
 
}

    addBasvuru() {

        const ret = this.fb.group({
            basvuruNo: new FormControl(''),
            tarih: new FormControl(new Date()),
            durum: new FormControl(''),
            durumId: new FormControl(''),
            basvuruTuruId: new FormControl(''),
            basvuruTuru: new FormControl(''),
            basvuruForm: new FormGroup(this.argeBirFormFormService.addArgeBirForm().controls )  

        });
        return ret;

    }
    loaderBasvuru(data) {
        this.addBasvuruForm.next(
            this.fb.group({
                basvuruNo: new FormControl(data.value.basvuruNo),
                tarih: new FormControl(data.value.tarih),
                durum: new FormControl(data.value.durum),
                durumId: new FormControl(data.value.durumId),
                basvuruTuruId: new FormControl(data.value.basvuruTuruId),
                basvuruTuru: new FormControl(data.value.basvuruTuru),
                addBasvuruForm: new FormControl(data.value.addBasvuruForm),
              

            })
        );
    }


    


}
