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
export class ArgeBirFormService {

    private addArgeBirFormForm: BehaviorSubject<FormGroup | null> = new BehaviorSubject(this.addArgeBirForm());
    addArgeBirFormForm$: Observable<FormGroup> = this.addArgeBirFormForm.asObservable();

    constructor(private fb: FormBuilder, private httpClient: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar,) {
    }


    addArgeBirForm() {
        const ret = this.fb.group({
            liveAddress: new FormControl(new Date()),

            arastirmaBir: new FormGroup({
                tarih: new FormControl(new Date()),

            })

        });
        return ret;

    }
    loaderArgeBirForm(data) {
        this.addArgeBirFormForm.next(
            this.fb.group({
                liveAddress: new FormControl(data.value.liveAddress),
                arastirmaBir: new FormGroup({
                    tarih: new FormControl(data.value.arastirmaBir.tarih)
                })

            })
        );
    }


    


}
