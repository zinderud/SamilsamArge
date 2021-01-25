import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Timeline } from '@app/core/models/timeline';
import { AuthService } from '@app/core/services/core';
import { TimelineService } from '@app/core/services/timeline.service';
import { environment as env } from '@env/environment';
@Component({
  selector: 'app-user-not',
  templateUrl: './user-not.component.html',
  styleUrls: ['./user-not.component.scss']
})
export class UserNotComponent implements OnInit {
  notform: FormGroup;
  userid = 0;
  itemId: string;
  basvuru: any = {};
  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private authservice: AuthService,
    private timelineservice: TimelineService,
    private cdr: ChangeDetectorRef) {

    this.notform = this.fb.group({
      not: ""
    });
    this.userid = parseInt(this.authservice.getUserid());
  }

  ngOnInit(): void {


    this.httpClient.get(`${env.serverUrl}/basvuru/selected/${this.itemId}`).subscribe((data: any) => {

      const basform = JSON.parse(data.value.basvuruForm);
      this.basvuru = { ...data.value }

      this.basvuru.basvuruForm = basform;



    });

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


    this.cdr.markForCheck();
  }

  //// 1:public 2:private
  addTimeline(timeline: Timeline) {
    const p: Timeline = {
      userId: timeline.userId,
      basvuruId: timeline.basvuruId,
      tarih: new Date().toDateString(),
      durum: timeline.durum,
      not: timeline.not,
      notType: 1

    }

    return this.timelineservice.addTimeLine(p);
  }

  onRefresh() {

    this.notform.reset();

  }

}
