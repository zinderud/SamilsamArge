import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableLoadingService } from '@app/shared/services/mat-table-loading.service';

@Component({
  selector: 'app-mat-table-loading',
  templateUrl: './mat-table-loading.component.html',
  styleUrls: ['./mat-table-loading.component.scss']
})
export class MatTableLoadingComponent implements OnInit {
  active$: Observable<boolean>;

  constructor(public matTableLoadingService: MatTableLoadingService) { }

  ngOnInit() {
    this.active$ = this.matTableLoadingService.active$;
  }

}
