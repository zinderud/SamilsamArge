import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';

import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommonService {
  public title: Observable<string>;
  private titleSubject: BehaviorSubject<string>;

  constructor(public snackBar: MatSnackBar, private httpClient: HttpClient) {
    this.titleSubject = new BehaviorSubject<string>(localStorage.getItem('currentTitle'));
    this.title = this.titleSubject.asObservable();
  }

  public setTitle(newTitle) {
    localStorage.setItem('currentTitle', newTitle);
    this.titleSubject.next(newTitle);
  }

  public showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = env.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
  public showSnackBarFatal(name): void {
    const config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = env.snackBarDuration;
    config.verticalPosition = 'top';
    config.panelClass = ['mat-warn'];
    this.snackBar.open(name, '', config);
  }

  public createGetRequets(data: string[]) {
    const getRequests = [];
    data.forEach(url =>
      getRequests.push(
        this.httpClient.get(url, { responseType: 'blob' })
      )
    );
    return getRequests;
  }
}
