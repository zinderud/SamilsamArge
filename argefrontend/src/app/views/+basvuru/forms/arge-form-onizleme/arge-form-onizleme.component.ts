import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { Basvuru } from '@app/core/models/basvuru/basvuru';

@Component({
  selector: 'app-arge-form-onizleme',
  templateUrl: './arge-form-onizleme.component.html',
  styleUrls: ['./arge-form-onizleme.component.scss']
})
export class ArgeFormOnizlemeComponent implements OnInit {
  public src = {};
  itemId: string;
  loading = false;
  basvuru: any = {};
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.params.id;
    this.httpClient.get(`${env.serverUrl}/basvuru/selected/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;
      const basform = JSON.parse(data.value.basvuruForm);
      this.basvuru = { ...data.value }
      this.basvuru.basvuruForm = basform;

    });
  }



  onErrorPdf(onErrorPdf: any) {
    // do anything
    console.log("hata pdf" + onErrorPdf);
  }

}
