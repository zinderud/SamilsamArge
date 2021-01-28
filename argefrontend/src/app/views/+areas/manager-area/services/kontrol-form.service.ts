import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';


import { environment as env } from '@env/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
/* import { Unvan } from '@app/core/models/kontrol/unvan'; */

@Injectable()
export class KontrolFormService {

    private kontrolForm: BehaviorSubject<FormGroup | null> = new BehaviorSubject(this.createKontrolForm());
    kontrolForm$: Observable<FormGroup> = this.kontrolForm.asObservable();

    constructor(private fb: FormBuilder, private httpClient: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar,) {
    }


    createKontrolForm() {
        const ret = this.fb.group({
            kontrolId: new FormControl(''),
            basvuruId: new FormControl(''),
            basvuru: new FormControl(''),
            atayanUserId: new FormControl(''),
            atayanUser: new FormControl(''),
            atananUserId: new FormControl(''),
            atananUser: new FormControl(''),
            atamaTarih: new FormControl(''),
            kontrolDurum: new FormControl(''),
            kurumUstYazi: new FormControl(''),
            dilekceBasvurusuUygunmu: new FormControl(''),
            arastirmaBaslik: new FormControl(''),
            arastirmaStatu: new FormControl(''),
            arastirmaci: new FormControl(''),
            danisman: new FormControl(''),
            kurum: new FormControl(''),
            arastirmaAmac: new FormControl(''),
            arastirmaTuru: new FormControl(''),
            arastirmaYeri: new FormControl(''),
            arastirmaEvreni: new FormControl(''),
            arastirmaHipotez: new FormControl(''),
            arastirmaYontem: new FormControl(''),
            arastirmaZamanAralik: new FormControl(''),
            girisimselUygulama: new FormControl(''),
            prospektifmi: new FormControl(''),
            arastirmaBilimselYararAciklanmismi: new FormControl(''),
            anketSorulariUygunmu: new FormControl(''),
            onizinformvarmi: new FormControl(''),
            basvuruformvarmi: new FormControl(''),
            etikkurulvarmi: new FormControl(''),
            bakanlikOnayvarmi: new FormControl(''),
            butceFormvarmi: new FormControl(''),
            ozgecmisvarmi: new FormControl(''),
            kullanilacakevraklarvarmi: new FormControl(''),
            ucedetLitaratur: new FormControl(''),
            gorusler: new FormControl(''),
            kontrolTarih: new FormControl(''),

        });
        return ret;

    }
    loaderKontrolForm(data) {
        this.kontrolForm.next(
            this.fb.group({

                kontrolId: new FormControl(data.value.kontrolId),
                basvuruId: new FormControl(data.value.basvuruId),
                basvuru: new FormControl(data.value.basvuru),
                atayanUserId: new FormControl(data.value.atayanUserId),
                atayanUser: new FormControl(data.value.atayanUser),
                atananUserId: new FormControl(data.value.atananUserId),
                atananUser: new FormControl(data.value.atananUser),
                atamaTarih: new FormControl(data.value.atamaTarih),
                kontrolDurum: new FormControl(data.value.kontrolDurum),
                kurumUstYazi: new FormControl(data.value.kurumUstYazi),
                dilekceBasvurusuUygunmu: new FormControl(data.value.dilekceBasvurusuUygunmu),
                arastirmaBaslik: new FormControl(data.value.arastirmaBaslik),
                arastirmaStatu: new FormControl(data.value.arastirmaStatu),
                arastirmaci: new FormControl(data.value.arastirmaci),
                danisman: new FormControl(data.value.danisman),
                kurum: new FormControl(data.value.kurum),
                arastirmaAmac: new FormControl(data.value.arastirmaAmac),
                arastirmaTuru: new FormControl(data.value.arastirmaTuru),
                arastirmaYeri: new FormControl(data.value.arastirmaYeri),
                arastirmaEvreni: new FormControl(data.value.arastirmaEvreni),
                arastirmaHipotez: new FormControl(data.value.arastirmaHipotez),
                arastirmaYontem: new FormControl(data.value.arastirmaYontem),
                arastirmaZamanAralik: new FormControl(data.value.arastirmaZamanAralik),
                girisimselUygulama: new FormControl(data.value.girisimselUygulama),
                prospektifmi: new FormControl(data.value.prospektifmi),
                arastirmaBilimselYararAciklanmismi: new FormControl(data.value.arastirmaBilimselYararAciklanmismi),
                anketSorulariUygunmu: new FormControl(data.value.anketSorulariUygunmu),
                onizinformvarmi: new FormControl(data.value.onizinformvarmi),
                basvuruformvarmi: new FormControl(data.value.basvuruformvarmi),
                etikkurulvarmi: new FormControl(data.value.etikkurulvarmi),
                bakanlikOnayvarmi: new FormControl(data.value.bakanlikOnayvarmi),
                butceFormvarmi: new FormControl(data.value.butceFormvarmi),
                ozgecmisvarmi: new FormControl(data.value.ozgecmisvarmi),
                kullanilacakevraklarvarmi: new FormControl(data.value.kullanilacakevraklarvarmi),
                ucedetLitaratur: new FormControl(data.value.ucedetLitaratur),
                gorusler: new FormControl(data.value.gorusler),
                kontrolTarih: new FormControl(data.value.kontrolTarih),


            })
        );
    }



}
