import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatTableLoadingService {

  private activ: BehaviorSubject<boolean>;
  public active$: Observable<boolean>;

  constructor() {
    this.activ = new BehaviorSubject<boolean>(false);
    this.active$ = this.activ.asObservable();
  }

  active() {
    this.activ.next(true);
  }

  deactive() {
    this.activ.next(false);
  }
}
