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
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
@Component({
  selector: 'app-list-basvuru',
  templateUrl: './list-basvuru.component.html',
  styleUrls: ['./list-basvuru.component.css']
})
export class ListBasvuruComponent implements OnInit, OnDestroy {
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
      durum: "",
      userId: "",
      basvuruTuru: "",
      /*  basvuruBitisTarih: "" */

    });
  }

  ngOnInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.subscription = merge(this.sort.sortChange, this.paginator.page, this.load$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;

          if (!this.preloading) {
            this.preloading = true;
            return this.activatedRoute.data.pipe(
              map((resolve: any) => resolve.data)
            );

          } else {

            /*        let kdate = "";
                   console.log("bu ne ", this.searchForm.value.basvuruBitisTarih);
                   if (!TypeHelper.isNullOrEmpty(this.searchForm.value.basvuruBitisTarih)) {
                     kdate = new Date(this.searchForm.value.basvuruBitisTarih).toLocaleDateString()
                   }
        */
            /*  let  let= this.searchForm.value.basvuruBitisTarih ? 12 : (int?)null;  */
            const params = new HttpParams()
              .set('filter.searchString', this.searchForm.value.durum || '')
              .set('filter.userId', this.searchForm.value.userId || '')
              .set('filter.BasvuruTuru', this.searchForm.value.basvuruTuru || '')
              /*    .set('filter.basvuruBitisTarih', kdate) */
              .set('paginator.offset', (this.paginator.pageIndex * this.paginator.pageSize).toString())
              .set('paginator.limit', this.paginator.pageSize.toString())
              .set('orderBy.by', this.sort.active)
              .set('orderBy.desc', (this.sort.direction === 'desc').toString());

            return this.httpClient.get<any>(`${env.serverUrl}/basvuru/userbasvurulist`, { params });
          }
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.loading = false;
          this.resultsLength = data.countItems;

          return data.value;
        }),
        catchError(() => {
          this.loading = false;
          return observableOf([]);
        })
      ).subscribe((data: any) => {
        this.data = data;
      }, (error: HttpErrorResponse) => {
        this.snackBar.open(error.error, 'X', { duration: 3000 });
      });
  }

  onFilter(): void {

    if (this.searchForm.valid) {
      this.load$.next(this.searchForm.value.durum);
      /*    this.searchForm.disable(); */
    }
    this.searchForm = this.formBuilder.group({
      durum: [''],
      userId: [''],
      basvuruTuru: [''],
      /*  basvuruBitisTarih: "" */

    });
  }

  onClear(): void {
    /*  this.searchForm.reset() */
    this.searchForm = this.formBuilder.group({
      durum: [''],
      userId: [''],
      BasvuruTuru: [''],
      /*    basvuruBitisTarih: "" */

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


  //basvuru_yapildi
  //basvuru_inceleme
  //basvuru_eksik_evrak
  //basvuru_on_kabul
  //basvuru_red
  //basvuru_kabul
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
