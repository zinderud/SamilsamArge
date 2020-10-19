import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };

  constructor(
    private snackBar: MatSnackBar,

  ) {

    const k = '';
  }

  ngOnInit(): void {

    const k = '';
  }

  ngOnDestroy(): void {

  }

}

