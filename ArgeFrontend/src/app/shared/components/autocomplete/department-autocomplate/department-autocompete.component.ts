import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { startWith } from 'rxjs/internal/operators/startWith';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, Subject, merge, of, observable } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { environment as env } from '@env/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Department } from '@app/core/models/department.model';
import { isNullOrUndefined } from 'util';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';
@Component({
  selector: 'app-department-autocompete',
  templateUrl: './department-autocompete.component.html',
  styleUrls: ['./department-autocompete.component.scss']
})
export class DepartmentAutocompeteComponent implements OnInit, OnDestroy {
  data: any; 
  subscription; Subscription;
  load$ = new Subject<string | null>();
  @Input() departmentId = new FormControl();
  options: Department[] = [];
  filteredOptions: Observable<Department[]>;

  constructor(private httpClient: HttpClient,
              private snackBar: MatSnackBar) {

  }
  ngOnInit() {

    this.filteredOptions = this.departmentId.valueChanges
      .pipe(
        startWith(''),
       //  tap(ev => console.log(ev)),
       // map(options => options ? this._filter(options) : this.options.slice())
      map(value => this._filter(value))
       );

    this.subscription = merge(this.load$).pipe(
      startWith({}),
      switchMap(() => {
        return this.httpClient.get<any>(`${env.serverUrl}/department`);
      }),

      map(data => {


        return data.value;
      }),
      catchError(() => {

        return of([]);
      })
    ).subscribe((data: any) => {
      this.data = data;
      this.options = data;
    }, (error: HttpErrorResponse) => {
      this.snackBar.open(error.error, 'X', { duration: 3000 });
    });
  }

  private _filter(value): Department[] {
    if (TypeHelper.isNullOrEmpty(value)){
      return [];
    }
    const filterValue = value;
    
    return this.options.filter(options => this.stringadd(options).includes(filterValue));


  }

  private stringadd(options: Department): string {
     const k =  options.name.toLowerCase() ;

     return k;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
