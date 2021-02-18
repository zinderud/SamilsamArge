import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';

import { merge, of as observableOf, Subject, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { environment as env } from '@env/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from '@app/shared/components/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';

@Component({
  selector: 'app-proje-bitis',
  templateUrl: './proje-bitis.component.html',
  styleUrls: ['./proje-bitis.component.scss']
})
export class ProjeBitisComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'userId',
    'basvuruNo',
    'tarih',
    'durum',
    'basvuruTuru',
    'onizleme',
    /* "düzenle", */
    'oluştur'

  ];

  data: any[] = [];

  searchForm: FormGroup;
  load$ = new Subject<string | null>();

  resultsLength = 0;
  loading = true;

  preloading = false;

  subscription: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.searchForm = this.formBuilder.group({
      basvuruBitisTarih: ""

    });
  }

  ngOnInit(): void {



    /*     let k = { ...this.searchForm.value.basvuruBitisTarih }
    
        this.httpClient.get<any>(`${env.serverUrl}/stats/projebitis`, k)
          .subscribe((data: any) => {
            this.data = data.value;
          }, (error: HttpErrorResponse) => {
            this.snackBar.open(error.error, 'X', { duration: 3000 });
          }); */
  }

  onFilter(): void {

    if (this.searchForm.valid) {

      let k = { ...this.searchForm.value.basvuruBitisTarih }

      this.httpClient.get<any>(`${env.serverUrl}/stats/projebitis`, { k })
        .subscribe((data: any) => {
          this.data = data.value;
        }, (error: HttpErrorResponse) => {
          this.snackBar.open(error.error, 'X', { duration: 3000 });
        });
    }
    this.searchForm = this.formBuilder.group({
      basvuruBitisTarih: ""

    });
  }

  onClear(): void {
    /*  this.searchForm.reset() */
    this.searchForm = this.formBuilder.group({
      basvuruBitisTarih: ""

    });
    /*     this.searchForm.enable(); */
    this.load$.next('');
  }

  onOlustur(item: any): void {
    if (item.basvuruTuru === "ArastirmaCalis") {
      this.router.navigate(['basvuru', 'argebirform', item.id]);
    }
    if (item.basvuruTuru === "ArastirmaCalisKovid") {
      this.router.navigate(['basvuru', 'argeikiform', item.id]);
    }
    if (item.basvuruTuru === "DonerDestek") {
      this.router.navigate(['basvuru', 'argeucform', item.id]);
    }

    console.log("sayfaya git");


  }
  onOnizleme(item: any): void {

    this.router.navigate(['basvuru', 'onizleme', item.id]);

    console.log("sayfaya git");


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  getColor(durum) {
    (2)
    switch (durum) {
      case 'basvuru_yapildi':
        return 'DeepPink';
      case 'basvuru_inceleme':
        return 'blue';
      case 'basvuru_eksik_evrak':
        return 'orange';
      case 'basvuru_on_kabul':
        return 'olive';
      case 'basvuru_red':
        return 'red';
      case 'basvuru_kabul':
        return 'teal';
      case 'On_inceleme_atama':
        return 'BlueViolet';
      case 'On_inceleme_tamam':
        return 'Coral';
    }
  }
}
