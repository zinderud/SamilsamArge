import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { Basvuru } from '@app/core/models/basvuru/basvuru';

@Component({
  selector: 'app-basvuru-incele',
  templateUrl: './basvuru-incele.component.html',
  styleUrls: ['./basvuru-incele.component.scss']
})
export class BasvuruInceleComponent implements OnInit {
  itemId: string;
  loading = false;
  basvuru: any = {};
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.params.id;
    this.httpClient.get(`${env.serverUrl}/basvuru/selected/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;
      const basform = JSON.parse(data.value.basvuruForm);
      this.basvuru = { ...data.value }
      this.basvuru.basvuruForm = basform;

    });
  }

}
