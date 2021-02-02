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
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-kontrol-atama',
  templateUrl: './kontrol-atama.component.html',
  styleUrls: ['./kontrol-atama.component.scss']
})
export class KontrolAtamaComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'checked',
    'userId',
    'basvuruNo',
    'tarih',
    'durum',
    'basvuruTuru',
    'onizleme',
    /* "düzenle", */


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
  selection = new SelectionModel<any>(false, []);
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.searchForm = this.formBuilder.group({
      durum: ['', Validators.required]
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
            const params = new HttpParams()
              .set('filter.searchString', this.searchForm.value.durum || '')
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
      this.load$.next(this.searchForm.value.name);
      this.searchForm.disable();
    }
  }

  onClear(): void {
    this.searchForm.reset();
    this.searchForm.enable();
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
        return 'green';
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
    }
  }
  updateCheckedList(event, index) {
    this.selection.toggle(index)
    console.log("index", index);
    console.log("event", event);
  }

}
