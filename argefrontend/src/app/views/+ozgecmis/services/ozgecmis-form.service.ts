import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';


import { environment as env } from '@env/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
/* import { Unvan } from '@app/core/models/ozgecmis/unvan'; */

@Injectable()
export class OzgecmisFormService {

    private ozgecmisForm: BehaviorSubject<FormGroup | null> = new BehaviorSubject(this.createOzgecmisForm());
    ozgecmisForm$: Observable<FormGroup> = this.ozgecmisForm.asObservable();

    constructor(private fb: FormBuilder, private httpClient: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar,) {
    }


    createOzgecmisForm() {
        const ret = this.fb.group({
            OzgecmisId: new FormControl(''),
            sorumlu: new FormControl(''),
            tc: new FormControl(''),
            ad: new FormControl(''),
            soyad: new FormControl(''),
            dogumYeri: new FormControl(''),
            dogumTarihi: new FormControl(''),
            yabanciDil: new FormControl(''),
            eposta: new FormControl(''),
            unvans: new FormControl('')

        });
        return ret;

    }
    loaderOzgecmisForm(data) {
        this.ozgecmisForm.next(
            this.fb.group({
                OzgecmisId: new FormControl(data.value.OzgecmisId),
                sorumlu: new FormControl(data.value.sorumlu),
                tc: new FormControl(data.value.tc),
                ad: new FormControl(data.value.ad),
                soyad: new FormControl(data.value.soyad),
                dogumYeri: new FormControl(data.value.dogumYeri),
                dogumTarihi: new FormControl(data.value.dogumTarihi),
                yabanciDil: new FormControl(data.value.yabanciDil),
                eposta: new FormControl(data.value.eposta),
                unvans: new FormControl(data.value.unvans),

            })
        );
    }



}
