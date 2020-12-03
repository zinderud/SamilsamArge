import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/core';
import { ArgeBirFormService } from '../../services/arge-form.service';

@Component({
  selector: 'app-arge-bir',
  templateUrl: './argeBirForm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./argeBirForm.component.scss']
})
export class ArgeBirFormComponent implements OnInit {
  @Input() form: FormGroup;
  userid = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private argeBirFormFormService: ArgeBirFormService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userid = this.authService.getUserid();
    this.argeBirFormFormService.addArgeBirFormForm$.subscribe(x => {
      this.form = x;
    });
  }


  getArastirmabirControls() {
    return (this.form.get('arastirmaBir')).value;
  }

}
