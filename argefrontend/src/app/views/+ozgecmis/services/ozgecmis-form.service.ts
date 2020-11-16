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
export class PatientFormService {

    private ozgecmisForm: BehaviorSubject<FormGroup | null> = new BehaviorSubject(this.createOzgecmisForm());
    ozgecmisForm$: Observable<FormGroup> = this.ozgecmisForm.asObservable();

    constructor(private fb: FormBuilder, private httpClient: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar,) {
    }

    get unvan(): FormGroup {
        return this.fb.group({
            UnvanId: new FormControl(''),
            tarih: new FormControl(''),
            acıklama: new FormControl(''),

        });
    }
    addUnvan() {
        const currentUnvan = this.ozgecmisForm.getValue();
        const currentOzgecmis = currentUnvan.get('unvan') as FormArray;
        currentOzgecmis.push(this.unvan);
        this.ozgecmisForm.next(currentUnvan);

    }
    deleteUnvan(index: number) {
        const currentUnvan = this.ozgecmisForm.getValue();
        const currentOzgecmis = currentUnvan.get('unvan') as FormArray;
        currentOzgecmis.removeAt(index);
        this.ozgecmisForm.next(currentUnvan);

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
            unvans: this.fb.array([this.unvan])

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
                unvans: this.setUnvan(data.value)

            })
        );
    }
    setUnvan(el) {
        const k = this.fb.array([]);
        if (el.unvans !== TypeHelper.isNullOrEmpty) {
            el.unvans.array.forEach(data => {
                k.push(
                    this.fb.group({
                        UnvanId: new FormControl(data.UnvanId),
                        tarih: new FormControl(data.tarih),
                        acıklama: new FormControl(data.acıklama),
                    })
                );

            });

        }
        return k;


    }


}
