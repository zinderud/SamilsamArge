import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { User } from '@app/core/models/user.model';
import { AuthService } from '@app/core/services/core';

@Component({
  selector: 'ngx-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userId: number;
  user: User;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  genereatedPwd: string;
  errors: any;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,

    private fb: FormBuilder,
    private userService: AuthService,
  ) { }

  ngOnInit(): void {

    console.log(this.genereatedPwd)

    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      username: ['', Validators.required],
      picture: [''],
      pictureFile: [''],
    });

    this.passwordForm = this.fb.group({
      pwd: ['', Validators.required],
      confirm_pwd: ['']
    });


  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
