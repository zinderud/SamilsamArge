import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';


import { environment as env } from '@env/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
/* import { Unvan } from '@app/core/models/basvuru/unvan'; */

@Injectable()
export class BasvuruFormService {

    private basvuruForm: BehaviorSubject<FormGroup | null> = new BehaviorSubject(this.createBasvuruForm());
    basvuruForm$: Observable<FormGroup> = this.basvuruForm.asObservable();

    constructor(private fb: FormBuilder, private httpClient: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar,) {
    }


    createBasvuruForm() {
        const ret = this.fb.group({
            basvuruNo: new FormControl(''),
            tarih: new FormControl(new Date()),
            durum: new FormControl(''),
            durumId: new FormControl(''),
            basvuruTuruId: new FormControl(''),
            basvuruTuru: new FormControl(''),
            basvuruForm: new FormControl(''),
         

        });
        return ret;

    }
    loaderBasvuruForm(data) {
        this.basvuruForm.next(
            this.fb.group({
                basvuruNo: new FormControl(data.value.basvuruNo),
                tarih: new FormControl(data.value.tarih),
                durum: new FormControl(data.value.durum),
                durumId: new FormControl(data.value.durumId),
                basvuruTuruId: new FormControl(data.value.basvuruTuruId),
                basvuruTuru: new FormControl(data.value.basvuruTuru),
                basvuruForm: new FormControl(data.value.basvuruForm),
              

            })
        );
    }



}
