import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { Basvuru } from '@app/core/models/basvuru/basvuru';
import { TimelineItem } from '@app/shared/components/ngx-vertical-timeline/timeline-item';
import { Timeline } from '@app/core/models/timeline';
import { TimelineService } from '@app/core/services/timeline.service';
import { AuthService } from '@app/core/services/core';
import { User } from '@app/core/models/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-basvuru-incele',
  templateUrl: './basvuru-incele.component.html',
  styleUrls: ['./basvuru-incele.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasvuruInceleComponent implements OnInit {
  items: TimelineItem[] = [];
  durumForm: FormGroup;
  editbasvuru: Basvuru = {};
  notform: FormGroup;
  public src = {};
  itemId: string;
  loading = false;
  basvuru: any = {};
  userid = 0;
  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private authservice: AuthService,
    private timelineservice: TimelineService,
    private cdr: ChangeDetectorRef) {
    this.durumForm = this.fb.group({
      durum: {}
    });
    this.notform = this.fb.group({
      not: ""
    });

    this.userid = parseInt(this.authservice.getUserid());
  }

  ngOnInit(): void {
    this.items = [];
    this.itemId = this.activatedRoute.snapshot.params.id;
    this.httpClient.get(`${env.serverUrl}/basvuru/selected/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;
      const basform = JSON.parse(data.value.basvuruForm);
      this.basvuru = { ...data.value }
      this.editbasvuru = { ...data.value };
      this.basvuru.basvuruForm = basform;
      this.durumForm.patchValue({
        durum: this.editbasvuru.durum
      }
      );

    });


    this.timelinelist();




  }



  timelinelist() {
    this.items = [];

    this.httpClient.get(`${env.serverUrl}/timeline/selected/${this.itemId}`).subscribe((data: any) => {

      console.log("timeline", data);

      /*  this.items = data.value
        .forEach(element => {
         
       }); */

      if (data.succeeded) {

        data.value.forEach((e: Timeline) => {
          const timline: TimelineItem = {
            label: "" + e.user.firstname + e.user.lastname, icon: 'fa fa-plus',
            content: e.not, title: new Date(e.tarih).toLocaleDateString() + " ", durum: e.durum
          }
          this.items.push(timline);

        });
        this.cdr.markForCheck();

      }

    });


  }
  onErrorPdf(onErrorPdf: any) {
    // do anything
    console.log("hata pdf" + onErrorPdf);
  }
  onDurumEdit(): void {
    if (this.durumForm.valid) {
      this.durumForm.disable();

      this.editbasvuru.durum = this.durumForm.value.durum

      const p = { ...this.editbasvuru };
      this.httpClient.patch(`${env.serverUrl}/basvuru/${this.itemId}`, p
      ).subscribe((data: any) => {

        if (data.succeeded) {


          // timeline add
          let p: Timeline = {
            userId: this.userid,
            basvuruId: parseInt(this.itemId),
            durum: this.durumForm.value.durum,
            not: "Başvuru durum değişti"
          }
          this.addTimeline(p).subscribe((data: any) => {
            if (data.succeeded) {
              console.log("timeline suc", data);
            }
          });

          this.snackBar.open(`basvuru  ${this.durumForm.value.durum} düzenlendi`, 'X', { duration: 3000 });
          this.router.navigate(['inceleme']);
        }
        this.loading = false;

      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.durumForm.enable();
        this.snackBar.open(error.error, 'X', { duration: 3000 });
      });

    } else {
      console.log('Form not valid');
    }

    this.timelinelist();
    this.cdr.markForCheck();

  }

  addTimeline(timeline: Timeline) {
    const p: Timeline = {
      userId: timeline.userId,
      basvuruId: timeline.basvuruId,
      tarih: new Date().toDateString(),
      durum: timeline.durum,
      not: timeline.not

    }
    console.log("timeline", p);
    return this.timelineservice.addTimeLine(p);
  }
  onNotCreate() {
    if (this.notform.valid) {

      this.notform.disable();
      let notf = this.notform.value;



      // timeline add
      let p: Timeline = {
        userId: this.userid,
        basvuruId: parseInt(this.itemId),
        durum: this.basvuru.durum,
        not: this.notform.value.not
      }
      this.addTimeline(p).subscribe((data: any) => {
        if (data.succeeded) {
          console.log("timeline not", data);
        }
      });

    }

    this.timelinelist();
    this.cdr.markForCheck();
  }
  onRefresh() {

    this.notform.reset();

  }
}
