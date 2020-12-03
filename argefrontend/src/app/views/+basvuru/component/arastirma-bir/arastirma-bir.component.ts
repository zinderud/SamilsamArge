import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment as env } from '@env/environment';


@Component({
  selector: 'app-arastirma-bir',
  templateUrl: './arastirma-bir.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./arastirma-bir.component.scss']
})
export class ArastirmaBirComponent     {
  @Input() form: FormGroup;
  @Input() index: number;

  get emailControl() {
    return this.form.controls.email;
  }

  constructor(private formBuilder: FormBuilder) {
  
  }
}
